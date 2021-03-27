<script>
import Descriptions from '@/components/display/Descriptions';
import services from '@/services';
import moment from 'moment';
import Investors from './investors';
import { mapGetters } from 'vuex';
import { DiscoTranscation } from '@/utils/contract/disco';

// 0 默认状态，1 等待开始，2 进行中，3 失败，4 成功
const stateBadgeStatusMap = {
  0: 'default',
  1: 'warning',
  2: 'processing',
  3: 'error',
  4: 'success'
};

export default {
  name: 'DiscoDetail',
  components: {
    Descriptions
  },
  props: {
    id: String,
    noBtn: Boolean,
    tokenSymbol: {
      type: String,
      default: 'Token'
    }
  },
  data() {
    return {
      status: null,
      detail: {}
    };
  },
  computed: {
    ...mapGetters(['account']),
    modules() {
      return [
        {
          fields: [
            {
              label: 'Fund-Raising Contract Addrrss',
              value: 'fundRaisingAddr',
              copyable: true
            },
            {
              label: 'Start-Up Wallet Address',
              value: 'walletAddr',
              copyable: true
            },
            {
              label: 'Token Contract',
              value: 'tokenAddr',
              copyable: true
            },
            {
              label: 'Description',
              value: 'description',
              render: v => {
                return (
                  <a href={v} target="_black">
                    {v}
                  </a>
                );
              }
            },
            {
              label: 'Fund-Raising Time',
              value: 'fundRaisingStartedAt',
              render: (v, record) => {
                return v ? (
                  <span>
                    {moment(v).format('YYYY-MM-DD')} ~{' '}
                    {moment(record.fundRaisingEndedAt).format('YYYY-MM-DD')}
                  </span>
                ) : null;
              }
            },
            {
              label: 'Investment Reward',
              value: 'investmentReward',
              render: v => `${v} %`
            },
            {
              label: '* Reward Decline Rate (Day)',
              value: 'rewardDeclineRate',
              render: v => `${v} %`
            },
            {
              label: 'Sharte Token',
              value: 'shareToken',
              render: v => `${v} ${this.tokenSymbol}`
            },
            {
              label: 'Fund-Raising ETH (min)',
              value: 'minFundRaising',
              render: v => `${v} ETH`
            },
            {
              label: 'Add Liquidity Pool',
              value: 'addLiquidityPool',
              render: v => `${v} %`
            },
            {
              label: 'Total Deposit Token',
              value: 'totalDepositToken',
              render: v => `${v} ${this.tokenSymbol}`
            },
            {
              label: 'Status',
              value: 'state',
              render: v => {
                return (
                  <span class="flex-inline ai-center">
                    <a-badge status={stateBadgeStatusMap[v]} />
                    {this.getStatusNode(v)}
                  </span>
                );
              }
            },
            {
              label: 'Raised Until Now',
              value: 'tokenRaised',
              render: v => `${v} ETH`
            },
            {
              label: 'Investors',
              value: 'investors',
              render: () => <Investors id={this.id} onData={this.updateInvestorsHandler} />
            }
          ]
        }
      ];
    }
  },
  watch: {
    id: {
      immediate: true,
      async handler(v) {
        const { error, data } = await services['cores@startup-disco和swap状态']({ startupId: v });
        if (!error) {
          this.status = data.discoState;
          // -1 未开启，0 创建中，1 等待开启（创建成功），2 创建失败，3 开启中，4 等待募资开始（数据库为4，时间未开始），5 募资成功，6 募资失败，7 募资中（数据库为4，时间进行中），8 募资结束（数据库为4，时间已结束）
          if (this.status >= 0) {
            const res = await services['cores@disco-startup-获取']({ startupId: v });
            if (!res.error) {
              // detail里的state 0 默认状态，1 等待开始，2 进行中，3 失败，4 成功
              this.detail = res.data;
            }
          }
        }
      }
    }
  },
  mounted() {
    this.discoInstance = DiscoTranscation.getInstance();
  },
  methods: {
    getStatusNode(status) {
      switch (status) {
        case 1:
          return <span class="t-primary">Waitting for start</span>;
        case 2:
          return <span class="t-primary">In Progress</span>;
        case 3:
          return (
            <span class="t-grey">
              End <span class="t-error">（Failed）</span>
            </span>
          );
        case 4:
          return (
            <span class="t-grey">
              End <span class="t-primary">（Succeed）</span>
            </span>
          );
        default:
          return null;
      }
    },
    updateInvestorsHandler(totalETH) {
      this.$set(this.detail, 'tokenRaised', totalETH);
    },
    async doInvest() {
      const discoId = this.detail.id;
      const investAddress = this.detail.fundRaisingAddr;
      await this.discoInstance.invest(discoId, investAddress, this.account);
    }
  },
  render(h) {
    switch (this.status) {
      case null:
        return <loading />;
      case -1:
        return (
          <div class="not-enabled flex ai-center jc-center">
            <a-icon
              type="exclamation-circle"
              theme="filled"
              class="mr-12 f-20"
              style={{ color: '#FAAD14' }}
            />
            DISCO does not be enabled.
          </div>
        );
      default:
        return (
          <div class="disco-container">
            {this.modules.map(module => {
              const { fields } = module;
              return (
                <div class="mb-32">
                  <Descriptions columns={fields} labelWidth={300} dataSource={this.detail} />
                </div>
              );
            })}
            <a
              href="https://bbs.comunion.io/d/287-what-is-the-disco"
              target="_blank"
              class="disco-help-link"
            >
              What is DISCO
            </a>

            {!this.noBtn && (
              <a-button
                class="invest-btn"
                disabled={this.status !== 3}
                type="primary"
                size="large"
                block
                onClick={this.doInvest}
              >
                Invest
              </a-button>
            )}
            {this.status === 5 && this.totalETH && (
              <div className="mt-16 t-grey">
                Initial Price Find:{' '}
                <span class="t-primary">
                  {Math.floor((this.detail.shareToken / this.totalETH) * 1000) / 1000}{' '}
                  {this.tokenSymbol} per ETH
                </span>
              </div>
            )}
          </div>
        );
    }
  }
};
</script>
<style scoped lang="less">
.not-enabled {
  height: 162px;
  background: #fef6e9;
}
.disco-help-link {
  display: inline-block;
  margin-bottom: 52px;
  text-decoration: underline;
}
</style>
