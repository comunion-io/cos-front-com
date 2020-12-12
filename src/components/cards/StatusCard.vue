<template>
  <div class="container" :class="containerClass">
    <div class="price">{{ price }}</div>
    <div class="count">
      <span>{{ fmtCount }}</span>
      <span class="rate" :class="rateStatusClass">{{ fmtRate }}</span>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
import { fmtNumber } from '@/utils/fmt';

export default {
  props: {
    price: String,
    rate: Number,
    count: Number,
    label: String,
    containerClass: String
  },
  computed: {
    fmtCount() {
      return fmtNumber(this.count);
    },
    fmtRate() {
      const rate = this.rate;
      if (typeof rate !== 'number' || isNaN(rate)) {
        return rate;
      }

      return rate > 0 ? `+${rate}%` : `${rate}%`;
    },
    rateStatusClass() {
      return this.rate >= 0 ? 'positive-rate' : 'negative-rate';
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 280px;
  height: 113px;
  background: #ffffff;
  box-shadow: 0px 4px 60px 0px rgba(208, 208, 208, 0.5);
  border-radius: 3px;
  padding: 16px 36px;
}

.price {
  height: 15px;
  line-height: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #79828b;
  letter-spacing: 1px;
}

.rate {
  float: right;
  font-size: 18px;
  font-weight: bold;
  line-height: 23px;
}

.positive-rate {
  color: #14b52c;
}

.negative-rate {
  color: #ec0000;
}

.count {
  height: 46px;
  line-height: 46px;
  font-size: 30px;
  font-weight: 500;
  color: #000000;
}

.label {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
}
</style>
