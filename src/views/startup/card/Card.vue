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
        <span class="state">
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
export default {};
</script>
<style scoped lang="less">
.card {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 128px;
  background: azure;
  font-size: 20px;
  margin-bottom: 22px;
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
    .card-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      .state {
        background: rgba(226, 255, 240, 1);
        border-radius: 6px;
        margin-left: 40px;
      }
    }
  }
}
</style>
