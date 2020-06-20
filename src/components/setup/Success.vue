<template>
  <div class="success">
    <img class="ml-16" src="@/assets/images/success@2x.png" alt="" width="38" />
    <div class="text">
      <p>Congratulations</p>
      <p>You already have your startup</p>
    </div>
    <a-button type="primary" class="btn">
      <router-link :to="{ name: 'startupSetting' }">
        Go to Set Startup
      </router-link>
    </a-button>
    <p>come back to home</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.success {
  text-align: center;
  margin-top: 55px;
  img {
    height: 96px;
    width: 96px;
  }
  .text {
    font-size: 8px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .btn {
    margin-top: 16px;
    width: 190px;
    height: 27px;
    background: rgba(97, 112, 255, 1);
    margin-bottom: 15px;
  }
}
</style>
