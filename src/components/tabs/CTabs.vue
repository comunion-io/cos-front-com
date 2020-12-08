<template>
  <a-tabs class="c-tabs-container" :active-key="activeKey" @change="onTabsChange">
    <a-tab-pane v-for="item in tabPanes" :key="item.name" :tab="item.title">
      <slot :name="item.name"></slot>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  props: {
    activeKey: String,
    tabPanes: Array,
    contentClass: String
  },
  methods: {
    onTabsChange(val) {
      this.$emit('change', val);
    }
  }
};
</script>

<style lang="less">
.c-tabs-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  width: 100%;
  box-shadow: 0px 4px 60px 0px rgba(208, 208, 208, 0.5);
  border-radius: 3px;
  background: #fff;

  .ant-tabs-bar {
    height: 70px;
  }

  .ant-tabs-top-bar {
    margin: 0;
    flex-shrink: 0;
    padding: 0 30px;

    .ant-tabs-tab {
      font-size: 20px;
      padding: 20px 16px;
    }
  }

  .ant-tabs-content {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }
}
</style>
