<!-- bounty card -->
<template>
  <div class="bounty-card">
    <div class="bounty-info" @click="goToDetail(bounty)">
      <div class="header">
        <div class="company" @click.stop="toStartup(bounty)">
          <img v-if="bounty.startup.logo" class="logo" :src="bounty.startup.logo" alt="logo" />
          <img v-else class="logo" src="@/assets/images/comunion_logo.png" alt="logo" />
          <span class="company-name">{{ bounty.startup.name }}</span>
        </div>
        <div class="payments">
          <div class="payment" v-for="payment of bounty.payments" :key="payment.token">
            {{ payment.value }} {{ payment.token }}
          </div>
        </div>
      </div>
      <div class="title">{{ bounty.title }}</div>
      <div class="flex">
        <ul class="state-info">
          <li class="state" :class="{ stateClosed: bounty.status === 2 }">
            Status: {{ getBountyStatus(bounty.status) }}
          </li>
          <!-- <li class="hours">11 Hours left</li> -->
          <li class="hunters">
            {{ bounty.hunters.length }} Hunter{{ bounty.hunters.length > 1 ? 's' : '' }}
          </li>
          <!-- <li class="paied">1 Paied</li> -->
        </ul>
        <slot name="closeBtn" v-bind:bounty="bounty"></slot>
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
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px 0px rgba(212, 212, 212, 0.5);

  .bounty-info {
    cursor: pointer;
    padding: 20px 30px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .company {
        .logo {
          width: 24px;
          height: 24px;
          border-radius: 100%;
          vertical-align: middle;
          margin-right: 12px;
        }
        .company-name {
          color: #000000;
          font-family: MicrosoftYaHei;
        }
      }
      .payments {
        display: flex;
        .payment {
          margin-left: 12px;
          height: 24px;
          padding: 0 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          line-height: 24px;
          &:nth-of-type(2n + 1) {
            color: #6271d2;
            background-color: fade(#6271d2, 10);
          }
          &:nth-of-type(2n) {
            color: #ea981a;
            background-color: fade(#ea981a, 10);
          }
        }
      }
    }

    .title {
      width: 100%;
      max-width: 590px;
      line-height: 32px;
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #000000;
      margin-bottom: 20px;
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
  }
  .state-info {
    display: flex;
    margin-bottom: 0;
    line-height: 20px;
    padding: 0;

    li {
      color: #666666;
      // min-width: 100px;
      font-size: 14px;
      line-height: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      & + li {
        margin-left: 30px;
      }
    }

    .state {
      color: #00c73c;
      list-style: none;

      &.stateClosed {
        color: #999999;
      }
    }
  }
  /deep/ .ant-collapse-header {
    padding: 0;
    // margin-top: 48px;
    background: #fff;
  }

  /deep/ .ant-collapse-item {
    border-bottom: unset;
  }
}
</style>
