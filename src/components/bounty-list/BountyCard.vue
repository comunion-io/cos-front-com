<!-- bounty card -->
<template>
  <div class="bounty-card">
    <slot name="bounty-info"></slot>
    <slot name="hunter-info"></slot>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {};
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 生命周期 - 创建之前
  beforeCreate() {},
  // 生命周期 - 挂载之前
  beforeMount() {},
  // 生命周期 - 更新之前
  beforeUpdate() {},
  // 生命周期 - 更新之后
  updated() {},
  // 生命周期 - 销毁之前
  beforeDestroy() {},
  // 生命周期 - 销毁完成
  destroyed() {},
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.bounty-card {
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 4px rgba(6, 0, 1, 0.04);
  border-radius: 4px;
  height: 184px;
  padding-top: 38px;
  padding-bottom: 26px;
  padding-left: 32px;
  padding-right: 30px;
  .state-info {
    display: flex;
    margin-bottom: 0;
    line-height: 32px;

    li {
      color: #666666;
      min-width: 100px;
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    .state {
      color: #3fc580;
    }
  }
  /deep/ .ant-collapse-header {
    padding: 0;
    margin-top: 48px;
    background: #fff;
  }

  /deep/ .ant-collapse-item {
    border-bottom: unset;
  }
}
</style>
