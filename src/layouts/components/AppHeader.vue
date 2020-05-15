<template>
  <div class="app-header">
    <div class="main-container flex ai-center h-100p">
      <img src="@/assets/images/logo@2x.png" alt="" width="128" />
      <div class="navs flex ai-center ml-32">
        <router-link
          v-for="nav in navs"
          :key="nav.name"
          class="nav flex-inline ai-center jc-center"
          :to="{ name: nav.name }"
          >{{ nav.title }}</router-link
        >
      </div>
      <a-button class="ml-auto mr-24" type="green" size="large">
        <router-link :to="{ name: 'newStartup' }"> +&nbsp;New Startup </router-link>
      </a-button>
      <MegaMenu />
      <img
        v-if="isMetaMaskConnected"
        class="ml-16 setting"
        src="@/assets/images/setting@2x.png"
        alt=""
        width="38"
        @click="toSetting"
      />
      <img
        v-if="isMetaMaskConnected"
        class="ml-16 notification"
        src="@/assets/images/notification@2x.png"
        alt=""
        width="38"
      />
    </div>
  </div>
</template>

<script>
import MegaMenu from './MegaMenu';
import { mapGetters } from 'vuex';
export default {
  components: {
    MegaMenu
  },
  computed: {
    ...mapGetters(['isMetaMaskConnected'])
  },
  data() {
    return {
      navs: [
        { name: 'square', title: 'Home' },
        { name: 'bounty', title: 'Bounty' },
        { name: 'exchange', title: 'Exchange' },
        { name: 'governace', title: 'Governace' }
      ]
    };
  },
  methods: {
    /**
     * @description 前往setting startup 页面
     */
    toSetting() {
      this.$router.replace('/startup/settingStartUp');
    }
  }
};
</script>

<style lang="less">
@import '~@/assets/styles/ant.custom.less';
.app-header {
  height: 80px;
  background: #fff;
  .navs {
    .nav {
      width: 112px;
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
