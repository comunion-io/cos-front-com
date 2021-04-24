<template>
  <c-table
    key="swap-table"
    rowKey="id"
    :loading="loading"
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :enablePagination="true"
    @on-change="onTableChange"
    @on-pagination-change="onPaginationChange"
  >
    <template #startup="{ text, record }">
      <router-link class="link" :to="`/startup/${record.id}?tabName=Swap`">
        <div class="logo" :style="`background-image: url(${(text && text.logo) || ''});`" />
        <span class="title">{{ text && text.name }}</span>
      </router-link>
    </template>
    <template #priceChanges="{ text }">
      <div class="chart-container">
        <price-change-chart :chartData="text" />
      </div>
    </template>
  </c-table>
</template>

<script>
import CTable, { DEFAULT_LIMIT } from '@/components/table/CTable.vue';
import PriceChangeChart from './PriceChangeChart.vue';

import services from '@/services';

const tableColumns = [
  {
    title: 'Start-Up',
    dataIndex: 'startup',
    width: 270,
    sorter: true,
    scopedSlots: { customRender: 'startup' },
    ellipsis: true
  },
  {
    title: 'Price (ETH)',
    dataIndex: 'price',
    width: 130,
    ellipsis: true
  },
  {
    title: 'Liquidity (ETH)',
    dataIndex: 'liquidities',
    width: 180,
    sorter: true,
    ellipsis: true
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volumes24Hrs',
    width: 180,
    sorter: true,
    ellipsis: true
  },
  {
    title: 'PriceChange',
    dataIndex: 'priceChanges',
    align: 'center',
    scopedSlots: { customRender: 'priceChanges' },
    width: 200
  }
];

export default {
  components: {
    CTable,
    PriceChangeChart
  },
  props: {
    keyword: String,
    show: Boolean
  },
  data() {
    return {
      dataSource: [],
      pagination: {},
      sortedInfo: {},
      offset: 0,
      loading: false
    };
  },
  created() {
    this.watchFilterParams();
  },
  mounted() {
    this.loadSwapData();
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
      this.loadSwapData(null, next);
    }
  },
  methods: {
    onTableChange(filters, sorter) {
      this.sortedInfo = sorter;
    },
    onPaginationChange(offset) {
      this.offset = offset;
    },
    async loadSwapData(params, offset = 0) {
      const { show, keyword, sortedInfo } = params || this;

      if (!show) {
        return null;
      }

      this.loading = true;

      const { error, data } = await services['cores@exchanges-列表']({
        limit: DEFAULT_LIMIT,
        offset,
        keyword,
        orderBy: sortedInfo.columnKey || 'createdAt',
        isDesc: sortedInfo.order ? sortedInfo.order === 'descend' : false
      });

      this.loading = false;
      if (!error) {
        const { result, ...p } = data || {};
        this.pagination = { ...p, limit: DEFAULT_LIMIT };
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
          this.loadSwapData(next, 0);
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

<style lang="less">
.table-head-selected {
  .ant-table-column-title {
    color: #5a70ff !important;
  }
}
</style>
