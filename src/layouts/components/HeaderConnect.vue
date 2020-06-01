<template>
  <div class="header-connect">
    <a-button class="ml-auto mr-24" size="large" @click="connectAccount">Connect account</a-button>
  </div>
</template>

<script>
export default {
  name: 'HeaderConnect',
  methods: {
    /**
     * @description 点击连接按钮
     */
    connectAccount() {
      this.$store.dispatch('login');
    }
  }
};
</script>

<style scoped lang="less">
.header-connect {
  margin-left: 10px;
}
</style>
