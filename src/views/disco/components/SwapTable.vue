<template>
  <c-table key="swap-table" :columns="columns" :data-source="dataSource">
    <template #name="{ record }">
      <router-link class="link" to="/">
        <div class="logo" :style="`background-image: url(${record.url || ''});`" />
        <span class="title">{{ record.name }}</span>
      </router-link>
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
    width: 270,
    sorter: true,
    scopedSlots: { customRender: 'name' },
    ellipsis: true
  },
  {
    title: 'Price (ETH)',
    dataIndex: 'age',
    width: 130,
    ellipsis: true
  },
  {
    title: 'Liquidity (ETH)',
    dataIndex: 'address',
    width: 180,
    sorter: true,
    ellipsis: true
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'address1',
    width: 180,
    sorter: true,
    ellipsis: true
  },
  {
    title: 'PriceChange',
    dataIndex: 'address2',
    align: 'center',
    scopedSlots: { customRender: 'address2' },
    width: 200
  }
];

// TODO: 待数据接入
const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    url: require('@/assets/images/guide/logo.png'),
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
  height: 80%;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-position: center;
  background-size: contain;
  margin-right: 10px;
}

.title {
  flex: 1;
  min-width: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
