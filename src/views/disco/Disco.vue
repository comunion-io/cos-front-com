<template>
  <div class="container">
    <div class="card-container"></div>
    <div class="chart-container">
      <total-chart :chartData="chartData" />
    </div>
    <div class="tabs-container"></div>
  </div>
</template>

<script>
import TotalChart from './components/TotalChart.vue';

export default {
  components: {
    TotalChart
  },
  data() {
    return {
      chartData: {}
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}

.card-container {
  width: 100%;
  height: 110px;
  border: 1px solid yellow;
  background-color: #fff;
}

.chart-container {
  width: 100%;
  height: 332px;
  margin: 36px 0;
  background-color: #fff;
}

.tabs-container {
  width: 100%;
  height: 500px;
  border: 1px solid red;
  background-color: #fff;
}
</style>
