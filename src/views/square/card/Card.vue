<template>
  <div class="home-card">
    <div class="flex jc-end iro">
      {{ startup.isIRO ? 'IRO' : '' }}
    </div>
    <div class="flex">
      <img :src="startup.logo || defaultLogo" alt="" width="46" height="46" class="no-shrink" />
      <div class="flex-1 ml-36">
        <h3 class="mb-0 lh-1 t-bold t-break t-trunc" :title="startup.name">{{ startup.name }}</h3>
        <p class="mt-16 mb-0 t-break t-trunc-2">{{ startup.mission }}</p>
      </div>
    </div>
    <div class="flex mt-36">
      <a-button type="primary" ghost size="small" shape="round">
        {{ startup.category.name }}
      </a-button>
      <a-button class="ml-auto" type="default" size="small" shape="round">
        <img style="margin-right: 5px;" src="@/assets/images/money_pocket@2x.png" alt="" />
        1,211
      </a-button>
      <a-button style="margin-left: 10px;" type="default" size="small" shape="round">
        <img style="margin-right: 5px;" src="@/assets/images/star@2x.png" alt="" />
        1,211
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    startup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultLogo: require('@/assets/images/file@2x.png')
    };
  }
};
</script>

<style scoped lang="less">
.home-card {
  margin-bottom: 20px;
  padding: 20px 36px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(6, 0, 1, 0.04);
  border-radius: 4px;
  padding-bottom: 28px;
  padding-top: 20px;
  .iro {
    color: rgba(58, 196, 125, 1);
    font-weight: 400;
  }
  /deep/ .ant-btn {
    height: 28px;
    display: inline-flex;
    align-items: center;
    font-size: 13px;
  }
  /deep/ .ant-btn-default {
    background: #f3f3f3;
    border: none;
    color: #111;
  }
}
</style>
