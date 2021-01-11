<template>
  <div class="card-container">
    <status-card class="card-item" v-for="item in cardItems" v-bind="item" :key="item.label" />
    <div v-show="loading" class="spin-container">
      <div class="spin-content">
        <a-spin />
      </div>
    </div>
  </div>
</template>

<script>
import StatusCard from '@/components/cards/StatusCard.vue';

import services from '@/services';

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
      loading: false,
      cardItems: items
    };
  },
  mounted() {
    this.loadCardData();
  },
  methods: {
    async loadCardData() {
      this.loading = true;
      // TODO 待实际相关接口联调测试
      const { error, data } = await services['cores@disco-列表']({});

      this.loading = false;
      if (!error) {
        console.log('card data: ', data);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.card-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .card-item {
    flex: 0 0 24%;
  }

  @media screen and (max-width: 1400px) {
    .card-item {
      flex: 0 0 49%;

      &:nth-child(1n + 3) {
        margin-top: 20px;
      }
    }
  }
}

.spin-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .spin-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
