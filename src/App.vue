<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default';
export default {
  computed: {
    layout() {
      // 自动加载default-layout（baseLayout）
      return (this.$route.meta.layout || defaultLayout) + 'Layout';
    }
  }
};
</script>

<style lang="scss">
@import './assets/styles/base.scss';
</style>
