// comunion wait setting 页面
<template>
  <div>
    <a-row v-if="!completed" :gutter="38">
      <a-col :span="7">
        <HelpCenter />
      </a-col>
      <a-col :span="17">
        <a-card>
          <a-steps :current="step" labelPlacement="vertical">
            <a-step title="Finance" />
            <a-step title="Governance" />
            <a-step title="Fundraise" />
          </a-steps>
        </a-card>
        <a-card style="margin-top:20px">
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
          <fundraise
            v-else-if="step === 2"
            ref="form_2"
            :default-data="form.fundraise"
            @cancel="onCancel"
            @ok="onOk"
          />
        </a-card>
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
import Finance from './steps/Finance';
import Governance from './steps/Governance';
import Fundraise from './steps/Fundraise';

const steps = ['finance', 'governance', 'fundraise'];

export default {
  data() {
    const stored = sessionStorage.getItem(STARTUP_SETTING_STORE_KEY);
    const form = {
      finance: {},
      governance: {},
      fundraise: {}
    };
    if (stored) {
      try {
        Object.assign(form, JSON.parse(stored));
      } catch (error) {}
    }
    return {
      step: 0,
      form: form,
      // 是否已完成
      completed: false
    };
  },
  components: {
    [Steps.name]: Steps,
    [Steps.Step.name]: Steps.Step,
    Finance,
    Governance,
    Fundraise
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
    onOk() {
      // save data
      sessionStorage.removeItem(STARTUP_SETTING_STORE_KEY);
      this.completed = true;
    },
    onUnload(e) {
      this.form[steps[this.step]] = this.$refs[`form_${this.step}`].form;
      this.saveData();
      const text = '确定要重新加载该网站么？系统可能不会保存您所做的修改。';
      if (e) e.returnValue = text;
      return text;
    },
    // 保存临时数据
    saveData() {
      sessionStorage.setItem(STARTUP_SETTING_STORE_KEY, JSON.stringify(this.form));
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

<style lang="less"></style>
