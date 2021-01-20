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
      detail: {}
    }
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
      handler(v) {
        const { error, data } = await services['cores@disco-startup-获取']({ startupId: v })
        if (!error) {
          this.detail = data
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
};
</script>
<style scoped lang="less"></style>
