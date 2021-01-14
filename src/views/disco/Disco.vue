<template>
  <div class="full-width">
    <div>
      <disco-card></disco-card>
    </div>
    <div class="chart-container">
      <daito-total-chart />
    </div>
    <div>
      <c-tabs
        enable-search
        :tab-panes="tabPanes"
        :active-key="tabActiveKey"
        @on-change="onTabsChange"
      >
        <template v-slot:disco>
          <disco-table :keyword="discoKeyword" :show="tabActiveKey === 'disco'" />
        </template>
        <template v-slot:swap>
          <swap-table :keyword="swapKeyword" :show="tabActiveKey === 'swap'" />
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
      discoKeyword: '',
      swapKeyword: ''
    };
  },
  methods: {
    onTabsChange(key) {
      this.discoKeyword = '';
      this.swapKeyword = '';
      this.tabActiveKey = key;
    },
    onKeywordSearch(value) {
      switch (this.tabActiveKey) {
        case 'disco':
          this.discoKeyword = value;
          break;
        case 'swap':
          this.swapKeyword = value;
          break;
      }
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
}
</style>
