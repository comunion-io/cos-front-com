<!--
 * @Author       : xiaodong
 * @Date         : 2020-12-20 21:29:11
 * @Descripttion : 增加删除交易流动性
 * @FilePath     : \cos-front-com\src\views\startup\details\Swap\FundsPool.vue
-->
<template>
  <div>
    <div class="funds-pool">
      <a-spin
        class="flex ai-center jc-center mt-24 w-100p loading-wrapper"
        size="large"
        :spinning="loading"
      >
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
        <!-- 增加流动性 -->
        <template v-if="activeTab === tabs[0]">
          <div class="wrap">
            <div class="input-item">
              <div class="header">
                <span class="label">Input</span>
                <span class="balance">Balance {{ etherAmount }} ETH</span>
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
                <span class="balance">Balance {{ myTokenAmount }} {{ tokenSymbol }}</span>
              </div>
              <div class="body">
                <div class="name">{{ tokenSymbol }}</div>
                <div class="input-wrap">
                  <input class="input" v-model="addedToken" type="text" />
                </div>
              </div>
            </div>

            <!-- Transaction Settings -->
            <TransactionSettings class="transaction-settings" />
          </div>
          <p class="text">exchange rate: 10 UVU per ETH</p>
          <p class="text">The current size of the pool of funds: 100ETH / 1000UVU</p>
          <p class="text">Your fund pool share(%): 1%</p>
          <a-button class="btn" @click="addLiquidity" type="primary">
            Add - Liquidity
          </a-button>
        </template>
        <!-- 删除流动性 -->
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

            <!-- Transaction Settings -->
            <TransactionSettings class="transaction-settings" />
          </div>
          <p class="text">exchange rate: --</p>
          <p class="text">The current size of the pool of funds: --</p>
          <p class="text">Your fund pool share(%): --</p>
          <a-button class="btn" @click="removeLiquidity" type="primary">
            Delete - Liquidity
          </a-button>
        </template>
      </a-spin>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import services from '@/services';
import { SwapTranscation } from '@/utils/contract/swap';
import TransactionSettings from './TransactionSettings';
import {
  getEtherBalance,
  getTokenBalance,
  getTokenContract,
  unitTransfer,
  getGasPrice
} from '@/services/utils';
import {
  COMUNION_VUE_APP_UNISWAPV2ROUTER01,
  COMUNION_VUE_APP_SWAPROUTER01_WETH
} from '@/configs/app';
import { web3 } from '@/libs/web3';

export default {
  computed: {
    ...mapGetters(['categories', 'account', 'netWorkName']),
    tokenSymbol() {
      return this.startup?.settings?.tokenSymbol || '';
    }
  },
  props: {
    exchangeId: {
      type: String,
      default() {
        return '';
      }
    },
    startup: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    TransactionSettings
  },
  async mounted() {
    this.swapInstance = SwapTranscation.getInstance();
    await this.getMyBalance();
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
      deleteToken: 0,
      /** token 的发布地址 */
      tokenAddr: '',
      /** 交易池募资地址 */
      fundRaisingContractAddr: '',
      /** balance of my token */
      myTokenAmount: 0,
      /** balance of my ether */
      etherAmount: 0,
      loading: false
    };
  },
  methods: {
    tabOnChange(tab) {
      this.activeTab = tab;
    },

    async getMyBalance() {
      this.etherAmount = await getEtherBalance(this.account);
      this.myTokenAmount = await getTokenBalance(this.startup.settings.tokenAddr, this.account);
    },

    /**
     * @name: Zehui
     * @description 增加流动性
     * @param {*}
     * @return {*}
     */
    async addLiquidity() {
      try {
        this.loading = true;
        await this.approval();
        const valueA = await unitTransfer(this.addedEther, 'ether');
        const valueB = await unitTransfer(this.addedToken, 'ether');
        const params = {
          tokenA: COMUNION_VUE_APP_SWAPROUTER01_WETH,
          tokenB: this.startup.settings.tokenAddr,
          amountADesired: web3.utils.numberToHex(valueA),
          amountBDesired: web3.utils.numberToHex(valueB),
          amountAMin: web3.utils.numberToHex(0),
          amountBMin: web3.utils.numberToHex(0),
          to: this.startup.settings.walletAddrs[0].addr,
          deadline: Math.round(new Date().getTime() / 1000) + 20 * 60
        };
        await this.swapInstance.addLiquidity(params, this.account);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }

      // this.addLiquidityCallBack();
    },

    async approval() {
      await this.approvalEther();
      await this.approvalToken();
    },

    async approvalEther() {
      const tokenContract = await getTokenContract(COMUNION_VUE_APP_SWAPROUTER01_WETH);
      const value = await unitTransfer(this.addedEther, 'ether');
      const gasPrice = await getGasPrice();
      await tokenContract.methods
        .approve(COMUNION_VUE_APP_UNISWAPV2ROUTER01, web3.utils.numberToHex(value))
        .send({
          from: this.account,
          gasPrice: gasPrice
        });
    },

    /**
     * @description: approval token for router01 address
     */
    async approvalToken() {
      // 募资提供的token
      const tokenContract = await getTokenContract(this.startup.settings.tokenAddr);
      const value = await unitTransfer(this.addedToken, 'ether');
      const gasPrice = await getGasPrice();
      await tokenContract.methods
        .approve(COMUNION_VUE_APP_UNISWAPV2ROUTER01, web3.utils.numberToHex(value))
        .send({
          from: this.account,
          gasPrice: gasPrice
        });
    },

    /**
     * @name: Zehui
     * @description 增加流动性上链后的回调
     * @param {txid} 上链后的交易hash
     * @return {*}
     */
    /*  async addLiquidityCallBack() {
      if (this.exchangeId) {
        const params = {
          // txid,
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
    }, */

    /**
     * @name: Zehui
     * @description 删除流动性
     * @param {*}
     * @return {*}
     */
    async removeLiquidity() {
      const params = {
        tokenA: this.fundRaisingContractAddr,
        tokenB: this.tokenAddr,
        amountADesired: this.deleteEther,
        amountBDesired: this.deleteToken,
        amountAMin: 0,
        amountBMin: 0,
        to: this.account,
        deadline: 20 * 60 * 60
      };
      this.swapInstance.removeLiquidity(params);
      this.removeLiquidityCallBack();
    }

    /**
     * @name: Zehui
     * @description 删除流动性上链后的回调
     * @param {txid} 上链后的交易hash
     * @return {*}
     */
    /*  async removeLiquidityCallBack() {
      const params = {
        // txid,
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
    } */
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
