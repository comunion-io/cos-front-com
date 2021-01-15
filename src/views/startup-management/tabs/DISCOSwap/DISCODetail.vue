<template>
  <div class="disco-detail">
    <Descriptions :columns="columns" :dataSource="disco" />
  </div>
</template>

<script>
import services from '@/services';
import Descriptions from '@/components/display/Descriptions';
export default {
  data() {
    return {
      disco: null
    };
  },
  components: {
    Descriptions
  },
  computed: {
    columns() {
      let columns = [
        {
          label: 'Fund-Raising Contract Address',
          value: 'walletAddr',
          copyable: true
        },
        {
          label: 'Start-Up Wallet Address',
          value: 'walletAddr',
          copyable: true
        },
        {
          label: 'Token Contract',
          value: 'tokenContract',
          copyable: true
        },
        {
          label: 'Description',
          value: 'description',
          render: v => (
            <a href={v} target="_black">
              {v}
            </a>
          )
        },
        {
          label: 'Fund-Raising Time',
          value: 'fundRaisingTime'
        },
        {
          label: 'Investment Reward',
          value: 'investmentReward',
          suffix: '%'
        },
        {
          label: 'Reward Decline Rate (Day)',
          value: 'rewardDeclineRate',
          suffix: '%'
        },
        {
          label: 'Share Token',
          value: 'shareToken',
          suffix: 'Token'
        },
        {
          label: 'Fund-Raising ETH (min)',
          value: 'minFundRaising',
          suffix: 'ETH'
        },
        {
          label: 'Add Liquidity Pool',
          value: 'addLiquidityPool',
          suffix: '%'
        },
        {
          label: 'Total Deposit Token',
          value: 'totalDepositToken',
          suffix: 'Token'
        },
        {
          label: 'Status',
          value: 'state',
          render: value => {
            return value;
          }
        },
        {
          label: 'Raised Until Now',
          value: 'raisedUntilNow',
          suffix: 'ETH'
        },
        {
          label: 'Investors',
          value: 'investors'
        }
      ];
      return columns;
    }
  },
  mounted() {
    // 获取disco信息
    this.getDisco();
  },
  methods: {
    // 获取disco信息
    async getDisco() {
      let { error, data } = await services['cores@disco-startup-获取']({
        startupId: this.$route.params.id
      });
      if (!error) {
        this.disco = data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.disco-detail {
  background-color: #fff;
}
</style>
