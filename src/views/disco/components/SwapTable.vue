<template>
  <c-table
    key="swap-table"
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

import services from '@/services';

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
  props: {
    keyword: String,
    show: Boolean
  },
  data() {
    return {
      dataSource: data,
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
    onPaginationChange(offset, limit) {
      this.offset = offset;
    },
    async loadSwapData(params, offset = 0) {
      const { show, keyword, sortedInfo } = params || this;

      if (!show) {
        return null;
      }

      // TODO
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
