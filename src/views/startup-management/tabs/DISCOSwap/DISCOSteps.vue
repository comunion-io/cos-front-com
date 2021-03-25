<!--
 * @Description: disco 步骤条
 * @Author: travelclover(travelclover@163.com)
 * @Date: 2021-03-22 18:44:11
-->
<template>
  <div class="disco-steps">
    <div
      class="step"
      :class="{ done: index + 1 <= step }"
      v-for="(item, index) in steps"
      :key="item"
    >
      <div class="number">
        <a-icon v-if="step > index + 1" type="check" />
        <span v-else>{{ index + 1 }}</span>
      </div>
      <div class="desc" :class="{ active: index + 1 === step }">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: ['Create Contract', 'Enable Contract', 'Enable Successful']
    };
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables.less';

.disco-steps {
  width: 100%;
  display: flex;
  margin-bottom: 24px;

  .step {
    flex: 1;
    color: #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &::before,
    &::after {
      content: ' ';
      display: flex;
      position: absolute;
      top: 15px;
      height: 2px;
      width: 50%;
      background-color: #ccc;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
    &:first-of-type::before {
      display: none;
    }
    &:last-of-type::after {
      display: none;
    }

    &.done {
      .number {
        border-color: @primary-color;
        background-color: @primary-color;
        color: #fff;
      }
      &::before,
      &::after {
        background-color: @primary-color;
      }

      .desc {
        color: @primary-color;
      }
    }

    .number {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #ccc;
      background-color: #fff;
      z-index: 1;
    }

    .desc {
      line-height: 24px;
      margin-top: 8px;
      &.active {
        font-weight: bold;
        color: #333;
      }
    }
  }
}
</style>
