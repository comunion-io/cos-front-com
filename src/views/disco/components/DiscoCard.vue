<template>
  <div class="card-container">
    <status-card v-for="item in cardItems" v-bind="item" :key="item.label" />
  </div>
</template>

<script>
import StatusCard from '@/components/cards/StatusCard.vue';

// TODO: 待数据接入
const items = [
  {
    price: 'ETH',
    count: 8889,
    label: 'Fundraising Startup (24h)'
  },
  {
    count: 63846,
    rate: 0,
    label: 'Exchange Volume (24h)'
  },
  {
    count: 68888,
    rate: 23.6,
    label: 'Total Startup DAITO'
  },
  {
    price: 'ETH',
    count: 532.43,
    rate: -12.3,
    label: 'Total Liquidity'
  }
];

export default {
  components: {
    StatusCard
  },
  data() {
    return {
      cardItems: items
    };
  }
};
</script>

<style lang="less" scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
