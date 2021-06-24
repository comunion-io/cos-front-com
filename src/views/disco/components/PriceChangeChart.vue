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
import moment from 'moment';

export default {
  components: {
    LineChart
  },
  props: {
    chartData: Array
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
        this.setChartSeriesAndXAxis(next);
      },
      deep: true
    }
  },
  methods: {
    setChartSeriesAndXAxis(next) {
      let xAxisData = [];
      let serieData = [];
      (next || []).forEach(item => {
        const time = moment(item.occuredDay).isValid()
          ? moment(item.occuredDay, undefined, 'en').format('MMMDD')
          : item.occuredDay;
        xAxisData.push(time);
        serieData.push(item.endPrice);
      });

      this.xAxis = [
        {
          ...DEFAULT_XAXIS,
          data: xAxisData
        }
      ];
      this.series = [
        {
          ...DEFAULT_SERIE,
          name: 'price',
          data: serieData
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
