<template>
  <div class="c-table-warpper">
    <div class="c-table-container">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        @change="handleChange"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-for="col in columns" #[col.dataIndex]="text, record, index">
          <slot :name="col.dataIndex" :text="text" :record="record" :index="index"></slot>
        </template>
      </a-table>
    </div>
    <div v-show="showPagination" class="c-table-pagination">
      <pagination v-bind="pagination" @change="handlePaginationChange" />
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
          limit: 20,
          offset: 1,
          total: 0
        };
      }
    },
    enablePagination: {
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
    },
    onChange: Function,
    onPaginationChange: Function
  },
  computed: {
    showPagination() {
      return this.enablePagination && (this.dataSource?.length > 0 || this.pagination?.total > 0);
    }
  },
  methods: {
    handleChange(pagination, filters, sorter) {
      this.$emit('on-change', filters, sorter);
    },
    handlePaginationChange(page, pageSize) {
      const offset = page ? (page - 1) * pageSize : 0;
      this.$emit('on-pagination-change', offset, pageSize);
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
  overflow: auto;

  .ant-table {
    width: 100%;
    height: 100%;
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
