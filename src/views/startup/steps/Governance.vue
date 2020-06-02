<template>
  <a-card>
    <a-form-model
      class="vertical-form"
      ref="form"
      :labelCol="{ span: 24 }"
      :wrapperCol="{ span: 24 }"
      :model="form"
      :rules="rules"
      @submit.prevent="handleSubmit"
    >
      <a-form-model-item label="Governance" prop="governance">
        <a-select size="large" v-model="form.category_id">
          <a-select-option value="FounderAssign">Founder Assign</a-select-option>
          <a-select-option value="pos">POS</a-select-option>
          <a-select-option value="all">ALL</a-select-option>
        </a-select>
      </a-form-model-item>
      <template v-if="form.governance === 'FounderAssign'">
        <a-form-model-item
          v-for="(address, index) in form.assignAddrs"
          :key="index"
          :label="index ? '' : 'Assign Address'"
          :prop="`assignAddrs.${index}`"
        >
          <!-- <a-input v-model="form.assignAddrs[index]" placeholder="Ethereum Address">
          <a-button type="primary"> <a-icon type="plus" />Add </a-button>
        </a-input> -->
          <a-input
            size="large"
            v-model="form.assignAddrs[index]"
            placeholder="Ethereum Address"
            style="width: 80%"
          />
          <a-button
            v-if="index === form.assignAddrs.length - 1"
            size="large"
            type="primary"
            class="ml-16"
            @click="addAddress"
            style="width:16%"
          >
            <a-icon type="plus" />Add
          </a-button>
          <a-button
            v-else
            size="large"
            class="ml-16"
            style="width:16%"
            @click="removeAddress(index)"
          >
            <a-icon type="delete" />Remove
          </a-button>
        </a-form-model-item>
      </template>
      <a-form-model-item v-if="form.governance === 'pos'" label="TokenBalance" prop="tokenLimit">
        <a-input size="large" v-model="form.tokenLimit" placeholder="Token Balance" />
      </a-form-model-item>
      <a-form-model-item label="Vote Setting">
        <a-card>
          <a-form-model-item label="SUPPORT %">
            <a-slider v-model="form.supportPercent" class="slider-item" />
            <a-input-number
              size="large"
              v-model="form.supportPercent"
              style="width:12%"
              :min="0"
              :max="100"
            />
            <span class="ml-4">%</span>
          </a-form-model-item>
          <a-form-model-item label="MINIMUM APPROVAL %" class="mb-00">
            <a-slider v-model="form.minimumApprovalPercent" class="slider-item" />
            <a-input-number
              size="large"
              v-model="form.minimumApprovalPercent"
              style="width:12%"
              :min="0"
              :max="100"
            />
            <span class="ml-4">%</span>
          </a-form-model-item>
        </a-card>
        <a-card style="margin-top:24px">
          <a-form-model-item label="VOTE DURATION" class="mb-00">
            <a-row :gutter="24">
              <a-col :span="5">MinDuration</a-col>
              <a-col :span="8">
                <a-form-model-item prop="minDuration.days">
                  <a-input-number
                    size="large"
                    v-model="form.minDuration.days"
                    :min="0"
                    :max="100"
                  />
                  <span class="ml-4">Days</span>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item prop="minDuration.hours">
                  <a-input-number
                    size="large"
                    v-model="form.minDuration.hours"
                    :min="0"
                    :max="100"
                  />
                  <span class="ml-4">Hours</span>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="5">MaxDuration</a-col>
              <a-col :span="8">
                <a-form-model-item prop="maxDuration.days" class="mb-0">
                  <a-input-number
                    size="large"
                    v-model="form.maxDuration.days"
                    :min="0"
                    :max="100"
                  />
                  <span class="ml-4">Days</span>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item prop="maxDuration.hours" class="mb-0">
                  <a-input-number
                    size="large"
                    v-model="form.maxDuration.hours"
                    :min="0"
                    :max="100"
                  />
                  <span class="ml-4">Hours</span>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-card>
      </a-form-model-item>
      <div class="my-32">
        The support and minimum approval thresholds are strict requirements, such that votes will
        only pass if they achieve approval percentages greater than these thresholds.
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
  </a-card>
</template>

<script>
import { Slider } from 'ant-design-vue';
import mixins from './mixins';

export default {
  name: 'governance',
  mixins: [mixins],
  components: {
    [Slider.name]: Slider
  },
  data() {
    return {
      form: {
        ...{
          category_id: 'FounderAssign',
          assignAddrs: [''],
          tokenLimit: '',
          supportPercent: 100,
          minimumApprovalPercent: 100,
          minDuration: {
            days: 0,
            hours: 0
          },
          maxDuration: {
            days: 0,
            hours: 0
          }
        },
        ...this.defaultData
      },
      rules: {
        assignAddrs: {
          type: 'array',
          validator: (rule, value, callback) => {
            callback();
          }
        },
        tokenLimit: {
          type: 'string',
          validator: (rule, value, callback) => {
            callback();
          }
        }
      }
    };
  },
  methods: {
    // add assign address
    addAddress() {
      this.form.assignAddrs.push('');
    },
    removeAddress(index) {
      this.form.assignAddrs.splice(index, 1);
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
