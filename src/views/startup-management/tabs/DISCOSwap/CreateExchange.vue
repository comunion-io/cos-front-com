<template>
  <div class="add-liquidity">
    <a-spin
      class="flex ai-center jc-center mt-24 w-100p loading-wrapper"
      size="large"
      :spinning="loading"
    >
      <p class="title">Add Liquidity</p>
      <div class="wrap">
        <div class="content">
          <div class="input-item">
            <div class="header">
              <span class="label">Input</span>
              <span class="balance">Balance {{ etherAmount }} ETH</span>
            </div>
            <div class="body">
              <div class="name">ETH</div>
              <div class="input-wrap">
                <a-input-number
                  :min="0"
                  :step="0.1"
                  v-model="tokenAamount"
                  class="token-input"
                  type="text"
                />
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
                <a-input-number
                  :min="0"
                  :step="0.1"
                  v-model="tokenBamount"
                  class="token-input"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <span style="font-weight: bold">Initial prices and pool share：</span>
          <span>1 ({{ tokenSymbol }} per ETH)</span>
          <span>1 (ETH per {{ tokenSymbol }})</span>
          <span>100% (Share of Pool)</span>
        </div>
      </div>
      <p class="tip">
        When you add liquidity,you are given pool tokens representing your position.These tokens
        automatically earn fees proportional to your share of the pool, and can be redeemed at any
        time
      </p>
      <a-button type="primary" :disabled="loading" class="btn" @click="addLiquidity">
        Add - Liquidity
      </a-button>
    </a-spin>
  </div>
</template>

<script>
import { SwapTranscation } from '@/utils/contract/swap';
// import services from '@/services';
import { mapGetters } from 'vuex';
import {
  COMUNION_VUE_APP_UNISWAPV2ROUTER01,
  COMUNION_VUE_APP_SWAPROUTER01_WETH
} from '@/configs/app';
import { web3 } from '@/libs/web3';
import {
  getEtherBalance,
  getTokenBalance,
  getTokenContract,
  unitTransfer,
  getGasPrice
} from '@/services/utils';

export default {
  data() {
    return {
      loading: false,
      tokenAamount: 0,
      tokenBamount: 0,
      myTokenAmount: 0,
      etherAmount: 0
    };
  },
  props: {
    startup: Object
  },
  computed: {
    ...mapGetters(['account']),
    tokenSymbol() {
      return this.startup?.settings?.tokenSymbol || '';
    }
  },
  async mounted() {
    this.swapInstance = SwapTranscation.getInstance();
    await this.getMyBalance();
  },
  methods: {
    /**
     * @description: get my balance of ether and token
     */
    async getMyBalance() {
      this.etherAmount = await getEtherBalance(this.account);
      this.myTokenAmount = await getTokenBalance(this.startup.settings.tokenAddr, this.account);
    },

    /**
     * @description: add liquuidity
     */
    async addLiquidity() {
      try {
        this.loading = true;
        await this.approval();
        const valueA = await unitTransfer(this.tokenAamount, 'ether');
        const valueB = await unitTransfer(this.tokenBamount, 'ether');
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
        this.$router.push({
          name: 'startupManagementDISCOSwap'
        });
      } catch (error) {
        console.error(error);
        // FIXME - 提示语需要产品确认
        this.$message.error('there is something wrong with network, please waiting...');
      } finally {
        this.loading = false;
      }
    },
    /**
     * @description: approval token for contract addrsss, and it will be transfer to liquuid pool
     */
    async approval() {
      await this.approvalEther();
      await this.approvalToken();
    },

    /**
     * @description: approval ether for router01 address
     */

    async approvalEther() {
      const tokenContract = await getTokenContract(COMUNION_VUE_APP_SWAPROUTER01_WETH);
      const value = await unitTransfer(this.tokenAamount, 'ether');
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
      const value = await unitTransfer(this.tokenBamount, 'ether');
      const gasPrice = await getGasPrice();
      await tokenContract.methods
        .approve(COMUNION_VUE_APP_UNISWAPV2ROUTER01, web3.utils.numberToHex(value))
        .send({
          from: this.account,
          gasPrice: gasPrice
        });
    }
  }
};
</script>

<style lang="less" scoped>
.add-liquidity {
  color: #000;
  .title {
    margin-bottom: 28px;
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
  }
  .wrap {
    padding: 30px;
    background-color: #f6f7fc;
    border-radius: 12px;
    .content {
      display: flex;
      .input-item {
        flex: 1;
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          .label {
            font-size: 16px;
            line-height: 20px;
          }
          .balance {
            color: #79828b;
            font-size: 12px;
          }
        }
        .body {
          background-color: #fff;
          display: flex;
          padding: 10px 12px;
          .name {
            font-size: 24px;
            font-weight: 500;
            line-height: 34px;
          }
          .input-wrap {
            flex: 1;
            .token-input {
              width: 100%;
              height: 100%;
              border: 0;
              outline: none;
              text-align: right;
              font-size: 24px;
              font-weight: 500;
              box-shadow: none;
              & /deep/ input {
                padding-right: 24px;
                text-align: right;
              }
            }
          }
        }
      }
      .symbol {
        flex: 0 0 80px;
        position: relative;
        &:before {
          content: '';
          display: block;
          width: 20px;
          height: 4px;
          border-radius: 2px;
          background-color: #000;
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
        }
        &:after {
          content: '';
          display: block;
          width: 4px;
          height: 20px;
          border-radius: 2px;
          background-color: #000;
          position: absolute;
          bottom: 17px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 16px;
      color: #666;
    }
  }
  .tip {
    color: #bfbfbf;
    font-size: 14px;
    margin: 22px 0 26px;
  }
  .btn {
    width: 100%;
    height: 54px;
    font-size: 18px;
  }
}
</style>
