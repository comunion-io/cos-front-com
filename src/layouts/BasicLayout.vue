<!-- 页面结构布局 -->
<template>
  <div class="app-container">
    <AppHeader />
    <div class="main-container mt-32">
      <router-view />
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
<style scoped lang="less"></style>
