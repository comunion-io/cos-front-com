<!--
 * @Author       : xiaodong
 * @Date         : 2020-12-20 21:29:09
 * @Descripttion : 创建 DISCO 组件
 * @FilePath     : \cos-front-com\src\views\startup-management\tabs\DISCOSwap\CreateContract.vue
-->
<template>
  <!-- 创建 disco  -->
  <div class="create-contract">
    <DISCOSteps :step="createFundFaisingContractSucceed ? 2 : 1" />
    <div v-if="ready" class="content">
      <a-form-model
        layout="vertical"
        ref="form"
        :model="disco"
        :rules="rules"
        @submit.prevent="createBtnOnClick"
      >
        <!-- Fund-Raising Contract Address: 募资的地址 -->
        <a-form-model-item
          v-if="createFundFaisingContractSucceed"
          label="Fund-Raising Contract Address"
          prop="txid"
        >
          <a-input
            class="input"
            placeholder="Please input receiving fund raising wallet address"
            autocomplete="off"
            v-model="disco.fundRaisingAddr"
            :disabled="createFundFaisingContractSucceed"
          />
        </a-form-model-item>
        <!-- start up 的钱包地址 -->
        <a-form-model-item label="Start-Up Wallet Address" prop="walletAddr">
          <a-input
            class="input"
            placeholder="Please input receiving fund raising wallet address"
            autocomplete="off"
            v-model="disco.walletAddr"
            :disabled="createFundFaisingContractSucceed"
          />
        </a-form-model-item>
        <!-- start up token 的合约地址 -->
        <a-form-model-item label="Token Contract" style="margin-bottom: 0;">
          <p class="text">{{ tokenAddr }}</p>
        </a-form-model-item>
        <bbs-input
          prop="description"
          v-model="disco.description"
          :disabled="createFundFaisingContractSucceed"
        />
        <a-form-model-item label="Fund-Raising Time" prop="fundRaisingTime">
          <a-range-picker
            class="range-picker"
            :disabled-date="disabledDate"
            format="YYYY-MM-DD"
            v-model="disco.fundRaisingTime"
            :disabled="createFundFaisingContractSucceed"
          />
        </a-form-model-item>
        <a-form-model-item label="Investment Reward" prop="investmentReward">
          <a-input-number
            class="input number-input"
            placeholder=""
            autocomplete="off"
            :min="0"
            :max="100"
            v-model="disco.investmentReward"
            @change="updateTotalDepositToken"
            :disabled="createFundFaisingContractSucceed"
          />
          <span class="input-after">%</span>
        </a-form-model-item>
        <a-form-model-item label="Reward Decline Rate (Day)" prop="rewardDeclineRate">
          <a-input-number
            class="input number-input"
            placeholder=""
            autocomplete="off"
            :min="0"
            :max="100"
            v-model="disco.rewardDeclineRate"
            :disabled="createFundFaisingContractSucceed"
          />
          <span class="input-after">%</span>
        </a-form-model-item>
        <a-form-model-item label="Share Token" prop="shareToken">
          <a-input-number
            class="input number-input"
            placeholder=""
            autocomplete="off"
            :min="0"
            v-model="disco.shareToken"
            @change="updateTotalDepositToken"
            :disabled="createFundFaisingContractSucceed"
          />
          <span class="input-after">{{ tokenSymbol }}</span>
        </a-form-model-item>
        <a-form-model-item label="Fund-Raising ETH (min)" prop="minFundRaising">
          <a-input-number
            class="input number-input"
            placeholder=""
            autocomplete="off"
            :min="0"
            v-model="disco.minFundRaising"
            :disabled="createFundFaisingContractSucceed"
          />
          <span class="input-after">ETH</span>
        </a-form-model-item>
        <a-form-model-item label="Add Liquidity Pool" prop="addLiquidityPool">
          <a-input-number
            class="input number-input"
            placeholder=""
            autocomplete="off"
            :min="0"
            :max="100"
            v-model="disco.addLiquidityPool"
            @change="updateTotalDepositToken"
            :disabled="createFundFaisingContractSucceed"
          />
          <span class="input-after">%</span>
        </a-form-model-item>
        <a-form-model-item label="Total Deposit Token" prop="totalDepositToken">
          <a-input-number
            :value="totalDepositToken"
            class="input number-input"
            placeholder=""
            autocomplete="off"
            disabled
          />
          <span class="input-after">{{ tokenSymbol }}</span>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            v-if="!createFundFaisingContractSucceed"
            type="primary"
            class="btn"
            html-type="submit"
            :loading="loading"
          >
            Create Fund-Faising Contract
          </a-button>
          <a-button
            v-if="createFundFaisingContractSucceed"
            @click.prevent="enablDisco()"
            type="primary"
            class="btn"
            html-type="submit"
            :loading="loading"
          >
            Enable DISCO
          </a-button>
          <div class="footer" v-if="createFundFaisingContractSucceed">
            <div class="balance">
              <span style="font-weight:bold;">Balance: </span>
              <span>{{ balance.eth }}ETH + {{ balance.token }} {{ tokenSymbol }}</span>
            </div>
            <a-button type="link" class="recreate-btn" html-type="submit"
              >Recreate contract</a-button
            >
          </div>
        </a-form-model-item>
      </a-form-model>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import services from '@/services';
