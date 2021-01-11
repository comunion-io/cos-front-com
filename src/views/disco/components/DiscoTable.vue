<template>
  <c-table
    key="disco-table"
    :loading="loading"
    :columns="columns"
    :data-source="dataSource"
    @on-change="onTableChange"
    @on-pagination-change="onPaginationChange"
  >
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

import services from '@/services';

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
  props: {
    keyword: String,
    show: Boolean
  },
  data() {
    return {
      dataSource: data,
      offset: 0,
      sortedInfo: {},
      pagination: {},
      loading: false
    };
  },
  created() {
    this.watchFilterParams();
  },
  mounted() {
    this.loadDiscoData();
  },
  computed: {
    columns() {
      const { columnKey, order } = this.sortedInfo || {};
      return tableColumns.map(col => ({
        ...col,
        className: columnKey === col.dataIndex && order != null ? 'table-head-selected' : undefined
      }));
    }
  },
  watch: {
    offset(next) {
      this.loadDiscoData(null, next);
    }
  },
  methods: {
    onTableChange(filters, sorter) {
      this.sortedInfo = sorter;
    },
    onPaginationChange(offset, limit) {
      this.offset = offset;
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
    async loadDiscoData(params, offset = 0) {
      const { show, keyword, sortedInfo } = params || this;

      if (!show) {
        this.loading = false;
        return null;
      }

      // TODO test
      this.loading = true;

      const { error, data } = await services['cores@disco-列表']({
        limit: 20,
        offset,
        keyword,
        orderBy: sortedInfo.columnKey,
        isAsc: sortedInfo.order ? sortedInfo.order === 'ascend' : undefined
      });

      this.loading = false;
      if (!error) {
        const { result, ...p } = data || {};
        this.pagination = p;
        this.dataSource = result || [];
      }
    },
    watchFilterParams() {
      if (this.unwatchFilterParams != null) {
        this.unwatchFilterParams();
      }

      this.unwatchFilterParams = this.$watch(
        function() {
          return {
            show: this.show,
            keyword: this.keyword,
            sortedInfo: this.sortedInfo
          };
        },
        async function(next, prev) {
          this.loadDiscoData(next, 0);
        },
        {
          deep: true
        }
      );
    }
  },
  destroyed() {
    if (this.unwatchFilterParams != null) {
      this.unwatchFilterParams();
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

<style lang="less">
.table-head-selected {
  .ant-table-column-title {
    color: #5a70ff !important;
  }
}
</style>
