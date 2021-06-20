<!--
 * @Author       : xiaodong
 * @Date         : 2020-12-20 21:29:11
 * @Descripttion : startup 创建 swap
 * @FilePath     : \cos-front-com\src\views\startup\details\Swap\Swap.vue
-->
<template>
  <div>
    <div class="wrap">
      <div class="input-item">
        <!-- you pay -->
        <div class="header">
          <span class="label">You Pay</span>
          <span class="balance">Balance {{ payTokenBalance }} {{ payTokenSymbol }}</span>
        </div>
        <div class="body">
          <div class="name">{{ payTokenSymbol }}</div>
          <div class="input-wrap">
            <input class="input" v-model="payToken" @input="changedPayToken()" type="text" />
          </div>
        </div>
      </div>
      <div class="symbol">
        <div @click="onReverse">
          <ExchangeSVG class="icon" />
        </div>
      </div>
      <div class="input-item input-item-disabled">
        <!-- you recrive -->
        <div class="header">
          <span class="label">You Receive</span>
          <span class="balance"
            >Price {{ exchangeRatio }} {{ receiveTokenSymbol }} per {{ payTokenSymbol }}</span
          >
        </div>
        <div class="body">
          <div class="name">{{ receiveTokenSymbol }}</div>
          <div class="input-wrap">
            <input class="input" disabled :value="receiveToken" type="text" />
          </div>
        </div>
      </div>

      <!-- Transaction Settings -->
      <TransactionSettings class="transaction-settings" />
    </div>
    <p class="text">Minimum received: 99.74 UVU</p>
    <p class="text">Price Impact：1.34%</p>
    <p class="text">Liquidity Provider Fee：0.003 ETH</p>
    <a-button class="btn" type="primary" @click="swap()">
      Swap
    </a-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SwapTranscation } from '@/utils/contract/swap';
// import services from '@/services';
import { getEtherBalance, getTokenBalance } from '@/services/utils';
import TransactionSettings from './TransactionSettings';
import ExchangeSVG from './exchange.svg';
import { COMUNION_VUE_APP_SWAPROUTER01_WETH } from '@/configs/app';

export default {
  data() {
    return {
      /** eth兑token是否反向 */
      reversed: false,
      /** 需要支付的货币数值 */
      payToken: 0,
      token: 0,
      /** token余额 */
      tokenBalance: undefined,
      ether: 0,
      /** eth余额 */
      etherBalance: undefined,
      /** token 的发布地址 */
      tokenAddr: ''
    };
  },
  props: {
    startup: {
      type: Object,
      default: () => {}
    },
    exchangeId: {
      type: String,
      default() {
        return '';
      }
    }
  },
  computed: {
    ...mapGetters(['account']),
    tokenSymbol() {
      return this.startup.settings.tokenSymbol;
    },
    /** 需要支付的货币的symbol */
    payTokenSymbol() {
      return this.reversed ? this.tokenSymbol : 'ETH';
    },
    /** 需要支付的货币的余额 */
    payTokenBalance() {
      return this.reversed ? this.tokenBalance : this.etherBalance;
    },
    /** 收到的货币的symbol */
    receiveTokenSymbol() {
      return this.reversed ? 'ETH' : this.tokenSymbol;
    },
    /** 收到的货币数值 */
    receiveToken() {
      return this.reversed ? this.ether : this.token;
    },
    /** 兑换比例 */
    exchangeRatio() {
      let ratio = this.reversed
        ? this.etherBalance / this.tokenBalance
        : this.tokenBalance / this.etherBalance;
      return isNaN(ratio) ? 0 : Math.floor(ratio * 1000) / 1000;
    }
  },
  components: {
    ExchangeSVG,
    TransactionSettings
  },
  async mounted() {
    this.tokenAddr = this.startup.settings.tokenAddr;
    this.swapInstance = SwapTranscation.getInstance();
    this.etherBalance = await getEtherBalance(this.account);
    this.tokenBalance = await getTokenBalance(this.tokenAddr, this.account);
  },
  methods: {
    onReverse() {
      this.reversed = !this.reversed;
      this.token = 0;
      this.ether = 0;
      this.payToken = 0;
    },
    /**
     * @description 需要支付的货币数值发生变化
     * @return {void}
     */
    changedPayToken() {
      if (this.payToken > 0) {
        this.reversed ? this.changedToken() : this.changedEther();
      }
    },
    /**
     * @name: Zehui
     * @description token 兑换 ether( 卖出token, 买入ether )
     * @param {*} value
     * @return {*}
     */
    async changedToken() {
      const params = {
        amount: this.payToken,
        reserveIn: 10,
        reserveOut: 100
      };
      this.ether = await this.swapInstance.getAmountOut(params);
    },

    /**
     * @name: Zehui
     * @description ether 兑换 tokens (卖出ether, 买入token)
     * @param {*} value
     * @return {*}
     */
    async changedEther() {
      const params = {
        amount: this.payToken,
        reserveIn: 10,
        reserveOut: 100
      };
      this.token = await this.swapInstance.getAmountIn(params);
    },

    /**
     * @name: Zehui
     * @description 创建swap交易
     * @param {*}
     * @return {*}
     */
    async swap() {
      const path = this.reversed
        ? [this.tokenAddr, COMUNION_VUE_APP_SWAPROUTER01_WETH]
        : [COMUNION_VUE_APP_SWAPROUTER01_WETH, this.tokenAddr];
      const params = {
        amount: this.payToken,
        path: path,
        to: this.account,
        deadline: Math.round(new Date().getTime() / 1000 + 20 * 60)
      };

      /* ----------------------------- 指定卖出ERC20代币数量，得到ETH， ----------------------------- */
      if (this.reversed) {
        this.swapInstance.swapExactTokensForETH(params, this.account);
      } else {
        /* ----------------------------- 指定卖出ETH数量，得到ERC20代币 ----------------------------- */
        this.swapInstance.swapExactETHForTokens(params, this.account);
      }

      // [this.token, this.ether] = res;
      // this.swapCallBack();
    }

    /**
     * @name: Zehui
     * @description 上链后的回调
     * @param {*} txid
     * @return {*}
     */
    /*   async swapCallBack() {
      if (this.exchangeId) {
        const params = {
          exchangeId: this.exchangeId,
          // txid,
          type: 3,
          account: this.account,
          tokenAmount1: this.token,
          tokenAmount2: this.ether
        };
        let { error } = await services['cores@exchange_transaction-创建'](params);

        if (error) {
          console.error(error);
        }
      }
    } */
  }
};
</script>

<style lang="less" scoped>
@import '~./common.less';
.wrap {
  position: relative;

  .symbol {
    &:before,
    &:after {
      display: none;
    }
    .icon {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%) rotate(90deg);
      cursor: pointer;
    }
  }

  .transaction-settings {
    position: absolute;
    top: 4px;
    right: 8px;
  }
}
</style>
