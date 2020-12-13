<template>
  <div class="full-width">
    <div>
      <disco-card></disco-card>
    </div>
    <div class="chart-container">
      <daito-total-chart :chart-data="chartData" />
    </div>
    <div>
      <c-tabs
        enable-search
        :tab-panes="tabPanes"
        :active-key="tabActiveKey"
        @on-change="onTabsChange"
      >
        <template v-slot:disco>
          <disco-table />
        </template>
        <template v-slot:swap>
          <swap-table />
        </template>
        <template v-slot:extra>
          <a-input-search :key="tabActiveKey" @search="onKeywordSearch" />
        </template>
      </c-tabs>
    </div>
  </div>
</template>

<script>
import DaitoTotalChart from './components/DaitoTotalChart.vue';
import DiscoTable from './components/DiscoTable.vue';
import SwapTable from './components/SwapTable.vue';
import DiscoCard from './components/DiscoCard.vue';
import CTabs from '@/components/tabs/CTabs.vue';

const tabPanes = [
  {
    name: 'disco',
    title: 'DISCO'
  },
  {
    name: 'swap',
    title: 'Swap'
  }
];

export default {
  components: {
    DaitoTotalChart,
    DiscoTable,
    SwapTable,
    DiscoCard,
    CTabs
  },
  data() {
    return {
      tabPanes,
      tabActiveKey: 'disco',
      chartData: {},
      keyword: ''
    };
  },
  methods: {
    onTabsChange(key) {
      this.keyword = '';
      this.tabActiveKey = key;
    },
    onKeywordSearch(value) {
      this.keyword = value;
    }
  }
};
</script>

<style lang="less" scoped>
.full-width {
  width: 100%;
}

.chart-container {
  margin: 36px 0;
  height: 500px;
}
</style>
