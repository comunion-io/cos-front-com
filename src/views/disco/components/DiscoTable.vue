<template>
  <c-table key="disco-table" :columns="columns" :data-source="dataSource" @change="onTableChange">
    <template #name="{ record }">
      <router-link class="link" to="/">
        <div class="logo" :style="`background-image: url(${record.url || ''});`" />
        <span class="title">{{ record.name }}</span>
      </router-link>
    </template>
    <template #status="{ record }">
      <c-badge :color="getStatusColor(record.status)" :text="record.statusText" />
    </template>
  </c-table>
</template>

<script>
import CTable from '@/components/table/CTable.vue';
import CBadge from '@/components/badge/CBadge.vue';

import { getDiscos } from '@/services/disco.services';

const tableColumns = [
  {
    title: 'Startup',
    dataIndex: 'name',
    sorter: true,
    scopedSlots: { customRender: 'name' },
    width: 160,
    ellipsis: true
  },
  {
    title: 'ShareToken',
    dataIndex: 'age',
    width: 120,
    ellipsis: true
  },
  {
    title: 'Foud-RaaisingETH(min)',
    dataIndex: 'address',
    width: 200,
    ellipsis: true
  },
  {
    title: 'InvestmentReward',
    dataIndex: 'address1',
    sorter: true,
    width: 160,
    ellipsis: true
  },
  {
    title: 'Liquidity Pool',
    dataIndex: 'address2',
    sorter: true,
    width: 160,
    ellipsis: true
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' },
    width: 160,
    ellipsis: true
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
    address2: `London, Park Lane no. ${i}`,
    status: i % 2 === 0 ? 'waiting' : 'inprogress',
    statusText: i % 2 === 0 ? 'Waiting for start' : 'Inprogress'
  });
}

export default {
  components: {
    CTable,
    CBadge
  },
  data() {
    return {
      dataSource: data,
      sortedInfo: {}
    };
  },
  mounted() {
    this.loadDiscos();
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
    },
    getStatusColor(status) {
      // TODO
      switch (status) {
        case 'waiting':
          return '#E18D00';
        case 'inprogress':
          return '#6271D2';
      }
    },
    async loadDiscos() {
      // TODO
      try {
        const { result } = await getDiscos();
        console.log('disco result: ', result);
      } finally {
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
