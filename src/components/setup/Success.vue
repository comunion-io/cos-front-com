<template>
  <div class="success">
    <img src="@/assets/images/success@2x.png" alt="" width="96" height="96" />
    <p class="mt-36 f-15 t-grey">Completed</p>
    <router-link class="t-line" :to="{ name: 'square' }">Come back to home</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.success {
  text-align: center;
  margin-top: 55px;
  min-height: calc(100vh - 334px);
}
</style>
