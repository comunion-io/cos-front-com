<template>
  <div class="your-position">
    <div class="title">Your position</div>
    <div class="row">
      <div class="label">'UVU'/ETH:</div>
      <div class="value">0.9486</div>
    </div>
    <div class="row">
      <div class="label">Your pool share:</div>
      <div class="value">100.000000%</div>
      <div class="label">'UVU':</div>
      <div class="value">2.999999</div>
      <div class="label">ETH:</div>
      <div class="value">0.299999</div>
    </div>
    <div class="tip">
      <span style="font-weight: bold;margin-right: 8px;">Tip:</span>
      <span>{{ tip }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {};
  },
  computed: {
    tip() {
      return this.type === 'add'
        ? 'When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
        : 'Delete pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.';
    }
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
