<script>
import Descriptions from '@/components/display/Descriptions';
export default {
  name: 'disco',
  components: {
    Descriptions
  },
  props: {
    id: String,
    startup: Object
  },
  computed: {
    modules() {
      return [
        {
          fields: [
            {
              label: 'Fund-Raising Contract Addrrss',
              value: 'contract address',
              copyable: 'true'
            },
            {
              label: 'Start-Up Wallet Address',
              value: 'wallet addrss',
              copyable: 'true'
            },
            {
              label: 'Token Contract',
              value: 'token contract',
              copyable: 'true'
            },
            {
              label: 'Description',
              value: 'description'
            },
            {
              label: 'Fund-Raising Time',
              value: '2020-05-21'
            },
            {
              label: 'Sharte Token',
              value: 'share token'
            },
            {
              label: 'Minimum Fundraising ETH',
              value: 'fundraising'
            },
            {
              label: 'Investment Reward',
              value: 'investment reward'
            },
            {
              label: 'Add Liquidity Token',
              value: 'liquidity'
            },
            {
              label: 'Total Deposit Token',
              value: 'total'
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
  methods: {
    invest() {
      console.log('invest');
    }
  },
  render(h) {
    const { modules } = this;
    return (
      <div class="disco-container">
        {modules.map(module => {
          const { fields } = module;
          return (
            <div class="mb-32">
              <Descriptions columns={fields} labelWidth={300} dataSource={this.startup} />
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
<style scoped lang="less">
.disco-container {
  .disco-desc {
    margin-top: 16px;
    display: inline-block;
    margin-bottom: 54px;
    height: 19px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #5a70ff;
    line-height: 19px;
  }

  .invest-btn {
    height: 54px;
    background: #6170ff;
    box-shadow: 0px 2px 6px 0px rgba(147, 147, 147, 0.5);
    border-radius: 3px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
  }
}
</style>