import { DiscoTranscation } from '@/utils/contract/disco';
import BbsInput from '@/components/form/BbsInput';
import { merge } from '@/utils/utils';
import { validateAddress, urlValidator } from '@/utils/validators';
import { getEtherBalance, getTokenBalance } from '@/services/utils';
import DISCOSteps from './DISCOSteps';

export default {
  components: {
    BbsInput,
    DISCOSteps
  },
  props: {
    startup: Object
  },
  data() {
    return {
      disco: {
        txid: '',
        walletAddr: '',
        description: '',
        fundRaisingTime: [null, null],
        investmentReward: '',
        rewardDeclineRate: '',
        shareToken: '',
        minFundRaising: '',
        addLiquidityPool: '',
        fundRaisingAddr: '',
        tokenAddr: '',
        id: '',
        totalDepositToken: ''
      },
      // 是否是重建合约
      isRecreate: false,
      discoId: '',
      /** txid 上链后的合约hash */
      txid: '',
      /** 募资成功的状态 */
      fundraisingSuccess: false,
      loading: false,
      totalDepositToken: null,
      rules: {
        walletAddr: [{ required: true, validator: validateAddress }],
        description: [{ required: true, validator: urlValidator }],
        fundRaisingTime: [{ type: 'array', required: true, message: 'Please select time!' }],
        investmentReward: [{ required: true }],
        rewardDeclineRate: [{ required: true }],
        shareToken: [{ required: true }],
        minFundRaising: [{ required: true }],
        addLiquidityPool: [{ required: true }]
      },
      // 余额
      balance: {
        eth: undefined,
        token: undefined
      },
      // 是否完成数据加载
      ready: false
    };
  },
  computed: {
    ...mapGetters(['account']),
    tokenSymbol() {
      return this.startup?.settings?.tokenSymbol || '';
    },
    tokenAddr() {
      return this.startup?.settings?.tokenAddr || '';
    },
    // 创建募资合约成功
    createFundFaisingContractSucceed() {
      return this.$route.params.status === '2' && !this.isRecreate;
    }
  },
  async mounted() {
    this.discoInstance = DiscoTranscation.getInstance();
    // 获取disco
    if (this.$route.query.mode !== 'create') {
      await this.getDisco();
      this.ready = true;
    } else {
      this.ready = true;
    }
    this.balance.eth = await getEtherBalance(this.account);
    this.balance.token = await getTokenBalance(this.tokenAddr, this.account);
  },
  methods: {
    // 获取disco信息
    async getDisco() {
      let { error, data } = await services['cores@disco-startup-获取']({
        startupId: this.startup.id
      });
      if (!error) {
        this.totalDepositToken = data.totalDepositToken;
        this.discoId = data.id;
        merge(this.disco, {
          walletAddr: data.walletAddr,
          description: data.description,
          fundRaisingTime: [moment(data.fundRaisingStartedAt), moment(data.fundRaisingEndedAt)],
          investmentReward: data.investmentReward,
          rewardDeclineRate: data.rewardDeclineRate,
          shareToken: data.shareToken,
          minFundRaising: data.minFundRaising,
          addLiquidityPool: data.addLiquidityPool,
          fundRaisingAddr: data.fundRaisingAddr,
          tokenAddr: data.tokenAddr,
          id: data.id,
          totalDepositToken: data.totalDepositToken
        });
      }
    },
    disabledDate(current) {
      // Can not select days before today
      let beforeDay = moment().startOf('day');
      return current && current < beforeDay;
    },

    /**
     * @name: Zehui
     * @Descripttion: 创建disco
     * @param {*} e
     * @return {*}
     */
    createBtnOnClick(e) {
      this.$refs.form.validate(valid => {
        if (valid) {
          // values.investmentReward = +values.investmentReward;
          // values.shareToken = +values.shareToken;
          // values.rewardDeclineRate = +values.rewardDeclineRate;
          // values.minFundRaising = +values.minFundRaising;
          // values.addLiquidityPool = +values.addLiquidityPool;
          const params = {
            ...this.disco,
            fundRaisingStartedAt: this.disco.fundRaisingTime[0].utc().format(),
            fundRaisingEndedAt: this.disco.fundRaisingTime[1].utc().format(),
            tokenAddr: this.tokenAddr,
            totalDepositToken: this.totalDepositToken
          };
          delete params.fundRaisingTime;
          this.createDISCO(params);
        }
      });
    },
    async createDISCO(params) {
      this.loading = true;
      // 预先获取一个id
      const { error, data } = await services['cores@startup-获取prepareid']();
      if (!error) {
        params.id = data.id;
        // 发起上链
        try {
          await this.discoInstance.sendDiscoTransaction(
            params,
            this.account,
            this.discoBlockCallBack.bind(this)
          );
        } catch (error) {
          console.error(error);
          this.$message.error(error.message || 'Error');
          this.loading = false;
        }
      }
    },

    /**
     * @description 上链后的回调
     * @param {*} txid
     * @return {*}
     */
    async discoBlockCallBack(txid, params) {
      if (txid) {
        let { error } = await services['cores@disco-startup-创建']({
          startupId: this.startup.id,
          ...params,
          txid
        });

        if (!error) {
          // 返回DISCO & Swap页面
          this.$router.push({
            name: 'startupManagementDISCOSwap'
          });
        } else {
          console.error(error);
        }
      }
      this.loading = false;
    },

    updateTotalDepositToken() {
      this.$nextTick(() => {
        let { shareToken, investmentReward, addLiquidityPool } = this.disco;
        console.log(shareToken, investmentReward, addLiquidityPool);
        // shareToken = Number(shareToken);
        // investmentReward = Number(investmentReward);
        // addLiquidityPool = Number(addLiquidityPool);
        if (!isNaN(shareToken) && !isNaN(investmentReward) && !isNaN(addLiquidityPool)) {
          this.totalDepositToken =
            Math.round(shareToken * (1 + investmentReward / 100 + addLiquidityPool / 100) * 100) /
            100;
        } else {
          this.totalDepositToken = null;
        }
      });
    },

    /**
     * @description 启用disco
     * @param {*}
     * @return {*}
     */
    async enablDisco() {
      this.loading = true;
      await this.discoInstance.approval(this.disco, this.account);
      this.loading = false;
      // this.$message.success('Enabling, please waiting.');
      // 返回DISCO & Swap页面
      // this.$router.push({ name: 'startupManagementDISCOSwap' });
    },

    // 重新创建合约按钮被点击
    recreateBtnOnClick() {
      this.isRecreate = true;
      this.$refs.form.resetFields();
      this.totalDepositToken = null;
    }
  }
};
</script>

<style lang="less" scoped>
.create-contract {
  background-color: #fff;
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
      width: 400px;
      /deep/ .ant-input-number-input {
        height: 54px;
        padding-right: 164px;
      }
      /deep/ .ant-input-number-handler-wrap {
        right: 152px;
      }
    }
    .input-after {
      position: relative;
      display: inline-block;
      width: 152px;
      height: 54px;
      line-height: 54px;
      margin-left: -152px;
      text-align: center;
      border-left: 1px solid #d9d9d9;
      z-index: 10;
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

  .footer {
    display: flex;
    justify-content: space-between;
    color: #bfbfbf;
    margin-top: 8px;
  }
}
</style>
