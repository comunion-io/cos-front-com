<!--
 * @Author       : xiaodong
 * @Date         : 2020-12-20 21:29:09
 * @Descripttion : 创建 Disco 组件
 * @FilePath     : \cos-front-com\src\views\startup-management\tabs\DISCOSwap\CreateContract.vue
-->

<template>
  <!-- 创建 disco  -->
  <div class="create-contract">
    <div class="alert">
      <a-icon type="exclamation-circle" theme="filled" style="color: #faad14; margin-right: 12px" />
      <span>
        Before opening DISCO , you need to set the properties of the fund-raising contract
      </span>
    </div>
    <div class="content">
      <a-form layout="vertical" :form="form" hideRequiredMark @submit="createBtnOnClick">
        <!-- Fund-Raising Contract Address: 募资的地址 -->
        <!-- TODO zehui 上链接口调通以后， 这里需要注释 -->
        <a-form-item v-if="false">
          <template v-slot:label>
            <p class="label">Fund-Raising Contract Address</p>
          </template>
          <a-input
            class="input"
            placeholder="Please input receiving fund raising wallet address"
            autocomplete="off"
            :value="txid"
          />
        </a-form-item>
        <!-- start up 的钱包地址 -->
        <a-form-item>
          <template v-slot:label>
            <p class="label">Start-Up Wallet Address</p>
          </template>
          <a-input
            class="input"
            placeholder="Please input receiving fund raising wallet address"
            autocomplete="off"
            v-decorator="['walletAddr', walletAddrConfig]"
          />
        </a-form-item>
        <!-- start up token 的钱包地址 -->
        <a-form-item style="margin-bottom: 0;">
          <template v-slot:label>
            <p class="label">Token Contract</p>
          </template>
          <p class="text">{{ tokenAddr }}</p>
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Description</p>
          </template>
          <a-input
            class="input"
            placeholder="https://"
            style="height: 54px"
            autocomplete="off"
            v-decorator="['description', descriptionConfig]"
          />
          <div class="tip">
            No description,<a href="https://bbs.comunion.io/" target="_blank">Go to Post</a>
          </div>
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Fund-Raising Time</p>
          </template>
          <a-range-picker
            class="range-picker"
            :disabled-date="disabledDate"
            format="YYYY-MM-DD"
            v-decorator="['fundRaisingTime', rangeConfig]"
          />
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Investment Reward</p>
          </template>
          <a-input
            class="input number-input"
            placeholder=""
            autocomplete="off"
            addon-after="%"
            v-decorator="['investmentReward', investmentRewardConfig]"
            @change="updateTotalDepositToken"
          />
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Reward Decline Rate (Day)</p>
          </template>
          <a-input
            class="input number-input"
            placeholder=""
            autocomplete="off"
            addon-after="%"
            v-decorator="['rewardDeclineRate', number0to100Config]"
          />
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Share Token</p>
          </template>
          <a-input
            class="input number-input"
            placeholder=""
            autocomplete="off"
            addon-after="Token"
            v-decorator="['shareToken', positiveIntegerConfig]"
            @change="updateTotalDepositToken"
          />
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Fund-Raising ETH (min)</p>
          </template>
          <a-input
            class="input number-input"
            placeholder=""
            autocomplete="off"
            addon-after="ETH"
            v-decorator="['minFundRaising', positiveIntegerConfig]"
          />
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Add Liquidity Pool</p>
          </template>
          <a-input
            class="input number-input"
            placeholder=""
            autocomplete="off"
            addon-after="%"
            v-decorator="['addLiquidityPool', number0to100Config]"
            @change="updateTotalDepositToken"
          />
        </a-form-item>
        <a-form-item>
          <template v-slot:label>
            <p class="label">Total Deposit Token</p>
          </template>
          <a-input
            :value="totalDepositToken"
            class="input number-input"
            placeholder=""
            autocomplete="off"
            addon-after="Token"
            disabled
          />
        </a-form-item>
        <a-form-item>
          <a-button
            v-if="!fundraisingSuccess"
            type="primary"
            class="btn"
            html-type="submit"
            :loading="loading"
          >
            Create Fund-Faising Contract
          </a-button>
          <a-button
            v-if="fundraisingSuccess"
            @click.prevent="enablDisco()"
            type="primary"
            class="btn"
            html-type="submit"
            :loading="loading"
          >
            Enable DISCO
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import services from '@/services';
import { mapGetters } from 'vuex';
import { DiscoTranscation } from '@/utils/contract/disco';

