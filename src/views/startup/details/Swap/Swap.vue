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
      discoInstance: undefined
    };
  },
  props: {
    exchangeId: {
      type: String,
      default() {
        return '12345687';
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
      console.log(this.token);
    },

    /**
     * @name: Zehui
     * @description ether 兑换 token
     * @param {*} value
     * @return {*}
     */
    changedEther(value) {
      console.log(this.ether);
    },

    /**
     * @name: Zehui
     * @description 创建swap交易
     * @param {*}
     * @return {*}
     */
    swap() {
      // TODO 上链后获取txid
      const txid = '0x123455';
      this.swapCallBack(txid);
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
