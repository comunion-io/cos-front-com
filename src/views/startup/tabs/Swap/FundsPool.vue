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
          <div class="section">
            <div class="wrap">
              <div class="input-item">
                <div class="header">
                  <span class="label">Input</span>
                </div>
                <div class="body">
                  <div class="name">ETH</div>
                  <div class="input-wrap">
                    <input class="input" v-model="addedEther" type="text" />
                  </div>
                </div>
                <div class="footer">
                  <span class="balance">Balance {{ etherAmount }} ETH</span>
                </div>
              </div>
              <div class="symbol"></div>
              <div class="input-item">
                <div class="header">
                  <span class="label">Input</span>
                </div>
                <div class="body">
                  <div class="name">{{ tokenSymbol }}</div>
                  <div class="input-wrap">
                    <input class="input" v-model="addedToken" type="text" />
                  </div>
                </div>
                <div class="footer">
                  <span class="balance">Balance {{ myTokenAmount }} {{ tokenSymbol }}</span>
                </div>
              </div>
            </div>
            <div class="prices-pool">
              <span class="label">Prices and pool share：</span>
              <span class="value-item"
                >{{ Math.floor((tokenInFundPoolAmount / etherInFundPoolAmount) * 1000) / 1000 }} ({{
                  tokenSymbol
                }}
                per ETH）</span
              >
              <span class="value-item"
                >{{
                  Math.floor((etherInFundPoolAmount / tokenInFundPoolAmount) * 1000) / 1000
                }}
                （ETH per {{ tokenSymbol }}）</span
              >
              <span class="value-item">50% （Share of Pool）</span>
            </div>
          </div>

          <YourPosition :exchange="exchange" :startup="startup" type="add" />
          <a-button class="btn" @click="addLiquidity" type="primary"> Add - Liquidity </a-button>
        </template>
        <!-- 删除流动性 -->
        <template v-else-if="activeTab === tabs[1]">
          <div class="section">
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
              <div style="flex: 0 0 30px"></div>
              <div class="input-item input-item-disabled" style="flex: 2">
                <div class="header">
                  <span class="label">Output</span>
                </div>
                <div style="display: flex; align-items: center">
                  <div class="body">
                    <div class="name">'UVU'</div>
                    <div class="input-wrap">
                      <input class="input" v-model="deleteToken" type="text" disabled />
                    </div>
                  </div>
                  <div style="flex: 0 0 30px; text-align: center">+</div>
                  <div class="body">
                    <div class="name">ETH</div>
                    <div class="input-wrap">
                      <input class="input" v-model="deleteToken" type="text" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="uvu-eth">
              <span style="margin-right: 40px"
                >· 1 'UVU' =
                {{ Math.floor((etherInFundPoolAmount / tokenInFundPoolAmount) * 1000) / 1000 }}
                ETH</span
              >
              <span
                >· 1 ETH =
                {{ Math.floor((tokenInFundPoolAmount / etherInFundPoolAmount) * 1000) / 1000 }}
                'UVU'</span
              >
            </div>
          </div>

          <YourPosition :exchange="exchange" :startup="startup" type="delete" />

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
import YourPosition from './YourPosition';

export default {
  computed: {
    ...mapGetters(['categories', 'account', 'netWorkName']),
    tokenSymbol() {
      return this.startup?.settings?.tokenSymbol || '';
    }
  },
  props: {
    exchange: {
      type: Object,
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
    YourPosition
  },
  async mounted() {
    this.tokenAddr = this.startup.settings.tokenAddr;
    this.swapInstance = SwapTranscation.getInstance();
    this.etherInFundPoolAmount = await getTokenBalance(
      COMUNION_VUE_APP_SWAPROUTER01_WETH,
      this.exchange.pairAddress
    );
    this.tokenInFundPoolAmount = await getTokenBalance(this.tokenAddr, this.exchange.pairAddress);
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
      loading: false,
      /** 流动池中的token */
      tokenInFundPoolAmount: 0,
      /** 流动池中的ather */
      etherInFundPoolAmount: 0
    };
  },
  methods: {
    tabOnChange(tab) {
      this.activeTab = tab;
    },

    async getMyBalance() {
      this.etherAmount = await getEtherBalance(this.account);
      this.myTokenAmount = await getTokenBalance(this.tokenAddr, this.account);
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
          tokenB: this.tokenAddr,
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
      const tokenContract = await getTokenContract(this.tokenAddr);
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

  .section {
    margin-bottom: 22px;
    border-radius: 12px;
    background-color: #f6f7fc;

    .prices-pool {
      padding: 0 30px 30px;
      .label {
        font-weight: bold;
      }
      .value-item {
        margin: 0 8px;
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
    padding: 0 30px 30px 30px;
    font-weight: bold;
  }
}
</style>
