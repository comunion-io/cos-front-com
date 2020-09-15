<script>
import { Steps } from 'ant-design-vue';
import { getBountyDetail, startupWork } from '@/services';
import Descriptions from '@/components/display/Descriptions';
import { mapGetters } from 'vuex';
import { web3, COMUNION_RECEIVE_HUNTER_TRANSFER } from '@/libs/web3';

const { Step } = Steps;

export default {
  data() {
    return {
      detail: {},
      bountyColumns: [
        {
          label: 'Startup',
          value: 'startup.name',
          render: (v, record) => {
            return (
              <router-link to={{ name: 'startupDetail', params: { id: record.id } }}>
                {v}
              </router-link>
            );
          }
        },
        {
          label: 'Type',
          value: 'type'
        },
        {
          label: 'Create by',
          value: '',
          render: (v, record) => {
            return (
              <router-link to={{ name: 'startupDetail', params: { id: record.id } }}>
                {v}
              </router-link>
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
          customRender: text => <router-link>{text}</router-link>
        },
        {
          dataIndex: 'status',
          customRender: (text, record) => {
            return `${text}(${record.paidAt ||
              record.quitedAt ||
              record.submittedAt ||
              record.startedAt})`;
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['account'])
  },
  async mounted() {
    this.detail = await getBountyDetail(this.$route.params.id);
  },
  render(h) {
    const { detail } = this;
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
              <Descriptions class="mt-32" columns={this.bountyColumns} dataSource={detail} />
            </a-card>
            <a-card bordered={false} class="hunter-card">
              <div slot="title">
                <span>Hunter</span>
                <span class="ml-8 t-primary f-15">{detail.hunters?.length || 0}</span>
              </div>
              <a-table
                showHeader={false}
                columns={this.hunterColumns}
                dataSource={detail.hunters || []}
              />
            </a-card>
          </div>
          <a-card class="right">
            <div class="flex ai-center jc-center">
              {(detail.payments || []).map(payment => (
                <span class="mx-24 pay-item f-18 t-bold">
                  {payment.value}
                  {payment.token}
                </span>
              ))}
            </div>
            <div class="mt-24">
              <Steps current={detail.status ?? 0} labelPlacement="vertical">
                <Step title="Open" sub-title="2020-06-02 12:00" />
                <Step title="InProgress" />
                <Step title="Closed" description="90 days left" />
              </Steps>
            </div>
            <a-button class="my-32" type="primary" block size="large" onClick={this.startWork}>
              Start Work
            </a-button>
            <ul class="pl-16 t-grey ">
              <li>
                Solid understanding of the blockchain industry. Your current industry relationships
                and resources are encouraged to build Aurora collaboratio.
              </li>
              <li class="mt-16">
                Solid understanding of the blockchain industry. Your current industry relationships
                and resources are encouraged to build Aurora collaboratio.
              </li>
            </ul>
          </a-card>
        </div>
      </div>
    );
  },
  methods: {
    // hunter 承接bounty, hunter 向bounty 的发布者缴纳10个币的保证金
    async startWork() {
      if (this.detail && this.detail.id) {
        const tx = {
          from: this.account,
          to: COMUNION_RECEIVE_HUNTER_TRANSFER,
          gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
          gasLimit: web3.utils.numberToHex(183943),
          // 暂时只用0.1个币， 上线的时候， 改成10个币
          value: web3.utils.numberToHex(Math.pow(10, 17))
        };

        window.ethereum.sendAsync(
          {
            method: 'eth_sendTransaction',
            params: [tx],
            from: window.ethereum.selectedAddress
          },
          async (err, result) => {
            if (err) {
              return console.error(err);
            }
            const txid = result.result;
            try {
              await startupWork(this.detail.startup.id, this.detail.id, { txid });
              // TODO 更改step 的状态
            } catch (error) {
              console.error(error);
            }
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
  }
}
.hunter-card {
  /deep/ .ant-card-head {
    border-bottom: none;
  }
}
.keyword {
  height: 28px;
  line-height: 28px;
  background: #f3f3f3;
  color: @primary-color;
  & + & {
    margin-left: 10px;
  }
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
