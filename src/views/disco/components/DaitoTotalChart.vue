<template>
  <div class="container">
    <div class="title">DAITO Total</div>
    <div class="sub-title">Daito</div>
    <div class="chart">
      <line-chart
        renderer="svg"
        :loading="loading"
        :x-axis="xAxis"
        :grid="grid"
        :y-axis="yAxis"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
import LineChart, {
  DEFAULT_XAXIS,
  DEFAULT_YAXIS,
  AREA_SERIE,
  DEFAULT_GRID
} from '@/components/charts/LineChart.vue';

import services from '@/services';

const customYAxis = {
  ...DEFAULT_YAXIS,
  show: true,
  axisLine: {
    show: false
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#ededed',
      width: 1,
      type: 'dashed'
    }
  }
};

export default {
  components: {
    LineChart
  },
  data() {
    return {
      loading: false,
      xAxis: [],
      yAxis: [customYAxis],
      series: [],
      grid: {
        ...DEFAULT_GRID,
        bottom: 30
      }
    };
  },
  mounted() {
    this.loadDataAndSetChart();
  },
  methods: {
    setChartSeriesAndXAxis(data) {
      // TODO: 待数据接入
      this.xAxis = [
        {
          ...DEFAULT_XAXIS,
          show: true,
          name: 'Month/Day',
          nameLocation: 'end',
          nameTextStyle: {
            color: '#79828B',
            fontSize: 11,
            padding: [40, 0, 0, -75]
          },
          axisLine: {
            lineStyle: {
              color: '#EDEDED',
              width: 1
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
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
    },
    async loadDataAndSetChart() {
      this.loading = true;

      // TODO 联调具体相关接口
      const { error, data } = await services['cores@disco-列表']({});

      this.loading = false;
      if (!error) {
        this.setChartSeriesAndXAxis(data);
      }
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
  padding: 6px 0 16px;
}

.chart {
  flex: 1;
  min-height: 0;
  padding: 0;
}
</style>
