<template>
  <div class="wrap">
    <div class="desc">
      <span>UVU / ETH</span>
      <span>0.9947 ETH</span>
      <span>+1.15%</span>
      <span>24 Hours</span>
    </div>
    <div class="chart">
      <line-chart renderer="svg" :x-axis="xAxis" :y-axis="yAxis" :series="series" :grid="grid" />
    </div>
  </div>
</template>

<script>
import LineChart, { AREA_SERIE } from '@/components/charts/LineChart.vue';

const XAXIS = {
  type: 'category',
  boundaryGap: false,
  name: 'Month.Day',
  nameTextStyle: {
    color: '#79828B',
    align: 'right',
    verticalAlign: 'top',
    padding: [10, 20, 0, 0]
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: '#EDEDED'
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    show: false
  }
};
const YAXIS = {
  show: true,
  type: 'value',
  name: 'price',
  nameTextStyle: {
    align: 'left',
    color: '#79828B'
  },
  axisLine: {
    show: false
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#EDEDED',
      type: 'dashed'
    }
  }
};
const GRID = {
  top: 30,
  right: 0,
  bottom: 30,
  left: 0
};
export default {
  data() {
    return {
      grid: {},
      xAxis: [],
      yAxis: [],
      series: []
    };
  },
  components: {
    LineChart
  },
  mounted() {
    this.setChartSeriesAndXAxis(this.chartData);
  },
  methods: {
    setChartSeriesAndXAxis(data) {
      this.grid = GRID;
      this.yAxis = [YAXIS];
      // TODO: 待数据接入
      this.xAxis = [
        {
          ...XAXIS,
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
          name: 'price',
          data: [23, 17, 16, 20, 21, 25, 32, 19, 18, 32]
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: column;
  .desc {
    line-height: 20px;
    color: #79828b;
    margin-bottom: 16px;
    cursor: pointer;
    span {
      margin-right: 18px;
    }
  }
  .chart {
    flex: 1;
  }
}
</style>
