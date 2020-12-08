<template>
  <div class="container">
    <div class="title">DAITO Total</div>
    <div class="sub-title">Daito</div>
    <div class="chart">
      <line-chart :x-axis="xAxis" :tooltip="tooltip" :series="series" />
    </div>
  </div>
</template>

<script>
import LineChart, {
  DEFAULT_XAXIS,
  AREA_SERIE,
  AREA_TOOLTIP
} from '@/components/charts/LineChart.vue';

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
      series: [],
      tooltip: AREA_TOOLTIP
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
          ...AREA_SERIE,
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
  height: 435px;
  padding: 12px;
  background-color: #ffffff;
  box-shadow: 0px 4px 60px 0px rgba(208, 208, 208, 0.5);
}

.title {
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  line-height: 30px;
  flex-shrink: 0;
}

.sub-title {
  font-size: 12px;
  font-weight: 400;
  color: #79828b;
  line-height: 18px;
  flex-shrink: 0;
}

.chart {
  flex: 1;
  min-height: 0;
  padding: 0;
}
</style>
