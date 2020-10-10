<!-- bounty card -->
<template>
  <div class="bounty-card">
    <div class="bounty-info" @click="goToDetail(bounty)">
      <div class="flex">
        <div class="title">
          {{ bounty.title }}
        </div>

        <div class="ml-auto operation-btn">
          <a-button class="currency-btn" v-for="payment of bounty.payments" :key="payment.token">
            {{ payment.value }} {{ payment.token }}
          </a-button>
        </div>
      </div>
      <div class="flex" style="margin-top: 44px">
        <img v-if="bounty.startup.logo" class="logo" :src="bounty.startup.logo" alt="" />

        <img
          v-if="!bounty.startup.logo"
          class="logo"
          src="@/assets/images/comunion_logo.png"
          alt=""
        />
        <a-button-group class="flex">
          <a-button class="startup-btn" @click.stop="toStartup(bounty)">
            {{ bounty.startup.name }}
          </a-button>
        </a-button-group>
        <ul class="state-info">
          <li class="state">Status: {{ getBountyStatus(bounty.status) }}</li>
          <!-- <li class="hours">11 Hours left</li> -->
          <li class="hunters">
            {{ bounty.hunters.length }} Hunter{{ bounty.hunters.length > 1 ? 's' : '' }}
          </li>
          <!-- <li class="paied">1 Paied</li> -->
        </ul>
        <!-- <div class="ml-auto flex ai-center">Closed Bounty</div> -->
      </div>
    </div>
    <slot name="cardFooter" v-bind:bounty="bounty"></slot>
    <slot name="hunterInfo" v-bind:bounty="bounty"></slot>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { bountyStatus } from '@/filters/bounty';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    bounty: {
      type: Object
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
  methods: {
    goToDetail(bounty) {
      console.log(bounty);
      this.$router.push({ name: 'bountyDetail', params: { id: bounty.id } });
    },
    toStartup(bounty) {
      const startupId = bounty && bounty.startup && bounty.startup.id ? bounty.startup.id : '';
      if (startupId)
        this.$router.push({
          name: 'startupDetail',
          params: { id: startupId }
        });
    },
    getBountyStatus(status) {
      return bountyStatus(status);
    }
  },
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

  .bounty-info {
    cursor: pointer;
    padding-top: 38px;
    padding-bottom: 26px;
    padding-left: 32px;
    padding-right: 30px;
    .title {
      width: calc(100% - 244px);
      line-height: 20px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }

    .operation-btn {
      display: flex;
      flex-direction: row;
    }

    .currency-btn {
      border: none;
      line-height: 12px;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #6170ff;
      &:last-child {
        color: #ffad4d;
      }
      &:first-child {
        margin-left: auto;
        color: #6170ff;
      }
    }

    .logo {
      width: 36px;
      height: 36px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .startup-btn {
      height: 36px;
      width: 108px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      background: rgba(109, 122, 255, 0.05);
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
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
