<template>
  <a-spin size="large" :spinning="loading">
    <!-- 已开启DISCO -->
    <div v-if="exchange.status === 1">
      <div class="blocks">
        <CountBlock
          v-for="item in statistics"
          :key="item.name"
          :title="item.title"
          :value="item.value"
          :growth="item.growth"
          :name="item.name"
        />
      </div>

      <!-- 图表 -->
      <Chart :exchange="exchange" />

      <div>
        <div class="tabs">
          <div
            class="tab"
            :class="{ active: activeTab === tab }"
            v-for="tab in tabs"
            :key="tab"
            @click="tabOnChange(tab)"
          >
            {{ tab }}
          </div>
        </div>
        <Swap :exchangeId="exchangeId" v-if="activeTab === 'Swap'" />
        <FundsPool :exchangeId="exchangeId" v-else-if="activeTab === 'Funds Pool'" />
      </div>
    </div>

    <!-- 未开启DISCO，或者失败了 -->
    <div class="not-open" v-else>
      <a-icon class="icon" type="exclamation-circle" theme="filled" />
      <span>Liquidity pool has not been opened yet.</span>
    </div>
  </a-spin>
</template>

<script>
import services from '@/services';
import CountBlock from './CountBlock';
import Swap from './Swap';
import FundsPool from './FundsPool';
import Chart from './Chart';

export default {
  data() {
    return {
      activeTab: 'Swap',
      tabs: ['Swap', 'Funds Pool'],
      exchange: {},
      statistics: [
        { name: 'Exchange Volume(24h)', title: 'ETH', value: 0, growth: 0 },
        { name: 'Total Liquidity', title: 'ETH', value: 0, growth: 0 },
        { name: 'Transactions(24h)', title: '', value: 0, growth: 0 }
      ],
      loading: false,
      exchangeId: undefined
    };
  },
  props: {
    startup: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    CountBlock,
    Swap,
    FundsPool,
    Chart
  },
  mounted() {
    // 获取exchange
    this.getExchange();
  },
  methods: {
    tabOnChange(tab) {
      this.activeTab = tab;
    },
    // 获取exchange
    async getExchange() {
      this.loading = true;
      const { error, data } = await services['cores@exchange-startup-获取']({
        startupId: this.startup.id
      });
      this.loading = false;
      this.exchange = error ? {} : data;
      this.exchangeId = this.exchange.id;
      if (!error) {
        this.getData();
      }
    },
    async getData() {
      const { error, data } = await services['cores@exchange-汇总']({
        exchangeId: this.exchange.id
      });
      if (!error) {
        let statistics = [
          {
            name: 'Exchange Volume(24h)',
            title: 'ETH',
            value: data.volumes24Hrs,
            growth: data.volumes24HrsRate
          },
          {
            name: 'Total Liquidity',
            title: 'ETH',
            value: data.liquidities,
            growth: data.liquiditiesRate
          },
          {
            name: 'Transactions(24h)',
            title: '',
            value: data.transactions24Hrs,
            growth: data.transactions24HrsRate
          }
        ];
        this.statistics = statistics;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.not-open {
  background-color: #fef6e9;
  height: 162px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
  .icon {
    color: #faad14;
    font-size: 22px;
    margin-right: 12px;
  }
}

.blocks {
  display: flex;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  .tab {
    padding: 15px 12px;
    color: #000;
    line-height: 24px;
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 24px;
    &.active,
    &:hover {
      color: #6170ff;
      border-bottom: 2px solid #6170ff;
    }
  }
}
</style>
