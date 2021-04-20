<template>
  <c-table
    key="disco-table"
    rowKey="id"
    :loading="loading"
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    @on-change="onTableChange"
    @on-pagination-change="onPaginationChange"
  >
    <template #startup="{ text }">
      <router-link
        class="link"
        :to="{
          name: 'startupDetail',
          params: {
            id: text.id
          },
          query: {
            tabName: 'Disco'
          }
        }"
      >
        <div class="logo" :style="`background-image: url(${text.logo || ''});`" />
        <span class="title">{{ text.name }}</span>
      </router-link>
    </template>
    <template #state="{ record }">
      <c-badge :color="getStateColor(record.state)" :text="getStateText(record.state)" />
    </template>
  </c-table>
</template>

<script>
import CTable from '@/components/table/CTable.vue';
import CBadge from '@/components/badge/CBadge.vue';

import services from '@/services';

const tableColumns = [
  {
    title: 'Start-Up',
    dataIndex: 'startup',
    sorter: true,
    scopedSlots: { customRender: 'startup' },
    width: 160,
    ellipsis: true
  },
  {
    title: 'ShareToken',
    dataIndex: 'shareToken',
    width: 120,
    ellipsis: true
  },
  {
    title: 'Foud-RaisingETH(min)',
    dataIndex: 'minFundRaising',
    width: 200,
    ellipsis: true
  },
  {
    title: 'InvestmentReward',
    dataIndex: 'investmentReward',
    sorter: true,
    width: 160,
    ellipsis: true
  },
  {
    title: 'Liquidity Pool',
    dataIndex: 'addLiquidityPool',
    sorter: true,
    width: 160,
    ellipsis: true
  },
  {
    title: 'Status',
    dataIndex: 'state',
    align: 'center',
    scopedSlots: { customRender: 'state' },
    width: 160,
    ellipsis: true
  }
];

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
      dataSource: [],
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
        sortOrder: columnKey === col.dataIndex && order != null ? order : undefined,
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
    onPaginationChange(offset) {
      this.offset = offset;
    },
    getStateColor(state) {
      switch (state) {
        case 1: // 等待开始
          return '#E18D00';
        case 2: // 进行中
          return '#6271D2';
        default:
          return '-';
      }
    },
    getStateText(state) {
      const text = {
        1: 'Waiting for enable',
        2: 'Failed',
        3: 'Enabling',
        4: 'Waiting for start',
        7: 'In progress',
        8: 'Waiting for settle'
      }[status];
      switch (state) {
        case 5:
          return 'End（Succeed）';
        case 6:
          return 'End（Failed）';
        default:
          return text;
      }
    },
    async loadDiscoData(params, offset = 0) {
      const { show, keyword, sortedInfo } = params || this;

      if (!show) {
        this.loading = false;
        return null;
      }

      this.loading = true;

      const { error, data } = await services['cores@disco-列表']({
        limit: 20,
        offset,
        keyword,
        orderBy:
          sortedInfo.columnKey === 'addLiquidityPool'
            ? 'liquidityPool'
            : sortedInfo.columnKey || 'createdAt',
        isAsc: sortedInfo.order ? sortedInfo.order === 'ascend' : false
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
