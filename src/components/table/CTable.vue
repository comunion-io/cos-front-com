<template>
  <div class="c-table-warpper">
    <div class="c-table-container">
      <a-table :columns="columns" :data-source="dataSource" :pagination="tableRecordCount" />
    </div>
    <div v-show="showPagination" class="c-table-pagination">
      <pagination v-bind="pagination" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/list/Pagination.vue';

export default {
  components: {
    Pagination
  },
  props: {
    pagination: {
      type: Object,
      default: function() {
        return {
          pageSize: 100,
          current: 1,
          total: 100
        };
      }
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true
    }
  },
  computed: {
    tableRecordCount() {
      return {
        pageSize: this.dataSource?.length || 0
      };
    }
  }
};
</script>

<style lang="less">
/** 表格行高 */
@row-height: 54px;
@cell-padding: 0 16px;

.c-table-warpper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
}

.c-table-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  .ant-table {
    width: 100%;
    height: 100%;
  }

  .ant-table-pagination {
    display: none;
  }

  .ant-table-thead > tr > th {
    height: @row-height;
    line-height: @row-height;
    padding: @cell-padding;
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    background-color: #fff;
    border-bottom: none;
  }

  .ant-table-tbody > tr {
    background-color: #fff;

    &:nth-child(2n + 1) {
      background-color: #fbfbfb;
    }

    > td {
      height: @row-height;
      line-height: @row-height;
      padding: @cell-padding;
      font-size: 15px;
      color: #000000;
      border-bottom: none;
    }
  }
}

.c-table-pagination {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  padding: 10px 16px;
}
</style>
