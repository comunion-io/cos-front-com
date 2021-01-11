<template>
  <line-chart
    className="container"
    renderer="svg"
    :tooltip="tooltip"
    :animation="false"
    :x-axis="xAxis"
    :series="series"
  />
</template>

<script>
import LineChart, { DEFAULT_XAXIS, DEFAULT_SERIE } from '@/components/charts/LineChart.vue';

export default {
  components: {
    LineChart
  },
  props: {
    chartData: [String, Object]
  },
  data() {
    return {
      xAxis: [],
      series: [],
      tooltip: {
        show: false
      }
    };
  },
  mounted() {
    this.setChartSeriesAndXAxis(this.chartData);
  },
  watch: {
    chartData: {
      handler(next) {
        this.setChartSeriesAndXAxis(this.chartData);
      },
      deep: true
    }
  },
  methods: {
    setChartSeriesAndXAxis(next) {
      // TODO: 待数据接入
      this.xAxis = [
        {
          ...DEFAULT_XAXIS,
          data: [
            '11.01',
            '11.07',
            '11.13',
            '11.19',
            '11.25',
            '12.01',
            '12.07',
            '12.13',
            '12.19',
            '12.25'
          ]
        }
      ];
      this.series = [
        {
          ...DEFAULT_SERIE,
          data: [23, 17, 16, 20, 21, 25, 32, 19, 18, 32]
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  max-width: 100px;
  width: 100%;
  height: 100%;
}
</style>
