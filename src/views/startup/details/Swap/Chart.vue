<template>
  <div class="wrap">
    <div class="desc" @click="onSwitch">
      <span>{{ tokenName[0] }} / {{ tokenName[1] }}</span>
      <span>{{ pricePerToken[0] }} {{ tokenName[1] }}</span>
      <span>{{ priceChangeRate >= 0 ? '+' : '-' }}{{ priceChangeRate }}%</span>
      <span>24 Hours</span>
    </div>
    <div class="chart">
      <line-chart renderer="svg" :x-axis="xAxis" :y-axis="yAxis" :series="series" :grid="grid" />
    </div>
  </div>
</template>

<script>
import services from '@/services';
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
      series: [],
      tokenName: [],
      pricePerToken: [],
      priceChangeRate: 0,
      loading: false
    };
  },
  props: {
    exchange: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    LineChart
  },
  mounted() {
    this.getData();
    // this.setChartSeriesAndXAxis(this.chartData);
  },
  methods: {
    // 获取数据
    async getData() {
      this.loading = true;
      const { error, data } = await services['cores@exchange-价格变化']({
        exchangeId: this.exchange.id
      });
      if (!error) {
        this.tokenName = [data.tokenSymbol1, data.tokenSymbol2];
        this.pricePerToken = [data.pricePerToken1, data.pricePerToken2];
        this.priceChangeRate = data.priceChangeRate;
        this.setChartSeriesAndXAxis({
          xAxisValue: data.priceChanges.occuredDate,
          seriesValue: data.priceChanges.price
        });
      }
      this.loading = false;
    },
    setChartSeriesAndXAxis(data) {
      this.grid = GRID;
      this.yAxis = [YAXIS];
      // TODO: 待数据接入
      this.xAxis = [
        {
          ...XAXIS,
          data: data.xAxisValue
        }
      ];
      this.series = [
        {
          ...AREA_SERIE,
          name: 'price',
          data: data.seriesValue
        }
      ];
    },
    // 切换显示
    onSwitch() {
      this.tokenName = [this.tokenName[1], this.tokenName[0]];
      this.pricePerToken = [this.pricePerToken[1], this.pricePerToken[0]];
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
