<template>
  <div class="header-connect">
    <a-button class="ml-auto mr-24" size="large" :loading="loading" @click="connectAccount"
      >Connect account</a-button
    >
  </div>
</template>

<script>
export default {
  name: 'HeaderConnect',
  data() {
    return {
      loading: false
    };
  },
  methods: {
    /**
     * @description 点击连接按钮
     */
    async connectAccount() {
      this.loading = true;
      try {
        await this.$store.dispatch('login');
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="less">
.header-connect {
  margin-left: 10px;
}
</style>
