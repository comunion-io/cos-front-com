<template>
  <div class="c-chart-container" style="padding: 0;"></div>
</template>

<script>
import echarts from 'echarts';
import { debounce } from 'lodash';
import { addDOMResizeObserver } from '@/utils/dom';

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
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.init();

    this.removeResizeObserver = addDOMResizeObserver(this.$el, () => {
      this.resize();
    });
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
    },
    resize() {
      if (this.chartInstance != null) {
        this.chartInstance.resize();
      }
    }
  },
  destroyed() {
    this.destroy();

    if (this.removeResizeObserver != null) {
      this.removeResizeObserver();
    }
  }
};
</script>

<style scoped lang="less">
.c-chart-container {
  width: 100%;
  height: 100%;
}
</style>
