<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <!-- 投影到 default-layout 下的slot中 -->
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
const default_layout = "default";

export default {
  computed: {
    layout() {
      // 自动加载default-layout（baseLayout）
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
}
</script>

<style lang="scss">
@import "assets/base.scss";
</style>
