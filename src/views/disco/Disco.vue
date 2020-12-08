<template>
  <div class="container">
    <div class="card-container">
      <disco-card></disco-card>
    </div>
    <div class="chart-container">
      <daito-total-chart :chart-data="chartData" />
    </div>
    <div class="tabs-container">
      <c-tabs :tab-panes="tabPanes" :active-key="tabActiveKey" @change="onTabsChange">
        <template v-slot:disco>
          <disco-table />
        </template>
        <template v-slot:swap>
          <swap-table />
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
      chartData: {}
    };
  },
  methods: {
    onTabsChange(key) {
      this.tabActiveKey = key;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}

.card-container {
  width: 100%;
}

.chart-container {
  width: 100%;
  margin: 36px 0;
}

.tabs-container {
  width: 100%;
  height: 600px;
}
</style>
