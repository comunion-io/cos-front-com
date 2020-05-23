<template>
  <div class="home-card">
    <a-row type="flex" justify="start">
      <a-col :span="2" :offset="22" class="iro">
        IRP State
      </a-col>
    </a-row>
    <a-row type="flex" justify="start">
      <a-col :span="2">
        <img src="@/assets/images/file@2x.png" alt="" />
      </a-col>
      <a-col :span="22">
        <h3>Comunion</h3>
        <p>The next generation org and startup network</p>
      </a-col>
    </a-row>
    <a-row type="flex" justify="start">
      <a-col :span="2">
        <a-button type="primary" ghost size="small">
          Business
        </a-button>
      </a-col>
      <a-col :span="4" :offset="18">
        <a-button type="primary" ghost size="small">
          <img style="margin-right: 5px;" src="@/assets/images/money_pocket@2x.png" alt="" />
          1.211
        </a-button>
        <a-button style="margin-left: 10px;" type="primary" ghost size="small">
          <img style="margin-right: 5px;" src="@/assets/images/star@2x.png" alt="" />
          1.211
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Card'
};
</script>

<style scoped lang="less">
.home-card {
  padding-left: 36px;
  margin-top: 30px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(6, 0, 1, 0.04);
  border-radius: 4px;
  padding-bottom: 28px;
  padding-top: 20px;
  .iro {
    color: rgba(58, 196, 125, 1);
    font-weight: 400;
  }
}
</style>
