<template>
  <a-pagination
    class="com-pagination"
    v-model="currentPage"
    :page-size.sync="pageSize"
    hide-on-single-page
    show-quick-jumper
    v-bind="$attrs"
    v-on="$attrs"
  />
</template>

<script>
export default {
  name: 'ComPagination',
  props: {
    limit: {
      type: Number,
      default: 10
    },
    offset: Number
  },
  computed: {
    pageSize: {
      get() {
        return this.limit;
      },
      set(v) {
        this.$emit('update:limit', v);
        this.$emit('change');
      }
    },
    currentPage: {
      get() {
        return this.offset / this.limit + 1;
      },
      set(v) {
        this.$emit('update:offset', this.limit * (v - 1));
        this.$emit('change');
      }
    }
  }
};
</script>

<style lang="less">
.com-pagination {
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-item {
    width: 30px;
    height: 30px;
    background: #fff;
    border: none;
    border-radius: 3px;
    color: #999;
    font-size: 15px;
    box-shadow: 0px 2px 6px 0px rgba(5, 0, 0, 0.08);
  }
  .ant-pagination-next .ant-pagination-item-link {
    border: none;
  }
  .ant-pagination-disabled a {
    border: none;
  }
  .ant-pagination-item-active {
    background: @primary-color;
    a {
      color: #fff;
    }
  }
  .ant-pagination-options-quick-jumper {
    color: #999;
  }
}
</style>
