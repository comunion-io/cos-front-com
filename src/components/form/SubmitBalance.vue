<!-- 上链的提交btn -->
<template>
  <div class="banalce-submit">
    <a-row>
      <a-col :span="24">
        <a-button type="primary" block html-type="submit">Submit</a-button>
      </a-col>
    </a-row>
    <div>
      Balance:&nbsp;<span class="t-bold">{{ balance }} &nbsp;ETH</span>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { web3 } from '@/libs/web3';
import { mapGetters } from 'vuex';

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'submit-balance',
  components: {},
  data() {
    // 这里存放数据
    return {
      balance: 0
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['account']),
    // 余额过少，不能发起交易
    canNotTransaction() {
      return this.balance < 0.1;
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    /**
     * @description 获取钱包余额
     * @returns {Promise<void>}
     */
    async getBalance() {
      const balance = await web3.eth.getBalance(this.account);
      this.balance = +(balance / Math.pow(10, 18)).toFixed(4);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getBalance();
  },
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
</style>
