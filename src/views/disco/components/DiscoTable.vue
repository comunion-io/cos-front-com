<template>
  <c-table key="disco-table" :columns="columns" :data-source="dataSource" @change="onTableChange">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
  </c-table>
</template>

<script>
import CTable from '@/components/table/CTable.vue';

const tableColumns = [
  {
    title: 'Startup',
    dataIndex: 'name',
    width: 150,
    sorter: true,
    scopedSlots: { customRender: 'name' },
    ellipsis: true
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
    dataIndex: 'address1',
    sorter: true
  },
  {
    title: 'Liquidity Pool',
    dataIndex: 'address2',
    sorter: true
  },
  {
    title: 'Status',
    dataIndex: 'address3',
    align: 'center'
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
      dataSource: data,
      sortedInfo: {}
    };
  },
  mounted() {
    console.log('disco table mounted');
  },
  computed: {
    columns() {
      const { columnKey, order } = this.sortedInfo || {};
      return tableColumns.map(col => ({
        ...col,
        sortOrder: (columnKey === col.dataIndex && order) || undefined
      }));
    }
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      this.sortedInfo = sorter;
    }
  }
};
</script>
