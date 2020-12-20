<template>
  <div class="count-block">
    <p class="title">{{ title }}</p>
    <div class="number">
      <span>{{ formatValue }}</span>
      <span class="growth" :class="[growth >= 0 ? 'up' : 'down']">
        {{ symbol }}{{ Math.abs(growth) }}%
      </span>
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
import { fmtNumber } from '@/utils/fmt';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    growth: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    symbol() {
      return this.growth >= 0 ? '+' : '-';
    },
    formatValue() {
      return fmtNumber(this.value);
    }
  }
};
</script>

<style lang="less" scoped>
.count-block {
  flex: 1;
  margin-right: 8px;
  box-shadow: 0px 4px 60px 0px rgba(208, 208, 208, 0.5);
  padding: 12px 30px;
  &:last-of-type {
    margin-right: 0;
  }
  .title {
    color: #79828b;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-bottom: 8px;
  }
  .number {
    line-height: 42px;
    font-size: 30px;
    color: #000;
    font-weight: 500;
    position: relative;
    .growth {
      position: absolute;
      right: 0;
      top: -12px;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      &.up {
        color: #14b52c;
      }
      &.down {
        color: #ec0000;
      }
    }
  }
  .name {
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
