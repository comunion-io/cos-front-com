<!-- 页面结构布局 -->
<template>
  <div class="app-container">
    <AppHeader />
    <div class="main-container">
      <div class="py-32">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';

export default {
  components: {
    AppHeader
  }
};
</script>
<style scoped lang="less">
.app-header + .main-container {
  background: #f2f3f4;
  min-height: calc(100vh - 128px);
}
</style>
