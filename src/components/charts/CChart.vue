<template>
  <div class="c-chart-container" style="padding: 0;"></div>
</template>

<script>
import echarts from 'echarts';

export function getLinearGradient(colors) {
  return new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    colors || [
      {
        offset: 0,
        color: 'hsla(232, 55%, 60%, 1)'
      },
      {
        offset: 1,
        color: 'hsla(0, 0%, 100%, 0)'
      }
    ]
  );
}

export default {
  props: {
    renderer: String,
    option: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    option: {
      handler(next) {
        this.init(next);
      },
      deep: true
    }
  },
  methods: {
    init(option) {
      if (this.chartInstance) {
        this.chartInstance.setOption(option || {});
        return;
      }

      const chartInstance = echarts.init(this.$el, this.renderer || 'canvas');

      chartInstance.setOption(option || {});

      this.chartInstance = chartInstance;
    },
    destroy() {
      if (this.chartInstance != null) {
        this.chartInstance.dispose();
        this.chartInstance = null;
      }
    }
  },
  destroyed() {
    this.destroy();
  }
};
</script>

<style scoped lang="less">
.c-chart-container {
  width: 100%;
  height: 100%;
}
</style>