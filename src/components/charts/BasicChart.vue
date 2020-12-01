<template>
  <div key="basic-chart" class="container" style="padding: 0;"></div>
</template>

<script lang="ts">
import echarts from 'echarts';

export default {
  props: {
    renderer: String,
    option: {
      type: Object,
      required: true
    }
  },
  created() {
    this.watchOption();
  },
  mounted() {
    this.init();
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
    watchOption() {
      if (this.unwatchOption) {
        return;
      }

      this.unwatchOption = this.$watch(
        function() {
          return this.option;
        },
        function(nextOption) {
          this.init(nextOption);
        },
        { deep: true }
      );
    }
  },
  destroyed() {
    this.unwatchOption();
    this.destroy();
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
