<template>
  <div class="p-startup-setting">
    <a-row v-if="!completed" :gutter="20">
      <a-col :span="step === 2 ? 0 : 8">
        <HelpCenter />
      </a-col>
      <a-col :span="step === 2 ? 24 : 16">
        <a-card class="tab-card">
          <a-steps :current="step" labelPlacement="vertical">
            <a-step title="Finance" />
            <a-step title="Governance" />
            <a-step title="Fundraise" />
          </a-steps>
        </a-card>
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
import { Steps } from 'ant-design-vue';
import { STARTUP_SETTING_STORE_KEY } from '@/configs/storage';
import { createStartupSetting } from '@/services';
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
      completed: false
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
      if (await createStartupSetting(this.$route.params.id, body)) {
        sessionStorage.removeItem(this.storeKey);
        this.completed = true;
      }
      // 关闭loading
      this.$refs.launch.loading = false;
    },
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
  mounted() {
    window.addEventListener('beforeunload', this.onUnload, false);
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
}
</style>
