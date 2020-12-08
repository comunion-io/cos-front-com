<template>
  <c-table key="disco-table" :columns="columns" :data-source="dataSource" />
</template>

<script>
import CTable from '@/components/table/CTable.vue';

const tableColumns = [
  {
    title: 'Startup',
    dataIndex: 'name',
    width: 150
  },
  {
    title: 'ShareToken',
    dataIndex: 'age',
    width: 150
  },
  {
    title: 'Foud-RaaisingETH(min)',
    dataIndex: 'address'
  },
  {
    title: 'InvestmentReward',
    dataIndex: 'address1'
  },
  {
    title: 'Liquidity Pool',
    dataIndex: 'address2'
  },
  {
    title: 'Status',
    dataIndex: 'address3'
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
    address2: `London, Park Lane no. ${i}`,
    address3: `London, Park Lane no. ${i}`
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
