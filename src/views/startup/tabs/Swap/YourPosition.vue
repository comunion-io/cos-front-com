<template>
  <div class="your-position">
    <div class="title">Your position</div>
    <div class="row">
      <div class="label">{{ tokenSymbol }} /ETH:</div>
      <div class="value">
        {{ Math.floor((etherInFundPoolAmount / tokenInFundPoolAmount) * 1000) / 1000 }}
      </div>
    </div>
    <div class="row">
      <div class="label">Your pool share:</div>
      <div class="value">100.000000%</div>
      <div class="label">{{ tokenSymbol }}:</div>
      <div class="value">{{ tokenInFundPoolAmount }}</div>
      <div class="label">ETH:</div>
      <div class="value">{{ etherInFundPoolAmount }}</div>
    </div>
    <div class="tip">
      <span style="font-weight: bold;margin-right: 8px;">Tip:</span>
      <span>{{ tip }}</span>
    </div>
  </div>
</template>

<script>
import { getTokenBalance } from '@/services/utils';
import { COMUNION_VUE_APP_SWAPROUTER01_WETH } from '@/configs/app';
export default {
  props: {
    type: {
      type: String,
      default: 'add'
    },
    startup: {
      type: Object,
      default: () => {}
    },
    exchange: {
      type: Object,
      default() {
        return '';
      }
    }
  },
  data() {
    return {
      /** 流动池中的token */
      tokenInFundPoolAmount: 0,
      /** 流动池中的ather */
      etherInFundPoolAmount: 0,
      /** token 的发布地址 */
      tokenAddr: ''
    };
  },
  computed: {
    tip() {
      return this.type === 'add'
        ? 'When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
        : 'Delete pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.';
    },
    tokenSymbol() {
      return this.startup?.settings?.tokenSymbol || '';
    }
  },
  async mounted() {
    this.tokenAddr = this.startup.settings.tokenAddr;
    this.etherInFundPoolAmount = await getTokenBalance(
      COMUNION_VUE_APP_SWAPROUTER01_WETH,
      this.exchange.pairAddress
    );
    this.tokenInFundPoolAmount = await getTokenBalance(this.tokenAddr, this.exchange.pairAddress);
  }
};
</script>

<style lang="less" scoped>
.your-position {
  background-color: #f6f7fc;
  border-radius: 12px;
  padding: 20px 30px;

  .title {
    border-left: 4px solid #6170ff;
    font-weight: bold;
    height: 16px;
    line-height: 16px;
    padding-left: 8px;
    margin-bottom: 16px;
  }

  .row {
    display: flex;
    .label {
      font-weight: bold;
      margin: 0 8px 8px 0;
    }
    .value {
      margin: 0 40px 8px 0;
    }
  }
}
</style>
