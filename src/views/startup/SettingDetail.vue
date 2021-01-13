<template>
  <div class="p-startup-setting">
    <a-row v-if="!completed" :gutter="20">
      <a-col :span="step === 2 ? 0 : 8">
        <HelpCenter category="setting" />
      </a-col>
      <a-col :span="step === 2 ? 24 : 16">
        <a-card class="tab-card">
          <a-steps :current="step" labelPlacement="vertical">
            <a-step title="Finance" />
            <a-step title="Governance" />
            <a-step title="Launch" />
          </a-steps>
        </a-card>
        <a-spin
          class="flex ai-center jc-center mt-24 w-100p loading-wrapper"
          size="large"
          :spinning="!ready"
        >
          <template v-if="ready">
            <finance
              v-if="step === 0"
              :default-data="form.finance"
              ref="form_0"
              @cancel="onCancel"
              @next="onNext"
            />
            <governance
              v-else-if="step === 1"
              ref="form_1"
              :default-data="form.governance"
              @cancel="onCancel"
              @back="onBack"
              @next="onNext"
            />
            <launch
              v-else-if="step === 2"
              ref="launch"
              @cancel="onCancel"
              @back="onBack"
              @submit="onOk"
            />
          </template>
        </a-spin>
      </a-col>
    </a-row>
    <div v-else class="flex-column ai-center">
      <h1 style="margin-top:48px">Setting StartUp</h1>
      <img src="@/assets/images/success@2x.png" alt="" width="75" style="margin-top: 112px" />
      <p class="mt-32 t-grey">Completed</p>
      <router-link :to="{ name: 'square' }" style="margin-bottom:92px">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Steps } from 'ant-design-vue';
import { settingAbi } from '@/libs/abis/setting';
import { web3 } from '@/libs/web3';
import { COMMUNION_SETTING_RECEIVE_ACCOUNT } from '@/configs/app';
import { STARTUP_SETTING_STORE_KEY } from '@/configs/storage';
import services, { getMyStartupDetail } from '@/services';
import { merge } from '@/utils';
import Finance from './steps/Finance';
import Governance from './steps/Governance';
import Launch from './steps/Launch';

const steps = ['finance', 'governance'];

