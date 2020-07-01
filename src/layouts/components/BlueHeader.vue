<template>
  <div class="blue-header">
    <div class="main-container flex ai-center h-100p">
      <router-link to="/" exact>
        <img src="@/assets/images/guide/white-logo.png" alt="" width="128" />
      </router-link>
      <div class="navs flex ai-center ml-32">
        <router-link
          v-for="nav in navs"
          :key="nav.name"
          class="nav flex-inline ai-center jc-center"
          :to="{ name: nav.name }"
          exact
          >{{ nav.title }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import navs from './navs';
export default {
  data() {
    return {
      navs
    };
  }
};
</script>

<style lang="less">
@import '~@/assets/styles/variables.less';
.blue-header {
  height: 64px;
  .navs {
    .nav {
      padding: 0 20px;
      height: 36px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
