<template>
  <div class="c-chart-container">
    <div class="c-chart" style="padding: 0;"></div>
    <div v-show="loading" class="c-spin">
      <div class="c-spin-content">
        <a-spin />
      </div>
    </div>
  </div>
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
    loading: {
      type: Boolean,
      default: false
    },
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

    this.removeResizeObserver = addDOMResizeObserver(this.$el.querySelector('.c-chart'), () => {
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

      const chartInstance = echarts.init(
        this.$el.querySelector('.c-chart'),
        this.renderer || 'canvas'
      );

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
  position: relative;
  width: 100%;
  height: 100%;
}

.c-chart {
  width: 100%;
  height: 100%;
}

.c-spin {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
