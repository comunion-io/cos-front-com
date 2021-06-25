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
          <div style="margin-bottom: 22px;">
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
                  <span class="balance">Balance 0.9486</span>
                </div>
              </div>
              <div style="flex: 0 0 30px;"></div>
              <div class="input-item input-item-disabled" style="flex: 2;">
                <div class="header">
                  <span class="label">Output</span>
                </div>
                <div style="display: flex;align-items: center;">
                  <div class="body">
                    <div class="name">'UVU'</div>
                    <div class="input-wrap">
                      <input class="input" v-model="deleteToken" type="text" disabled />
                    </div>
                  </div>
                  <div style="flex: 0 0 30px;text-align: center;">+</div>
                  <div class="body">
                    <div class="name">ETH</div>
                    <div class="input-wrap">
                      <input class="input" v-model="deleteToken" type="text" disabled />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Transaction Settings -->
              <TransactionSettings class="transaction-settings" />
            </div>
            <div class="uvu-eth">
              <span style="margin-right: 40px;">· 1 'UVU' = 0.1 ETH</span>
              <span>· 1 ETH = 10 'UVU'</span>
            </div>
          </div>

          <div class="your-position">
            <div class="title">Your position</div>
            <div class="row">
              <div class="label">'UVU'/ETH:</div>
              <div class="value">0.9486</div>
            </div>
            <div class="row">
              <div class="label">Your pool share:</div>
              <div class="value">100.000000%</div>
              <div class="label">'UVU':</div>
              <div class="value">2.999999</div>
              <div class="label">ETH:</div>
              <div class="value">0.299999</div>
            </div>
            <div class="tip">
              <span style="font-weight: bold;margin-right: 8px;">Tip:</span>
              <span
                >Delete pool tokens converts your position back into underlying tokens at the
                current rate, proportional to your share of the pool. Accrued fees are included in
                the amounts you receive.</span
              >
            </div>
          </div>

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

  .wrap {
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding-bottom: 8px;
  }

  .uvu-eth {
    border-radius: 12px;
    background-color: #f6f7fc;
    padding: 0 30px 30px 30px;
    font-weight: bold;
  }

  .your-position {
    background-color: #f6f7fc;
    border-radius: 12px;
    padding: 20px 30px;

    .title {
      border-left: 4px solid #6170ff;
      font-weight: bold;
      height: 16px;
      line-height: 16px;
      padding-left: 8px;
      margin-bottom: 16px;
    }

    .row {
      display: flex;
      .label {
        font-weight: bold;
        margin: 0 8px 8px 0;
      }
      .value {
        margin: 0 40px 8px 0;
      }
    }
  }
}
</style>