export default {
  computed: {
    ...mapGetters(['categories', 'account', 'netWorkName']),
    tokenAddr() {
      return this.startup?.settings?.tokenAddr || '';
    }
  },
  data() {
    return {
      // TODO
      /** txid 上链后的合约地址 */
      txid: '',
      /** 募资成功的状态 */
      fundraisingSuccess: false,
      discoInstance: undefined,
      loading: false,
      totalDepositToken: '',
      walletAddrConfig: {
        trigger: 'blur',
        rules: [
          {
            required: true,
            pattern: /^0[xX]([a-z]|[A-Z]|[0-9]){40}$/,
            message:
              'Please input the correct address(40 chareacters starting with 0X including letters and numbers)'
          }
        ]
      },
      descriptionConfig: {
        trigger: 'blur',
        rules: [
          {
            required: true,
            pattern: /^(http|https):\/\//,
            message: 'Please input correct description url'
          }
        ]
      },
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }]
      },
      investmentRewardConfig: {
        trigger: 'change',
        rules: [
          {
            required: true,
            pattern: /^[1-9]\d*\.?\d*$|^0\.\d*$/,
            message: 'Please input the correct number'
          }
        ]
      },
      // 0 - 100的验证
      number0to100Config: {
        trigger: 'change',
        rules: [
          {
            required: true,
            pattern: /^[1-9]\d?\.\d*$|^[1-9]\d?$|^100$|^0$|^0\.\d*$/,
            message: 'Please enter a number not less than 0 and not more than 100'
          }
        ]
      },
      // 正整数验证
      positiveIntegerConfig: {
        trigger: 'change',
        rules: [
          {
            required: true,
            pattern: /^[1-9]\d*$/,
            message: 'Please enter a positive integer greater than 0'
          }
        ]
      }
    };
  },
  props: {
    startup: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {});
  },
  mounted() {
    this.discoInstance = DiscoTranscation.getInstance();
  },
  methods: {
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },

    /**
     * @name: Zehui
     * @Descripttion: 创建disco
     * @param {*} e
     * @return {*}
     */
    createBtnOnClick(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        values.investmentReward = +values.investmentReward;
        values.shareToken = +values.shareToken;
        values.rewardDeclineRate = +values.rewardDeclineRate;
        values.minFundRaising = +values.minFundRaising;
        values.addLiquidityPool = +values.addLiquidityPool;

        const params = {
          ...values,
          fundRaisingStartedAt: values.fundRaisingTime[0].utc().format(),
          fundRaisingEndedAt: values.fundRaisingTime[1].utc().format(),
          tokenAddr: this.tokenAddr,
          totalDepositToken: +this.totalDepositToken
        };
        this.$delete(params, 'fundRaisingTime');
        if (!err) {
          this.createDISCO(params);
        }
      });
    },
    async createDISCO(params) {
      this.loading = true;
      // 预先获取一个id
      const { error, data } = await services['cores@startup-获取prepareid']();
      if (!error) {
        const id = data.id;
        this.discoBlockCallBack('0x123456', id, params);
        // 发起上链
        // await this.discoInstance.sendDiscoTransaction(
        //   params,
        //   id,
        //   this.account,
        //   this.discoBlockCallBack
        // );
      }
    },

    /**
     * @description: 上链后的回调
     * @param {*} txid
     * @return {*}
     */
    async discoBlockCallBack(txid, id, params) {
      if (txid) {
        console.log(
          '%c 🍗 this.startup: ',
          'font-size:20px;background-color: #465975;color:#fff;',
          this.startup
        );
        let { error } = await services['cores@disco-startup-创建']({
          startupId: this.startup.id,
          id,
          ...params,
          txid
        });

        if (error) {
          console.error(error);
        }
      }
      this.loading = false;
    },

    updateTotalDepositToken() {
      this.$nextTick(() => {
        let values = this.form.getFieldsValue();
        let { shareToken, investmentReward, addLiquidityPool } = values;
        console.log(shareToken, investmentReward, addLiquidityPool);
        shareToken = Number(shareToken);
        investmentReward = Number(investmentReward);
        addLiquidityPool = Number(addLiquidityPool);
        if (!isNaN(shareToken) && !isNaN(investmentReward) && !isNaN(addLiquidityPool)) {
          this.totalDepositToken = (
            shareToken *
            (1 + investmentReward / 100 + addLiquidityPool / 100)
          ).toFixed(2);
        } else {
          this.totalDepositToken = '';
        }
      });
    },

    /**
     * @description: 启用disco
     * @param {*}
     * @return {*}
     */
    enablDisco() {
      this.discoInstance.enableDisco(this.id);
    }
  }
};
</script>

<style lang="less" scoped>
.create-contract {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 30px;
  background-color: #fff;
  .alert {
    width: 100%;
    background-color: #fef6e9;
    color: #999;
    line-height: 22px;
    padding: 16px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 16px;
  }
  .content {
    max-width: 590px;
    margin: auto;
    .label {
      line-height: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #000;
      margin-bottom: 8px;
      &::after {
        content: '*';
        position: relative;
        color: red;
        top: 2px;
        left: 4px;
      }
    }
    .input {
      height: 54px;
      font-size: 16px;
    }
    .number-input {
      max-width: 400px;
      & /deep/ .ant-input-group-addon {
        height: 54px;
        width: 152px;
      }
      & /deep/ .ant-input {
        height: 54px;
      }
    }
    .text {
      font-size: 16px;
    }
    .tip {
      position: absolute;
      right: 0;
      bottom: -40px;
    }
    .range-picker {
      width: 100%;
      height: 54px;
      max-width: 400px;
      & /deep/ .ant-input {
        line-height: 44px;
        height: 100%;
      }
    }

    .btn {
      height: 54px;
      width: 100%;
      font-size: 18px;
    }
  }
}
</style>