export default {
  data() {
    const storeKey = STARTUP_SETTING_STORE_KEY + this.$route.params.id;
    const stored = sessionStorage.getItem(storeKey);
    const form = {
      finance: {},
      governance: {}
      // fundraise: {}
    };
    if (stored) {
      try {
        Object.assign(form, JSON.parse(stored));
      } catch (error) {}
    }
    return {
      storeKey,
      step: 0,
      form,
      // 是否已完成
      completed: false,
      // 数据初始化是否完成
      ready: false
    };
  },
  components: {
    [Steps.name]: Steps,
    [Steps.Step.name]: Steps.Step,
    Finance,
    Governance,
    // Fundraise
    Launch
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    onCancel([name, form]) {
      this.$confirm({
        title: 'Confirm',
        content: h => (
          <div style="color:red;">The setting is not completed, do you really want to cancel?</div>
        ),
        onOk: () => {
          // 临时存储数据
          this.form[name] = form;
          this.saveData();
          this.$router.go(-1);
        }
      });
    },
    onNext([name, form]) {
      this.form[name] = form;
      this.step++;
    },
    onBack([name, form]) {
      this.form[name] = form;
      this.step--;
    },
    async onOk() {
      // save data
      const body = {
        ...this.form.finance,
        ...{ ...this.form.governance }
      };
      // 时间转小时
      body.voteMinDurationHours = body.minDuration.days * 24 + body.minDuration.hours;
      body.voteMaxDurationHours = body.maxDuration.days * 24 + body.maxDuration.hours;
      delete body.maxDuration;
      delete body.minDuration;

      body.voteTokenLimit = body.voteTokenLimit ? body.voteTokenLimit : -1;

      const id = this.$route.params.id;
      this.ethSendTransaction(body, id);
      // 关闭loading
      this.$refs.launch.loading = false;
    },

    /**
     * @description 发起交易
     * @param formData
     * @param id
     * @returns {Promise<void>}
     */
    async ethSendTransaction(formData, id) {
      const contractStatpUp = await this.getContractInstance(formData, id);
      const codeData = await contractStatpUp.encodeABI();
      const countAll = await web3.eth.getTransactionCount(this.account, 'pending');
      const chainId = await web3.eth.getChainId();

      const tx = {
        from: this.account,
        to: COMMUNION_SETTING_RECEIVE_ACCOUNT,
        data: codeData,
        value: 0,
        nonce: web3.utils.numberToHex(countAll),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: chainId
      };
      window.ethereum.sendAsync(
        {
          method: 'eth_sendTransaction',
          params: [tx],
          from: window.ethereum.selectedAddress
        },
        (err, result) => {
          if (err) {
            return console.error(err);
          }
          const txid = result.result;
          this.createSetting(formData, txid);
        }
      );
    },

    /**
     * @description 获取合约实例
     * @returns {Promise<*>}
     */
    async getContractInstance(formData, id) {
      const data = JSON.parse(JSON.stringify(formData));
      const contract = new web3.eth.Contract(settingAbi, COMMUNION_SETTING_RECEIVE_ACCOUNT);
      const walletAddrs = data.walletAddrs.map(item => item.addr);
      let voteAssignAddrs = [];
      data.voteAssignAddrs.forEach(item => {
        voteAssignAddrs.push(item || '0x0000000000000000000000000000000000000000');
      });
      /** 发起合约 */
      const contractSetting = await contract.methods.newSetting(
        id,
        data.tokenName,
        data.tokenSymbol,
        data.tokenAddr,
        walletAddrs,
        data.voteType,
        // POS
        data.voteTokenLimit.toString(),
        // Founder assign
        voteAssignAddrs,
        data.voteSupportPercent.toString(),
        data.voteMinApprovalPercent.toString(),
        data.voteMinDurationHours.toString(),
        data.voteMaxDurationHours.toString()
      );
      return contractSetting;
    },

    /**
     * @name: Zehui
     * @description: startup 的 setting 在上链成功后， 数据备份到后端
     * @param {*}
     * @return {*}
     */
    async createSetting(formData, txid) {
      const params = {
        id: this.$route.params.id,
        ...formData,
        txid
      };
      const { error } = await services['cores@startup-settings-更新'](params);
      if (!error) {
        sessionStorage.removeItem(this.storeKey);
        this.completed = true;
      }
    },

    /**
     * @description 刷新网页
     * @param e
     * @returns {string}
     */
    onUnload(e) {
      if (this.step < 2) {
        this.form[steps[this.step]] = this.$refs[`form_${this.step}`].form;
      }
      this.saveData();
      const text = '确定要重新加载该网站么？系统可能不会保存您所做的修改。';
      if (e) e.returnValue = text;
      return text;
    },
    // 保存临时数据
    saveData() {
      sessionStorage.setItem(this.storeKey, JSON.stringify(this.form));
    }
  },
  async mounted() {
    window.addEventListener('beforeunload', this.onUnload, false);
    // 如果是setting失败，则读取之前的setting设置，如果小于等于1，则认为是第一次设置
    const settingState = this.$route.query.state;
    if (settingState != null && settingState <= 1) {
      this.ready = true;
    } else {
      const { settings } = await getMyStartupDetail(this.$route.params.id);
      this.ready = true;
      if (settings) {
        // 后端返回数据转化为前端格式
        const voteMinDurationDays = Math.floor(settings.voteMinDurationHours / 24);
        const voteMaxDurationDays = Math.floor(settings.voteMaxDurationHours / 24);
        merge(this.form, {
          finance: {
            tokenName: settings.tokenName,
            tokenSymbol: settings.tokenSymbol,
            tokenAddr: settings.tokenAddr,
            walletAddrs: settings.walletAddrs
          },
          governance: {
            voteType: settings.type,
            voteAssignAddrs: settings.voteAssignAddrs,
            voteTokenLimit: settings.voteTokenLimit,
            voteSupportPercent: settings.voteSupportPercent,
            voteMinApprovalPercent: settings.voteMinApprovalPercent,
            minDuration: {
              hours: settings.voteMinDurationHours - voteMinDurationDays * 24,
              days: voteMinDurationDays
            },
            maxDuration: {
              hours: settings.voteMaxDurationHours - voteMaxDurationDays * 24,
              days: voteMaxDurationDays
            }
          }
        });
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.onUnload, false);
  }
};
</script>

<style lang="less">
@import '~@/assets/styles/variables.less';

.p-startup-setting {
  padding: 0 108px;

  .tab-card {
    margin-bottom: 20px;

    .ant-card-body {
      padding: 38px 38px 28px;
      height: 150px;
    }
  }

  // 步进条自定义
  .ant-steps-item:last-child {
    flex: 1;

    .ant-steps-item-tail {
      display: block;
    }
  }

  .ant-steps-item-container {
    height: 86px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ant-steps-item-tail {
    top: 20px;
    margin: 0;
    padding: 0;
    height: 5px;
    background: #eeeeee;

    &::after {
      height: 5px;
    }
  }

  .ant-steps-item-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 46px;
    height: 46px;
    border-width: 4px;
    border-color: #eee;
    z-index: 10;

    .ant-steps-icon {
      font-size: 24px;
      color: #999;
    }
  }

  .ant-steps-item-content {
    margin-top: auto;

    .ant-steps-item-title {
      line-height: 1;
      font-weight: bold;
    }
  }

  // 选中的tab
  .ant-steps-item-active {
    .ant-steps-item-icon {
      border: none;
      transform: scale(1.48);

      .ant-steps-icon {
        font-size: 18px;
        color: #fff;
      }
    }

    .ant-steps-item-content .ant-steps-item-title {
      margin-top: 16px;
      font-size: 15px;
      color: @primary-color;
    }
  }

  // 已完成步骤
  .ant-steps-item-finish {
    .ant-steps-item-icon {
      border-color: @primary-color;
    }

    .anticon-check {
      color: @primary-color;
    }
  }

  // 进行中
  .ant-steps-item-process {
    .ant-steps-item-tail {
      &:after {
        width: calc(50% - 34px);
        background-color: @primary-color;
      }
    }
  }

  .loading-wrapper {
    .ant-spin-container {
      width: 100%;
    }
  }
}
</style>
