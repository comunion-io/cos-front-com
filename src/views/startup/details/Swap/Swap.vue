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
import ExchangeSVG from './exchange.svg';
import { SwapTranscation } from '@/utils/contract/swap';
import services from '@/services';
import { mapGetters } from 'vuex';
import TransactionSettings from './TransactionSettings';

export default {
  data() {
    return {
      /** eth兑token是否反向 */
      reversed: false,
      /** 需要支付的货币数值 */
      payToken: 0,
      token: 0,
      /** token余额 */
      tokenBalance: 0,
      ether: 0,
      /** eth余额 */
      etherBalance: 0,
      /** token 的发布地址 */
      tokenAddr: '',
      /** 交易池募资地址 */
      fundRaisingContractAddr: ''
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
      let ratio = this.reversed ? this.ether / this.token : this.token / this.ether;
      return isNaN(ratio) ? 0 : Math.floor(ratio * 1000) / 1000;
    }
  },
  components: {
    ExchangeSVG,
    TransactionSettings
  },
  mounted() {
    this.swapInstance = SwapTranscation.getInstance();
  },
  methods: {
    onReverse() {
      this.reversed = !this.reversed;
    },
    /**
     * @description 需要支付的货币数值发生变化
     * @return {void}
     */
    changedPayToken() {
      this.reversed ? this.changedToken() : this.changedEther();
    },
    /**
     * @name: Zehui
     * @description token 兑换 ether
     * @param {*} value
     * @return {*}
     */
    async changedToken() {
      const params = this.getParams(true, true, this.payToken);
      const res = await this.swapInstance.swapExactTokensForETH(params);
      [this.token, this.ether] = res;
    },

    /**
     * @name: Zehui
     * @description 获取交易的参数
     * @param isTokenToEther 是否是 token 兑换ether
     * @param value 兑换的值
     * @param isMock 是否是真实交易
     * @return {*}
     */
    getParams(isTokenToEther, isMock, value) {
      const path = isTokenToEther
        ? [this.tokenAddr, this.fundRaisingContractAddr]
        : [this.fundRaisingContractAddr, this.tokenAddr];
      const params = {
        amount: value,
        amountOutMin: 0,
        path: path,
        to: this.account,
        // 只需要获取能兑换的ether, 不需要真是兑换， 交易时间为0， 让交易直接失败, 合约的时间最小但是为秒
        deadline: isMock ? 0 : 20 * 60
      };
      return params;
    },

    /**
     * @name: Zehui
     * @description ether 兑换 tokens
     * @param {*} value
     * @return {*}
     */
    async changedEther() {
      const params = this.getParams(false, true, this.payToken);
      const res = await this.swapInstance.swapExactETHForTokens(params);
      [this.ether, this.token] = res;
    },

    /**
     * @name: Zehui
     * @description 创建swap交易
     * @param {*}
     * @return {*}
     */
    async swap() {
      // TODO @xiaodong 当前前端界面支持 ether 兑换 token
      const params = this.getParams(false, false, this.ether);
      const res = await this.swapInstance.swapExactETHForTokens(params);
      [this.token, this.ether] = res;
      this.swapCallBack();
    },

    /**
     * @name: Zehui
     * @description 上链后的回调
     * @param {*} txid
     * @return {*}
     */
    async swapCallBack() {
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
    }
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
