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

const items = [
  {
    label: 'Fund-Raising Start-Up'
  },
  {
    price: 'ETH',
    label: 'Total Start-Up DISCO'
  },
  {
    price: 'ETH',
    label: 'Exchange Volume (24h)'
  },
  {
    price: 'ETH',
    label: 'Total Liquidity'
  }
];

function fmtRate(rate) {
  if (!rate) {
    return rate;
  }

  return parseFloat((rate * 100).toFixed(2));
}

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

      const [
        { error: discoEthError, data: discoEthData },
        { error: discoTotalError, data: discoTotalData },
        { error: exchangesError, data: exchangesData }
      ] = await Promise.all([
        services['cores@disco-募集的eth总数统计']({}),
        services['cores@disco-total统计']({}),
        services['cores@exchanges-统计合计']({})
      ]);

      this.loading = false;
      if (!discoEthError && !discoTotalError && !exchangesError) {
        this.cardItems = [
          {
            count: discoEthData && discoEthData.count,
            label: 'Fund-Raising Start-Up'
          },
          {
            price: 'ETH',
            count: discoTotalData && discoTotalData.count,
            rate: fmtRate(discoTotalData && discoTotalData.rate),
            label: 'Total Start-Up DISCO'
          },
          {
            price: 'ETH',
            count: exchangesData && exchangesData.volumes24Hrs,
            rate: fmtRate(exchangesData && exchangesData.volumes24HrsRate),
            label: 'Exchange Volume (24h)'
          },
          {
            price: 'ETH',
            count: exchangesData && exchangesData.liquidities,
            rate: fmtRate(exchangesData && exchangesData.liquiditiesRate),
            label: 'Total Liquidity'
          }
        ];
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

  @media screen and (max-width: 1000px) {
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
