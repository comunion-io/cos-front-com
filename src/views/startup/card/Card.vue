<template>
  <div class="card">
    <div class="image">
      <slot name="image"></slot>
    </div>
    <div class="card-content">
      <div class="card-title">
        <span class="text">
          <slot name="text"></slot>
        </span>
        <span v-if="state && state !== 'done'" class="state" :class="[`state-${state}`]">
          <slot name="state"></slot>
        </span>
      </div>
      <div class="description">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    state: String
  }
};
</script>
<style scoped lang="less">
.card {
  display: flex;
  flex-direction: row;
  height: 124px;
  background: #fff;
  font-size: 20px;
  margin-bottom: 24px;
  margin-left: 30px;
  margin-right: 30px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  .image {
    align-items: center;
    display: flex;

    margin-left: 36px;
    margin-right: 36px;
    img {
      height: 48px;
      width: 48px;
    }
  }
  .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding-bottom: 36px;
    padding-top: 36px;
    font-size: 15px;
    .card-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      line-height: 1;
      color: #000;
      .state {
        display: inline-flex;
        align-items: center;
        margin-left: 24px;
        padding: 0 20px;
        height: 24px;
        border-radius: 12px;
        &.state-creating {
          background: #ffeaea;
          color: #d80000;
        }
        &.state-waiting {
          background: #e2fff0;
          color: #3ac47d;
        }
        // transform: translateY(-4px);
      }
    }
    .description {
      margin-top: 18px;
      color: #999999;
    }
  }
}
</style>
