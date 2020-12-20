<template>
  <div>
    <div class="wrap">
      <div class="input-item">
        <div class="header">
          <span class="label">You Pay</span>
          <span class="balance">Balance 1000ETH</span>
        </div>
        <div class="body">
          <div class="name">ETH</div>
          <div class="input-wrap">
            <input class="input" type="text" />
          </div>
        </div>
      </div>
      <div class="symbol">
        <ExchangeSVG class="icon" />
      </div>
      <div class="input-item">
        <div class="header">
          <span class="label">You Receive</span>
          <span class="balance">Price 10 UVU per ETH</span>
        </div>
        <div class="body">
          <div class="name">UVU</div>
          <div class="input-wrap">
            <input class="input" type="text" />
          </div>
        </div>
      </div>
    </div>
    <p class="text">Minimum received: 99.74 UVU</p>
    <p class="text">Price Impact：1.34%</p>
    <p class="text">Liquidity Provider Fee：0.003 ETH</p>
    <a-button class="btn" type="primary">
      Swap
    </a-button>
  </div>
</template>

<script>
import ExchangeSVG from './exchange.svg';
export default {
  data() {
    return {};
  },
  components: {
    ExchangeSVG
  }
};
</script>

<style lang="less" scoped>
@import '~./common.less';
.wrap {
  .symbol {
    &:before,
    &:after {
      display: none;
    }
    .icon {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%) rotate(90deg);
      cursor: pointer;
    }
  }
}
</style>
