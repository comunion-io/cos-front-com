<template>
  <div class="app-header">
    <div class="main-container flex ai-center h-100p">
      <router-link to="/" exact>
        <img src="@/assets/images/logo_2021.png" alt="" width="128" />
      </router-link>
      <div class="navs flex ai-center ml-24">
        <router-link
          v-for="nav in navs"
          :key="nav.name"
          class="nav flex-inline ai-center jc-center"
          :to="{ name: nav.name }"
          exact
          >{{ nav.title }}</router-link
        >
      </div>
      <!-- 未连接metamask, 暂时不能创建start up -->
      <a-button
        class="ml-auto mr-24"
        :type="isLoggedIn ? 'green' : 'default'"
        size="large"
        @click="createStartup"
      >
        +&nbsp;New Start-Up
      </a-button>
      <MegaMenu />
      <router-link v-if="isLoggedIn" :to="{ name: 'startupSetting' }">
        <img class="ml-16 setting" src="@/assets/images/setting@2x.png" alt="" width="38" />
      </router-link>
      <img
        v-if="isLoggedIn"
        class="ml-16 notification"
        src="@/assets/images/notification@2x.png"
        alt=""
        width="38"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { web3 } from '@/libs/web3';
import MegaMenu from './MegaMenu';
import navs from './navs';

export default {
  components: {
    MegaMenu
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'categories', 'logInTime'])
  },
  data() {
    return {
      navs
    };
  },
  methods: {
    createStartup() {
      this.$router.push({ name: this.isLoggedIn ? 'newStartup' : 'guide' });
    }
  },
  async mounted() {
    /** 关闭也页面， 在登出metamask, 在根据网址打开网页， comunion 任然显示登录状态 */
    if (web3 && web3.eth) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        this.$store.dispatch('logout');
      }
    }

    /** 每次加载， 需要检查登录时长， 超过6小时， 自动登出 */
    const outTime = 2 * 60 * 60 * 1000; // 设置超时时间： 6h
    const loginTime = this.logInTime;
    const now = new Date().getTime();
    if (now - loginTime > outTime) {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="less">
@import '~@/assets/styles/variables.less';
.app-header {
  height: 64px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(6, 0, 1, 0.07);
  .navs {
    .nav {
      padding: 0 16px;
      height: 36px;
      font-weight: bold;
      font-size: 16px;
      color: #999;
      &.active {
        background: #f0f1ff;
        color: @primary-color;
      }
    }
  }
  .setting {
    cursor: pointer;
  }
}
</style>
