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
      <a-form-model-item label="Governance Proposer" prop="governanceProposer">
        <a-select size="large" v-model="form.governanceProposer">
          <a-select-option
            v-for="(value, name) in governanceTypesMap"
            :key="name"
            :value="Number(name)"
          >
            {{ value }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <template v-if="form.governanceProposer === 1">
        <a-form-model-item
          v-for="(address, index) in form.proposerAssignAddrs"
          :key="'proposer.' + index"
          :label="index ? '' : 'Assign Address'"
          :prop="`proposerAssignAddrs.${index}`"
          :rules="{ required: true, validator: validateEthAddress }"
        >
          <a-input
            size="large"
            v-model="form.proposerAssignAddrs[index]"
            placeholder="Please enter ethereum address"
            style="width: 60%"
            :max-length="42"
          />
          <a-button
            v-if="form.proposerAssignAddrs.length !== 1"
            size="large"
            class="ml-16"
            style="width:10%"
            @click="removeAddress(index, 'proposer')"
          >
            <a-icon type="delete" />
          </a-button>
          <a-button
            v-if="index === form.proposerAssignAddrs.length - 1"
            size="large"
            type="primary"
            class="ml-16"
            @click="addAddress('proposer')"
            style="width:20%"
          >
            <a-icon type="plus" />Add
          </a-button>
        </a-form-model-item>
      </template>
      <a-form-model-item v-if="form.governanceProposer === 2" prop="proposerTokenLimit">
        <label slot="label">Token Balance</label>
        <a-input-number
          class="w-100p"
          size="large"
          v-model="form.proposerTokenLimit"
          placeholder="Please set minimum token balance"
          :min="0"
        />
      </a-form-model-item>

      <a-form-model-item label="Governance Voter" prop="governance">
        <a-select size="large" v-model="form.voteType">
          <a-select-option
            v-for="(value, name) in governanceTypesMap"
            :key="name"
            :value="Number(name)"
          >
            {{ value }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <template v-if="form.voteType === 1">
        <a-form-model-item
          v-for="(address, index) in form.voteAssignAddrs"
          :key="index"
          :label="index ? '' : 'Assign Address'"
          :prop="`voteAssignAddrs.${index}`"
          :rules="{ required: true, validator: validateEthAddress }"
        >
          <!-- <a-input v-model="form.voteAssignAddrs[index]" placeholder="Ethereum Address">
          <a-button type="primary"> <a-icon type="plus" />Add </a-button>
        </a-input> -->
          <a-input
            size="large"
            v-model="form.voteAssignAddrs[index]"
            placeholder="Please enter ethereum address"
            style="width: 60%"
            :max-length="42"
          />
          <a-button
            v-if="form.voteAssignAddrs.length !== 1"
            size="large"
            class="ml-16"
            style="width:10%"
            @click="removeAddress(index)"
          >
            <a-icon type="delete" />
          </a-button>
          <a-button
            v-if="index === form.voteAssignAddrs.length - 1"
            size="large"
            type="primary"
            class="ml-16"
            @click="addAddress"
            style="width:20%"
          >
            <a-icon type="plus" />Add
          </a-button>
        </a-form-model-item>
      </template>
      <a-form-model-item v-if="form.voteType === 2" prop="voteTokenLimit">
        <label slot="label"
          >Token Balance
          <!-- <span class="ml-16 t-grey">设置最小持币量，满足的地址可以参与投票</span> -->
        </label>
        <a-input-number
          class="w-100p"
          size="large"
          v-model="form.voteTokenLimit"
          placeholder="Please set minimum token balance"
          :min="0"
        />
      </a-form-model-item>
      <a-form-model-item label="Vote Setting">
        <a-card style="background:rgba(247,248,255,1); border:1px dashed rgba(191,191,191,1);">
          <a-form-model-item label="SUPPORT %">
            <a-slider v-model="form.voteSupportPercent" class="slider-item" />
            <a-input-number
              size="large"
              v-model="form.voteSupportPercent"
              style="width:12%"
              :min="0"
              :max="100"
            />
            <span class="ml-4">%</span>
          </a-form-model-item>
          <a-form-model-item label="MINIMUM APPROVAL %" class="mb-00">
            <a-slider v-model="form.voteMinApprovalPercent" class="slider-item" />
            <a-input-number
              size="large"
              v-model="form.voteMinApprovalPercent"
              style="width:12%"
              :min="0"
              :max="100"
            />
            <span class="ml-4">%</span>
          </a-form-model-item>
        </a-card>
        <a-card
          style="margin-top:24px; background:rgba(247,248,255,1); border:1px dashed rgba(191,191,191,1); "
        >
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
                    :parser="positiveInteger"
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
                    :max="24"
                    :parser="positiveInteger"
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
                    :parser="positiveInteger"
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
                    :max="24"
                    :parser="positiveInteger"
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
import { positiveInteger } from '@/utils/validators';
import mixins from './mixins';
import { governanceTypesMap } from '@/constants';

const tokenLimitRule = {
  type: 'number',
  required: true,
  message: 'Please set minimum token balance.'
};
const validateAddress = (rule, value, callback) => {
  var regExp = /^0x[a-fA-F0-9]{40}$/;
  if (value === '') {
    callback(new Error('Please enter ethereum address'));
  } else if (!regExp.test(value)) {
    callback(new Error('请输入正确的地址(OX开头的字母数字长度为40的字符串)'));
  } else {
    callback();
  }
};

export default {
  name: 'governance',
  mixins: [mixins],
  components: {
    [Slider.name]: Slider
  },
  data() {
    return {
      governanceTypesMap: governanceTypesMap,
      validateEthAddress: validateAddress,
      form: {
        ...{
          governanceProposer: 1, // 提案发起者类型 1.FounderAssign 2.POS 3.All
          proposerAssignAddrs: [''],
          proposerTokenLimit: '',
          voteType: 1, // 提案投票者类型 1.FounderAssign 2.POS 3.All
          voteAssignAddrs: [''],
          voteTokenLimit: '',
          voteSupportPercent: 100,
          voteMinApprovalPercent: 100,
          // voteMinDurationHours: 0,
          // voteMaxDurationHours: 0
          minDuration: {
            hours: 0,
            days: 0
          },
          maxDuration: {
            hours: 0,
            days: 0
          }
        },
        ...this.defaultData
      },
      rules: {
        // voteAssignAddrs: {
        //   type: 'array',
        //   range: [1]
        //   // validator: (rule, value, callback) => {
        //   //   callback();
        //   // }
        // },
        voteTokenLimit: tokenLimitRule,
        proposerTokenLimit: tokenLimitRule,
        'maxDuration.days': {
          type: 'number',
          trigger: 'change',
          validator: (rule, value, callback) => {
            if (value < this.form.minDuration.days) {
              // eslint-disable-next-line standard/no-callback-literal
              callback("Must greater than 'MinDuration' days.");
            } else {
              callback();
            }
          }
        }
      }
    };
  },
  methods: {
    positiveInteger,
    // add assign address
    addAddress(type) {
      if (type === 'proposer') {
        this.form.proposerAssignAddrs.push('');
      } else {
        this.form.voteAssignAddrs.push('');
      }
    },
    removeAddress(index, type) {
      if (type === 'proposer') {
        this.form.proposerAssignAddrs.splice(index, 1);
      } else {
        this.form.voteAssignAddrs.splice(index, 1);
      }
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
