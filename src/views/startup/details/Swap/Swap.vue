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
          <span class="balance">Balance 1000ETH</span>
        </div>
        <div class="body">
          <div class="name">ETH</div>
          <div class="input-wrap">
            <input class="input" v-model="token" @change="changedToken($event)" type="text" />
          </div>
        </div>
      </div>
      <div class="symbol">
        <ExchangeSVG class="icon" />
      </div>
      <div class="input-item">
        <div class="header">
          <span class="label">You Receive</span>
          <span class="balance">Price 10 UVU per ETH</span>
        </div>
        <div class="body">
          <div class="name">UVU</div>
          <div class="input-wrap">
            <input class="input" v-model="ether" @change="changedEther($event)" type="text" />
          </div>
        </div>
      </div>
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

export default {
  data() {
    return {
      token: 0,
      ether: 0,
      /** token 的发布地址 */
      tokenAddr: '',
      /** 交易池募资地址 */
      fundRaisingContractAddr: ''
    };
  },
  props: {
    exchangeId: {
      type: String,
      default() {
        return '';
      }
    }
  },
  computed: {
    ...mapGetters(['account'])
  },
  components: {
    ExchangeSVG
  },
  mounted() {
    this.swapInstance = SwapTranscation.getInstance();
  },
  methods: {
    /**
     * @name: Zehui
     * @description token 兑换ether
     * @param {*} value
     * @return {*}
     */
    changedToken(value) {
      const params = this.getParams(0, true, true, this.token);
      this.swapInstance.swapExactTokensForETH(params, this.swapExactTokensForETHCallback);
    },

    /**
     * @name: Zehui
     * @description 获取交易的参数
     * @param deadline 过期时间
     * @param isTokenToEther 是否是token兑换ether
     * @param isMock 是否是真实交易
     * @return {*}
     */
    getParams(deadline, isTokenToEther, isMock, value) {
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
     * @description token 兑换ether后的回调
     * @param {*} ether
     * @return {*}
     */
    swapExactTokensForETHCallback(ether) {
      this.ether = ether;
    },

    /**
     * @name: Zehui
     * @description ether 兑换 token后的回调
     * @param {*} ether
     * @return {*}
     */
    swapExactEthForTokensCallback(token) {
      this.token = token;
    },

    /**
     * @name: Zehui
     * @description ether 兑换 tokens
     * @param {*} value
     * @return {*}
     */
    changedEther(value) {
      const params = this.getParams(0, false, true, this.ether);
      this.swapInstance.swapExactETHForTokens(params, this.swapExactEthForTokensCallback);
    },

    /**
     * @name: Zehui
     * @description 创建swap交易
     * @param {*}
     * @return {*}
     */
    swap() {
      const params = this.getParams(0, false, false, this.ether);
      this.swapInstance.swapExactETHForTokens(params, this.swapCallBack);
    },

    /**
     * @name: Zehui
     * @description 上链后的回调
     * @param {*} txid
     * @return {*}
     */
    async swapCallBack(txid) {
      if (this.exchangeId) {
        const params = {
          exchangeId: this.exchangeId,
          txid,
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
}
</style>
