<template>
  <div class="container">
    <div class="title">DISCO Total</div>
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
import moment from 'moment';

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
      let xAxisData = [];
      let serieData = [];
      (data || []).forEach(item => {
        const time = moment(item.date).isValid()
          ? moment(item.date, undefined, 'en').format('MMMDD')
          : item.date;
        xAxisData.push(time);
        serieData.push(item.count);
      });

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
          data: xAxisData
        }
      ];
      this.series = [
        {
          ...AREA_SERIE,
          name: 'discototal',
          data: serieData
        }
      ];
    },
    async loadDataAndSetChart() {
      this.loading = true;

      const { error, data } = await services['cores@disco-增长eth数量统计']({
        timeFrom: moment()
          .add(-6, 'month')
          .startOf('day')
          .format(),
        timeTo: moment()
          .endOf('day')
          .add(1, 'second')
          .format()
      });

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
  margin-bottom: 16px;
}

.chart {
  flex: 1;
  min-height: 0;
  padding: 0;
}
</style>
