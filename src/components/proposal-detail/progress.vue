<template>
  <div class="progress">
    <div class="progress-bar" :style="barStyle" />
    <div v-if="target" class="target-line" :style="lineStyle" />
  </div>
</template>

<script>
export default {
  props: {
    // 当前百分比进度
    percent: Number,
    // 目标百分比
    target: Number
  },
  computed: {
    barStyle() {
      return {
        width: `${this.percent}%`
      };
    },
    lineStyle() {
      return {
        left: `${this.target}%`
      };
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables.less';
.progress {
  position: relative;
  display: flex;
  max-width: 240px;
  width: 80%;
  height: 28px;
  line-height: 0;
  background-color: #e9ecef;
  border-radius: 14px;
}
.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: @primary-color;
  transition: width 0.6s ease;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 14px 14px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  animation: 2s linear infinite progress-bar-stripes;
}
@keyframes progress-bar-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 28px 0;
  }
}
.target-line {
  position: absolute;
  top: -10px;
  bottom: -10px;
  width: 0;
  border-left: 1px dashed @primary-color;
}
</style>
