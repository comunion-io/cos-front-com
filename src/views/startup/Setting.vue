<template>
  <div class="row">
    <div class="col-3">
      <help-center />
    </div>
    <div class="col-9">
      <v-stepper class="stepper" alt-labels v-model="step">
        <v-stepper-header class="bg-white">
          <v-stepper-step :complete="step > 1" step="1">Finance</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">Governance</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3">Fundraise</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items class="mt-4 bg-white">
          <v-stepper-content step="1">
            <finance @cancel="onCancel" @next="onNext" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <governance @cancel="onCancel" @back="onBack" @next="onNext" />
          </v-stepper-content>
          <v-stepper-content step="3">
            <fundraise @cancel="onCancel" @ok="onOk" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import Finance from './steps/Finance';
import Governance from './steps/Governance';
import Fundraise from './steps/Fundraise';
export default {
  data() {
    return {
      step: 1
    };
  },
  components: {
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

<style lang="less">
.stepper {
  background: none !important;
  box-shadow: none;
}
</style>
