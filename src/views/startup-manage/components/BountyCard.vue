<!-- bounty card -->
<template>
  <div class="bounty-card">
    <div class="flex">
      <div class="title">
        #1 Design- Create A Vector For the Comunion Log Create A Vector For the Comunion Log
      </div>
      <a-button class="ml-auto" gohst size="small">
        4.00ETH
      </a-button>
      <a-button style="margin-left: 10px;" type="default" size="small">
        0.5ETH
      </a-button>
    </div>

    <div class="flex" style="margin-top: 44px">
      <a-button-group class="flex">
        <a-button>
          Comunion
        </a-button>
      </a-button-group>
      <ul class="status">
        <li>Statue: open</li>
        <li>11 Hours left</li>
        <li>11 HUnters</li>
        <li>1 Paied</li>
      </ul>
      <div class="ml-auto flex ai-center">Closed Bounty</div>
    </div>

    <div>
      <a-collapse expand-icon-position="right" :bordered="false">
        <a-collapse-panel key="1" header="Hunter: 5">
          <p>hello panel</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    bounty: {
      type: Object,
      required: true
    }
  },
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
  padding: 20px 28px 28px 32px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 4px rgba(6, 0, 1, 0.04);
  border-radius: 4px;
  width: calc(100% - 8px);
  margin-left: 4px;
  .status {
    display: flex;
    margin-bottom: 0;
    line-height: 32px;

    li {
      min-width: 100px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
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
