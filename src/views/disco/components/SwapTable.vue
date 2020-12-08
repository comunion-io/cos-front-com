<template>
  <c-table key="swap-table" :columns="columns" :data-source="dataSource" />
</template>

<script>
import CTable from '@/components/table/CTable.vue';

const tableColumns = [
  {
    title: 'Start-Up',
    dataIndex: 'name',
    width: 150
  },
  {
    title: 'Price (ETH)',
    dataIndex: 'age',
    width: 150
  },
  {
    title: 'Liquidity (ETH)',
    dataIndex: 'address'
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'address1'
  },
  {
    title: 'PriceChange',
    dataIndex: 'address2'
  }
];

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
    CTable
  },
  data() {
    return {
      columns: tableColumns,
      dataSource: data
    };
  }
};
</script>
