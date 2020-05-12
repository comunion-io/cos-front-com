<template>
  <a-form-model
    ref="form"
    :labelCol="{ span: 24 }"
    :wrapperCol="{ span: 24 }"
    :model="form"
    :rules="rules"
    @submit.prevent="handleSubmit"
  >
    <a-form-model-item label="Governance" prop="governance">
      <a-select v-model="form.governance">
        <a-select-option value="FounderAssign">Founder Assign</a-select-option>
        <a-select-option value="pos">POS</a-select-option>
        <a-select-option value="all">ALL</a-select-option>
      </a-select>
    </a-form-model-item>
    <template v-if="form.governance === 'FounderAssign'">
      <a-form-model-item
        v-for="(address, index) in form.assignAddresses"
        :key="index"
        :label="index ? '' : 'Assign Address'"
        :prop="`assignAddresses.${index}`"
      >
        <!-- <a-input v-model="form.assignAddresses[index]" placeholder="Ethereum Address">
          <a-button type="primary"> <a-icon type="plus" />Add </a-button>
        </a-input> -->
        <a-input
          v-model="form.assignAddresses[index]"
          placeholder="Ethereum Address"
          style="width: 80%"
        />
        <a-button
          v-if="index === form.assignAddresses.length - 1"
          type="primary"
          class="ml-16"
          @click="addAddress"
          style="width:12%"
        >
          <a-icon type="plus" />Add
        </a-button>
        <a-button v-else class="ml-16" style="width:12%" @click="removeAddress(index)">
          <a-icon type="delete" />Remove
        </a-button>
      </a-form-model-item>
    </template>
    <a-form-model-item v-if="form.governance === 'pos'" label="TokenBalance" prop="tokenBalance">
      <a-input v-model="form.tokenBalance" placeholder="Token Balance" />
    </a-form-model-item>
    <a-form-model-item label="Vote Setting">
      <a-card>
        <a-form-model-item label="SUPPORT %">
          <a-slider v-model="form.supportPercent" class="slider-item" />
          <a-input-number v-model="form.supportPercent" style="width:12%" :min="0" :max="100" />
          <span class="ml-4">%</span>
        </a-form-model-item>
        <a-form-model-item label="MINIMUM APPROVAL %" class="mb-00">
          <a-slider v-model="form.minimumApproval" class="slider-item" />
          <a-input-number v-model="form.minimumApproval" style="width:12%" :min="0" :max="100" />
          <span class="ml-4">%</span>
        </a-form-model-item>
      </a-card>
      <a-card style="margin-top:24px">
        <a-form-model-item label="VOTE DURATION" class="mb-00">
          <a-row :gutter="24">
            <a-col :span="4">MinDuration</a-col>
            <a-col :span="6">
              <a-form-model-item prop="voteMinDuration.days">
                <a-input-number v-model="form.voteMinDuration.days" :min="0" :max="100" />
                <span class="ml-4">Days</span>
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item prop="voteMinDuration.hours">
                <a-input-number v-model="form.voteMinDuration.hours" :min="0" :max="100" />
                <span class="ml-4">Hours</span>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="4">MaxDuration</a-col>
            <a-col :span="6">
              <a-form-model-item prop="voteMaxDuration.days">
                <a-input-number v-model="form.voteMaxDuration.days" :min="0" :max="100" />
                <span class="ml-4">Days</span>
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item prop="voteMaxDuration.hours">
                <a-input-number v-model="form.voteMaxDuration.hours" :min="0" :max="100" />
                <span class="ml-4">Hours</span>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-card>
    </a-form-model-item>
    <div class="my-32">
      The support and minimum approval thresholds are strict requirements, such that votes will only
      pass if they achieve approval percentages greater than these thresholds.
    </div>
    <a-row :gutter="20">
      <a-col :span="6">
        <a-button block size="large" @click="cancel">Cancel</a-button>
      </a-col>
      <a-col :span="6">
        <a-button block size="large" @click="back">
          <a-icon type="arrow-left"></a-icon>
          Back
        </a-button>
      </a-col>
      <a-col :span="12">
        <a-button block size="large" type="primary" html-type="submit">
          Next：Review information
          <a-icon type="arrow-right"></a-icon>
        </a-button>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import { Slider } from 'ant-design-vue';
export default {
  components: {
    [Slider.name]: Slider
  },
  data: () => ({
    form: {
      governance: 'FounderAssign',
      assignAddresses: [''],
      tokenBalance: '',
      supportPercent: 100,
      minimumApproval: 100,
      voteMinDuration: {
        days: 0,
        hours: 0
      },
      voteMaxDuration: {
        days: 0,
        hours: 0
      }
    },
    rules: {
      assignAddresses: {
        type: 'array',
        validator: (rule, value, callback) => {
          callback();
        }
      },
      tokenBalance: {
        type: 'string',
        validator: (rule, value, callback) => {
          callback();
        }
      }
    }
  }),
  methods: {
    cancel() {},
    back() {
      this.$emit('back');
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('next', this.form);
        }
      });
    },
    // add assign address
    addAddress() {
      this.form.assignAddresses.push('');
    },
    removeAddress(index) {
      this.form.assignAddresses.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.slider-item {
  display: inline-block;
  margin-right: 16px;
  width: 72%;
  vertical-align: middle;
}
</style>
