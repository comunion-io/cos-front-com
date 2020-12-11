<template>
  <c-table key="swap-table" :columns="columns" :data-source="dataSource">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #address2="{ text }">
      <div class="chart-container">
        <price-change-chart :chartData="text" />
      </div>
    </template>
  </c-table>
</template>

<script>
import CTable from '@/components/table/CTable.vue';
import PriceChangeChart from './PriceChangeChart.vue';

const tableColumns = [
  {
    title: 'Start-Up',
    dataIndex: 'name',
    width: 150,
    sorter: true,
    scopedSlots: { customRender: 'name' },
    ellipsis: true
  },
  {
    title: 'Price (ETH)',
    dataIndex: 'age',
    width: 150
  },
  {
    title: 'Liquidity (ETH)',
    dataIndex: 'address',
    sorter: true
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'address1',
    sorter: true
  },
  {
    title: 'PriceChange',
    dataIndex: 'address2',
    align: 'center',
    scopedSlots: { customRender: 'address2' }
  }
];

// TODO: 待数据接入
const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    address1: `London, Park Lane no. ${i}`,
    address2: `London, Park Lane no. ${i}`
  });
}

export default {
  components: {
    CTable,
    PriceChangeChart
  },
  data() {
    return {
      dataSource: data,
      sortedInfo: {}
    };
  },
  mounted() {
    console.log('swap table mounted');
  },
  computed: {
    columns() {
      const { columnKey, order } = this.sortedInfo || {};
      return tableColumns.map(col => ({ ...col, sortOrder: columnKey === col.dataIndex && order }));
    }
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      this.sortedInfo = sorter;
    }
  }
};
</script>

<style lang="less" scoped>
.chart-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
