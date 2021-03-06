<template>
  <c-chart :loading="loading" :class="className" :renderer="renderer" :option="lineOption" />
</template>

<script>
import CChart, { getLinearGradient } from './CChart.vue';

export const DEFAULT_GRID = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  containLabel: false
};

export const DEFAULT_XAXIS = {
  show: false,
  type: 'category',
  boundaryGap: false
};

export const DEFAULT_YAXIS = {
  show: false,
  type: 'value'
};

export const DEFAULT_SERIE = {
  type: 'line',
  showSymbol: false,
  showAllSymbol: true,
  symbol: 'circle',
  symbolSize: 4,
  lineStyle: {
    color: '#6271D2',
    width: 1
  },
  itemStyle: {
    color: '#6271D2',
    borderColor: '#fff',
    borderWidth: 3
  }
};

export const AREA_SERIE = {
  type: 'line',
  showSymbol: false,
  showAllSymbol: true,
  symbol: 'circle',
  symbolSize: 4,
  lineStyle: {
    color: '#6271D2',
    width: 3
  },
  areaStyle: {
    color: getLinearGradient()
  },
  itemStyle: {
    color: '#6271D2',
    borderColor: '#fff',
    borderWidth: 3
  }
};

export const DEFAULT_TOOLTIP = {
  trigger: 'axis',
  padding: 0,
  backgroundColor: '#fff',
  formatter: params => {
    if (!params || !params.length) {
      return null;
    }

    return `
    <div style="width: auto; color: #595959;box-shadow: 0px 0px 10px #aeaeae;font-size: 12px; padding: 12px;border-radius: 3px;pointer-events: none;line-height: 12px;">
      <div style="height: 18px; margin-bottom: 6px;">${params[0].name}</div>
      ${params.map(
        param =>
          `<div style="display: flex; align-items: center;">${param.marker} <span>${
            param.seriesName
          }: ${param.value ?? ''}</span></div>`
      )}
    </div>
  `;
  }
};

export default {
  props: {
    loading: Boolean,
    className: String,
    renderer: String,
    animation: {
      type: Boolean,
      default: true
    },
    tooltip: {
      type: Object,
      default: () => DEFAULT_TOOLTIP
    },
    grid: {
      type: Object,
      default: () => DEFAULT_GRID
    },
    xAxis: Array,
    yAxis: Array,
    series: {
      type: Array,
      required: true
    }
  },
  components: {
    CChart
  },
  computed: {
    lineOption() {
      return {
        animation: this.animation,
        title: {
          show: false
        },
        legend: {
          show: false
        },
        tooltip: this.tooltip,
        grid: this.grid,
        xAxis: this.xAxis && this.xAxis.length ? this.xAxis : [DEFAULT_XAXIS],
        yAxis: this.yAxis && this.yAxis.length ? this.yAxis : [DEFAULT_YAXIS],
        series: this.series
      };
    }
  }
};
</script>
