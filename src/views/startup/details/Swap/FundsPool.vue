<!--
 * @Author       : xiaodong
 * @Date         : 2020-12-20 21:29:11
 * @Descripttion : 增加删除交易流动性
 * @FilePath     : \cos-front-com\src\views\startup\details\Swap\FundsPool.vue
-->
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
                <input class="input" v-model="addedEther" type="text" />
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
                <input class="input" v-model="addedToken" type="text" />
              </div>
            </div>
          </div>
        </div>
        <p class="text">exchange rate: 10 UVU per ETH</p>
        <p class="text">The current size of the pool of funds: 100ETH / 1000UVU</p>
        <p class="text">Your fund pool share(%): 1%</p>
        <a-button class="btn" @click="addLiquidity" type="primary">
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
                <input class="input" v-model="deleteEther" type="text" />
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
                <input class="input" v-model="deleteToken" type="text" />
              </div>
            </div>
          </div>
        </div>
        <p class="text">exchange rate: --</p>
        <p class="text">The current size of the pool of funds: --</p>
        <p class="text">Your fund pool share(%): --</p>
        <a-button class="btn" @click="deleteLiquidity" type="primary">
          Delete - Liquidity
        </a-button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import services from '@/services';

export default {
  computed: {
    ...mapGetters(['categories', 'account', 'netWorkName'])
  },
  props: {
    exchangeId: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data() {
    return {
      tabs: ['Add Liquidity', 'Delete Liquidity'],
      activeTab: 'Add Liquidity',
      /** 增加流动性的ether */
      addedEther: 0,
      /** 增加流动性的token */
      addedToken: 0,
      /** 删除流动性的ether */
      deleteEther: 0,
      /** 删除流动性的token */
      deleteToken: 0
    };
  },
  methods: {
    tabOnChange(tab) {
      this.activeTab = tab;
    },
    /**
     * @name: Zehui
     * @description 增加流动性
     * @param {*}
     * @return {*}
     */
    async addLiquidity() {
      // TODO 上链后，返回txid
      const txid = '0x123456987';
      await this.addLiquidityCallBack(txid);
    },

    /**
     * @name: Zehui
     * @description 增加流动性上链后的回调
     * @param {txid} 上链后的交易hash
     * @return {*}
     */
    async addLiquidityCallBack(txid) {
      if (this.exchangeId) {
        const params = {
          txid,
          exchangeId: this.exchangeId,
          account: this.account,
          type: 1,
          tokenAmount1: this.addedToken,
          tokenAmount2: this.addedEther
        };
        let { error } = await services['cores@exchange_transaction-创建'](params);
        if (error) {
          console.error(error);
        }
      }
    },

    /**
     * @name: Zehui
     * @description 删除流动性
     * @param {*}
     * @return {*}
     */
    async deleteLiquidity() {
      // TODO 上链后，返回txid
      const txid = '0x123456987';
      await this.deleteLiquidityCallBack(txid);
    },

    /**
     * @name: Zehui
     * @description 删除流动性上链后的回调
     * @param {txid} 上链后的交易hash
     * @return {*}
     */
    async deleteLiquidityCallBack(txid) {
      const params = {
        txid,
        account: this.account,
        type: 2,
        exchangeId: this.exchangeId,
        tokenAmount1: this.deleteToken,
        tokenAmount2: this.deleteEther
      };
      let { error } = await services['cores@exchange_transaction-创建'](params);
      if (!error) {
        console.error(error);
      }
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
