<script>
import Descriptions from '@/components/display/Descriptions';
import services from '@/services';
export default {
  name: 'DiscoDetail',
  components: {
    Descriptions
  },
  props: {
    id: String
  },
  data() {
    return {
      status: null,
      detail: {}
    };
  },
  computed: {
    modules() {
      return [
        {
          fields: [
            {
              label: 'Fund-Raising Contract Addrrss',
              value: 'txId',
              copyable: 'true'
            },
            {
              label: 'Start-Up Wallet Address',
              value: 'walletAddr',
              copyable: 'true'
            },
            {
              label: 'Token Contract',
              value: 'tokenContract',
              copyable: 'true'
            },
            {
              label: 'Description',
              value: 'description'
            },
            {
              label: 'Fund-Raising Time',
              value: 'fundRaisingTime'
            },
            {
              label: 'Sharte Token',
              value: 'shareToken'
            },
            {
              label: 'Minimum Fundraising ETH',
              value: 'minFundRaising'
            },
            {
              label: 'Investment Reward',
              value: 'investmentReward'
            },
            {
              label: 'Add Liquidity Token',
              value: 'addLiquidityPool'
            },
            {
              label: 'Total Deposit Token',
              value: 'totalDepositToken'
            },
            {
              label: 'Status',
              value: 'status'
            },
            {
              label: 'TokenRaised Until Now',
              value: 'tokenRaised'
            },
            {
              label: 'Investors',
              value: 'investor'
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
          if (this.status >= 1) {
            const res = await services['cores@disco-startup-获取']({ startupId: v });
            if (!res.error) {
              this.detail = res.data;
            }
          }
        }
      }
    }
  },
  methods: {
    invest() {
      console.log('invest');
    }
  },
  render(h) {
    switch (this.status) {
      case null:
        return <a-spin />;
      case 0:
        return <span>未开启</span>;
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
            {/** 暂时注释掉，在Sprint04的时候返注
           <a href="#" class="disco-desc">
          What is DISCO
        </a>
        */}

            <a-button class="invest-btn" onClick={this.invest} type="primary" block>
              Invest
            </a-button>
          </div>
        );
    }
  }
};
</script>
<style scoped lang="less"></style>
