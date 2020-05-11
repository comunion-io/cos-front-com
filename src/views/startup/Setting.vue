<template>
  <a-row :gutter="38">
    <a-col :span="6">
      <HelpCenter />
    </a-col>
    <a-col :span="18">
      <a-card>
        <a-steps v-model="step">
          <a-step title="Finance"></a-step>
          <a-step title="Governance" />
          <a-step title="Fundraise" />
        </a-steps>
      </a-card>
      <a-card style="margin-top:20px">
        <finance v-if="step === 0" @cancel="onCancel" @next="onNext" />
        <governance v-else-if="step === 1" @cancel="onCancel" @back="onBack" @next="onNext" />
        <fundraise v-else-if="step === 2" @cancel="onCancel" @ok="onOk" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { Steps } from 'ant-design-vue';
import Finance from './steps/Finance';
import Governance from './steps/Governance';
import Fundraise from './steps/Fundraise';
export default {
  data() {
    return {
      step: 0
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
    onCancel() {
      // 临时存储数据
      this.$router.go(-1);
    },
    onNext() {
      this.step++;
    },
    onBack() {
      this.step--;
    },
    onOk() {
      //
    }
  }
};
</script>

<style lang="less"></style>
