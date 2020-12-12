<template>
  <a-tabs class="c-tabs-container" :active-key="activeKey" @change="onTabsChange">
    <a-tab-pane v-for="item in tabPanes" :key="item.name" :tab="item.title">
      <slot :name="item.name"></slot>
    </a-tab-pane>
    <template slot="tabBarExtraContent">
      <slot name="extra"></slot>
    </template>
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
    onTabsChange(value) {
      this.$emit('on-change', value);
    }
  }
};
</script>

<style lang="less">
.c-tabs-container {
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
    padding: 0 30px;

    .ant-tabs-tab {
      font-size: 20px;
      padding: 20px 16px;
    }
  }

  .ant-tabs-extra-content {
    display: flex;
    align-items: center;
    height: 100%;

    .ant-input {
      width: 420px;
      height: 36px;
      line-height: 36px;
      background-color: hsla(0, 0%, 75%, 0.1);
      border-radius: 18px;
      border: none;
    }

    .ant-input-suffix {
      font-size: 22px;
      color: hsla(0, 0%, 0%, 0.25);
    }
  }
}
</style>
