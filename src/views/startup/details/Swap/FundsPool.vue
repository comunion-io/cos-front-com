<template>
  <div>
    <div class="funds-pool">
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
      <template v-if="activeTab === tabs[0]">
        <div class="wrap">
          <div class="input-item">
            <div class="header">
              <span class="label">Input</span>
              <span class="balance">Balance 1000ETH</span>
            </div>
            <div class="body">
              <div class="name">ETH</div>
              <div class="input-wrap">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="symbol"></div>
          <div class="input-item">
            <div class="header">
              <span class="label">Input</span>
              <span class="balance">Balance 1000ETH</span>
            </div>
            <div class="body">
              <div class="name">ETH</div>
              <div class="input-wrap">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
        </div>
        <p class="text">exchange rate: 10 UVU per ETH</p>
        <p class="text">The current size of the pool of funds: 100ETH / 1000UVU</p>
        <p class="text">Your fund pool share(%): 1%</p>
        <a-button class="btn" type="primary">
          Add - Liquidity
        </a-button>
      </template>
      <template v-else-if="activeTab === tabs[1]">
        <div class="wrap">
          <div class="input-item">
            <div class="header">
              <span class="label">Liquidity Pool</span>
            </div>
            <div class="body">
              <div class="name">ETH</div>
              <div class="input-wrap">
                <input class="input" type="text" />
              </div>
            </div>
            <div class="footer">
              <span class="balance">Balance 1000 ETH + 100000 UVU</span>
            </div>
          </div>
          <div style="flex: 0 0 80px;"></div>
          <div class="input-item">
            <div class="header">
              <span class="label">Input</span>
            </div>
            <div class="body">
              <div class="name">Total</div>
              <div class="input-wrap">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
        </div>
        <p class="text">exchange rate: --</p>
        <p class="text">The current size of the pool of funds: --</p>
        <p class="text">Your fund pool share(%): --</p>
        <a-button class="btn" type="primary">
          Delete - Liquidity
        </a-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['Add Liquidity', 'Delete Liquidity'],
      activeTab: 'Add Liquidity'
    };
  },
  methods: {
    tabOnChange(tab) {
      this.activeTab = tab;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~./common.less';
.funds-pool {
  .tabs {
    display: flex;
    margin-bottom: 12px;
    .tab {
      padding: 6px 12px;
      color: #999;
      font-size: 14px;
      margin-right: 18px;
      line-height: 18px;
      border-radius: 16px;
      cursor: pointer;
      &.active,
      &:hover {
        color: #6271d2;
        background-color: #f6f7fc;
      }
    }
  }
}
</style>
