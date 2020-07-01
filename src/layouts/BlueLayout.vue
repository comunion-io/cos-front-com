<template>
  <div class="blue-layout app-container">
    <div class="bg-circle"></div>
    <div class="bg-circle"></div>
    <div class="bg-circle"></div>
    <blue-header />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import BlueHeader from './components/BlueHeader';
export default {
  components: {
    BlueHeader
  }
};
</script>

<style lang="less" scoped>
.blue-layout {
  position: relative;
  height: 960px;
  min-height: 100vh;
  background: #6170ff;
  color: #fff;
  overflow: hidden;
  .bg-circle {
    position: absolute;
    left: 50%;
    top: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    &:nth-child(1) {
      margin-left: -40%;
      margin-top: -18px;
      width: 406px;
      height: 406px;
    }
    &:nth-child(2) {
      margin-left: -20%;
      margin-top: 606px;
      width: 66px;
      height: 66px;
    }
    &:nth-child(3) {
      margin-left: 15%;
      margin-top: 439px;
      width: 712px;
      height: 712px;
    }
  }
  & > .blue-header,
  & > .main-container {
    position: relative;
    z-index: 2;
  }
}
</style>
