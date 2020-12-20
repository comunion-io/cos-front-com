<template>
  <div>
    <!-- 未开启DISCO，或者失败了 -->
    <div class="not-open">
      <a-icon class="icon" type="exclamation-circle" theme="filled" />
      <span>Liquidity pool has not been opened yet.</span>
    </div>

    <!-- 已开启DISCO -->
    <div>
      <div class="blocks">
        <CountBlock title="ETH" :value="603.71" :growth="1.37" name="Exchange Volume(24h)" />
        <CountBlock title="ETH" :value="603.71" :growth="-1.37" name="Total Liquidity" />
        <CountBlock title="ETH" :value="603.71" :growth="1.37" name="Transactions(24h)" />
      </div>

      <!-- 图表 -->
      <Chart />

      <div>
        <div class="tabs">
          <div
            class="tab"
            :class="{ active: activeTab === tab }"
            v-for="tab in tabs"
            :key="tab"
            @click="tabOnChange(tab)"
          >
            {{ tab }}
          </div>
        </div>
        <Swap v-if="activeTab === 'Swap'" />
        <FundsPool v-else-if="activeTab === 'Funds Pool'" />
      </div>
    </div>
  </div>
</template>

<script>
import CountBlock from './CountBlock';
import Swap from './Swap';
import FundsPool from './FundsPool';
import Chart from './Chart';

export default {
  data() {
    return {
      activeTab: 'Swap',
      tabs: ['Swap', 'Funds Pool']
    };
  },
  components: {
    CountBlock,
    Swap,
    FundsPool,
    Chart
  },
  methods: {
    tabOnChange(tab) {
      this.activeTab = tab;
    }
  }
};
</script>

<style lang="less" scoped>
.not-open {
  background-color: #fef6e9;
  height: 162px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
  .icon {
    color: #faad14;
    font-size: 22px;
    margin-right: 12px;
  }
}

.blocks {
  display: flex;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  .tab {
    padding: 15px 12px;
    color: #000;
    line-height: 24px;
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 24px;
    &.active,
    &:hover {
      color: #6170ff;
      border-bottom: 2px solid #6170ff;
    }
  }
}
</style>
