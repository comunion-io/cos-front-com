<template>
  <div class="container">
    <div class="title">Disco Total</div>
    <div class="chart-container">
      <line-chart :xAxis="xAxis" :series="series" />
    </div>
  </div>
</template>

<script>
import LineChart, { DEFAULT_XAXIS, DEFAULT_SERIE } from '@/components/charts/LineChart.vue';

export default {
  components: {
    LineChart
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      xAxis: [],
      series: []
    };
  },
  created() {
    this.$watch(
      function() {
        return this.chartData;
      },
      function(next, prev) {
        this.setChartSeriesAndXAxis(next);
      }
    );
  },
  mounted() {
    this.setChartSeriesAndXAxis(this.chartData);
  },
  methods: {
    setChartSeriesAndXAxis(data) {
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px;
}

.title {
  color: #6d9cfa;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  flex-shrink: 0;
}

.chart-container {
  flex: 1;
  min-height: 0;
  padding: 0;
}
</style>
