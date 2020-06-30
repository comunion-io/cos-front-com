<template>
  <div class="blue-layout">
    <div class="bg-circle"></div>
    <div class="bg-circle"></div>
    <div class="bg-circle"></div>
    <!-- <app-header /> -->
    <router-view />
  </div>
</template>

<script>
// import AppHeader from './components/AppHeader';
export default {
  components: {
    // AppHeader
  }
};
</script>

<style lang="less" scoped>
.blue-layout {
  position: relative;
  background: #6170ff;
  color: #fff;
  .bg-circle {
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    &:nth-child(1) {
      width: 406px;
      height: 406px;
    }
    &:nth-child(2) {
      width: 66px;
      height: 66px;
    }
    &:nth-child(3) {
      width: 712px;
      height: 712px;
    }
  }
}
</style>
