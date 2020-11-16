<script>
import { Steps, Timeline } from 'ant-design-vue';
// import { getBountyDetail, startupWork } from '@/services';
import services from '@/services';
import Descriptions from '@/components/display/Descriptions';
import { mapGetters } from 'vuex';
import moment from 'moment';
import { web3, COMUNION_RECEIVE_HUNTER_TRANSFER } from '@/libs/web3';
import CopyableAddress from '@/components/helper/CopyableAddress';

const { Step } = Steps;

function getHunterBountyProcess(hunter) {
  const list = [
    ['Start work', hunter.startedAt],
    ['Submitted', hunter.submittedAt],
    ['Paid', hunter.paidAt],
    ['Quit', hunter.quitedAt]
  ];
  return list.reduceRight((arr, item) => {
    if (item[1]) {
      arr.push([item[0], moment(item[1]).format('YYYY-MM-DD')]);
    }
    return arr;
  }, []);
}

export default {
  data() {
    return {
      // 轮询的timeout
      pollTimeout: null,
      detail: {},
      // 按钮加载中
      loading: false,
      /** 是否禁用 start to work 按钮 */
      isDisabled: false,
      bountyColumns: [
        {
          label: 'Start-Up',
          value: 'startup.name',
          render: (v, record) => {
            if (record.startup) {
              return (
                <router-link to={{ name: 'startupDetail', params: { id: record.startup.id } }}>
                  {v}
                </router-link>
              );
            }
          }
        },
        {
          label: 'Type',
          value: 'type'
        },
        {
          label: 'Created by',
          value: 'createdBy.name',
          render: (v, record) => {
            return record.createdBy?.isHunter ? (
              <router-link to={{ name: 'bountyHome', params: { userId: record.createdBy?.id } }}>
                {v}
              </router-link>
            ) : (
              <CopyableAddress address={v} />
            );
          }
        },
        {
          label: 'Email',
          value: 'contactEmail',
          render: (v, record) => {
            return <a href={`mailto:${v}`}>{v}</a>;
          }
        },
        {
          label: 'BlockChain',
          value: 'blockAddr',
          copyable: true
        },
        {
          label: 'intro',
          value: 'intro'
        },
        {
          label: 'Desc_IPFS',
          value: 'descriptionFileAddr',
          render: (v, record) => {
            return (
              <a href={v} target="_blank">
                {v}
              </a>
            );
          }
        },
        {
          label: 'Description',
          value: 'descriptionAddr',
          render: (v, record) => {
            return (
              <a href={v} target="_blank">
                {v}
              </a>
            );
          }
        }
      ],
      hunterColumns: [
        {
          dataIndex: 'name',
          customRender: (text, record) => (
            <router-link to={{ name: 'bountyHome', params: { userId: record.userId } }}>
              {text}
            </router-link>
          )
        },
        {
          dataIndex: 'status',
          align: 'right',
          customRender: (text, record) => {
            const process = getHunterBountyProcess(record);
            if (!process.length) return 'Pending...';
            return (
              <a-tooltip placement="left" overlayClassName="bounty-detail-overlay">
                <template slot="title">
                  <div class="mb-16 t-bold">{record.name}:</div>
                  <Timeline reverse>
                    {process.map(item => (
                      <Timeline.Item>{`${item[0]} (${item[1]})`}</Timeline.Item>
                    ))}
                  </Timeline>
                </template>
                <span>{`${process[0][0]} (${process[0][1]})`}</span>
              </a-tooltip>
            );
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['account', 'isLoggedIn', 'user'])
  },
  async mounted() {
    this.fetchData();
  },
  destroyed() {
    if (this.pollTimeout) {
      clearTimeout(this.pollTimeout);
      this.pollTimeout = null;
    }
  },
  render(h) {
    const { detail } = this;
    // 是否是我发布的bounty
    const isMyBounty = detail.createdBy?.id === this.user.id;
    // 剩余天数
    const leftDays = detail.expiredAt ? moment(detail.expiredAt).diff(moment(), 'days') : false;
    // 是否已结束
    const closed = detail.status === 2;
    // 是否已经接过任务
    const isStartedMyself = detail.hunters?.some(hunter => hunter.userId === this.user.id);
    return (
      <div style="padding: 28px 50px">
        <div class="f-24 t-bold t-center" style="margin-bottom:48px">
          Bounty Detail
        </div>
        <div class="flex w-100p">
          <div class="flex-1">
            <a-card class="flex-1 detail-card" bordered={false} title={detail.title}>
              <div>
                {(detail.keywords || []).map(tag => (
                  <a-tag class="keyword">{tag}</a-tag>
                ))}
              </div>
              <Descriptions
                class="mt-24"
                label-width={164}
                columns={this.bountyColumns}
                dataSource={detail}
              />
            </a-card>
            <a-card bordered={false} class="hunter-card">
              <div slot="title">
                <span>Hunter{detail.hunters?.length > 1 ? 's' : ''}</span>
                <span class="ml-8 t-primary f-15">{detail.hunters?.length || 0}</span>
              </div>
              <a-table
                row-key="hunterId"
                showHeader={false}
                columns={this.hunterColumns}
                dataSource={detail.hunters || []}
                pagination={false}
              />
            </a-card>
          </div>
          <a-card class="right no-shrink">
            <div class="flex ai-center jc-center">
              {(detail.payments || []).map(payment => (
                <span class="mx-24 pay-item f-18 t-bold">
                  {payment.value} {payment.token}
                </span>
              ))}
            </div>
            <div class="mt-24">
              <Steps current={detail.status ?? 0} labelPlacement="vertical">
                <Step
                  title="Open"
                  sub-title={
                    detail.createdAt ? moment(detail.createdAt).format('YYYY-MM-DD hh:mm') : ''
                  }
                />
                <Step title="InProgress" />
                <Step
                  title="Closed"
                  description={
                    leftDays === false
                      ? ''
                      : closed
                      ? 'closed'
                      : `${leftDays} day${leftDays > 1 ? 's' : ''} left`
                  }
                />
              </Steps>
            </div>
            {isMyBounty || closed || isStartedMyself ? (
              <a-tooltip
                class="my-32"
                title={
                  closed
                    ? 'Closed'
                    : isStartedMyself
                    ? 'You are in progress.'
                    : "You cann't accept your own bounty."
                }
              >
                <a-button type="primary" block size="large" disabled>
                  {isStartedMyself ? 'In progress' : 'Start to work'}
                </a-button>
              </a-tooltip>
            ) : (
              <a-button
                class="my-32"
                type="primary"
                block
                size="large"
                disabled={this.isDisabled}
                loading={this.loading}
                onClick={this.startWork}
              >
                Start to work
              </a-button>
            )}
            <ul class="pl-16 t-grey ">
              <li>
                The bounty’s content have been flushed to IPFS blockchain for consensus between
                startup and hunter, if the hunter who had hunt the bounty have any question ,please
                go to{' '}
                <a href="https://bbs.comunion.io/" target="bbs">
                  comunion bbs
                </a>{' '}
                for arguement
              </li>
              <li class="mt-16">The hunter need pay 10 UVU to hunt the bounty</li>
            </ul>
          </a-card>
        </div>
      </div>
    );
  },
  methods: {
    async fetchData() {
      // this.detail = await getBountyDetail(this.$route.params.id);
      const { error, data } = await services['cores@bounty-获取']({ id: this.$route.params.id });
      this.detail = error ? {} : data;

      // 存在有Pending状态的hunter
      if (
        this.detail?.hunters?.some(hunter => {
          return !hunter.startedAt;
        })
      ) {
        this.pollTimeout = setTimeout(() => {
          this.fetchData();
        }, 3000);
      }
    },
    // hunter 承接bounty, hunter 向bounty 的发布者缴纳10个币的保证金
    async startWork() {
      // 如果未登录，则跳转到引导页
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'guide', params: { from: this.$route.fullPath } });
        return;
      }
      if (this.detail && this.detail.id) {
        const tx = {
          from: this.account,
          to: COMUNION_RECEIVE_HUNTER_TRANSFER,
          gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
          gasLimit: web3.utils.numberToHex(183943),
          // 暂时只用0.1个币， 上线的时候， 改成10个币
          value: web3.utils.numberToHex(Math.pow(10, 17))
        };
        this.loading = true;
        window.ethereum.sendAsync(
          {
            method: 'eth_sendTransaction',
            params: [tx],
            from: window.ethereum.selectedAddress
          },
          async (err, result) => {
            if (err) {
              this.loading = false;
              this.isDisabled = false;
              return console.error(err);
            }
            const txid = result.result;

            // if (await startupWork(this.detail.id, { txid })) {
            //   this.fetchData();
            // }
            const { error } = await services['cores@bounty-startwork'](
              {
                bountyId: this.detail.id
              },
              { txid }
            );
            if (!error) {
              this.fetchData();
            }

            this.loading = false;
            this.isDisabled = true;
          }
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables.less';
.detail-card {
  /deep/ .ant-card-head {
    border-bottom: none;
  }
  /deep/ .ant-card-head-title {
    font-size: 18px;
    font-weight: bold;
    white-space: initial;
  }
}
.hunter-card {
  /deep/ .ant-card-head {
    border-bottom: none;
  }
}
.keyword {
  margin-right: 10px;
  margin-bottom: 10px;
  height: 28px;
  line-height: 28px;
  background: #f3f3f3;
  color: @primary-color;
}
.right {
  width: 380px;
  margin-left: 20px;
}
.pay-item {
  &:first-child {
    color: @primary-color;
  }
  &:nth-child(2) {
    color: #ffad4d;
  }
}
/deep/ .ant-steps-item-subtitle {
  font-size: 12px;
}
</style>

<style lang="less">
@import '~@/assets/styles/variables.less';
.bounty-detail-overlay {
  .ant-tooltip-inner {
    padding: 16px;
    background: #fff;
    color: @text-color;
  }
  .ant-timeline-item-head {
    background: @primary-color;
  }
}
</style>
