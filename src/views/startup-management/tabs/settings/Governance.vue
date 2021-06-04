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
      <a-form-model-item label="BlockChainAddress" prop="blockChainAddr">
        <a-input
          size="large"
          v-model="form.blockChainAddr"
          placeholder="BlockChainAddress"
          :max-length="42"
          :disabled="isEdit"
        />
      </a-form-model-item>
      <a-form-model-item label="Governance Proposer" prop="governanceProposer">
        <a-select size="large" v-model="form.governanceProposer" :disabled="isEdit">
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
          :key="index"
          :label="index ? '' : 'Assign Address'"
          :prop="`proposerAssignAddrs.${index}`"
          :rules="{ required: true, validator: validateEthAddress }"
        >
          <a-input
            size="large"
            v-model="form.proposerAssignAddrs[index]"
            placeholder="Ethereum Address"
            style="width: 60%"
            :max-length="42"
            :disabled="isEdit"
          />
          <a-button
            v-if="form.proposerAssignAddrs.length !== 1"
            size="large"
            class="ml-16"
            style="width:10%"
            @click="removeAddress(index, 'proposer')"
            :disabled="isEdit"
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
            :disabled="isEdit"
          >
            <a-icon type="plus" />Add
          </a-button>
        </a-form-model-item>
      </template>
      <a-form-model-item v-if="form.governanceProposer === 2" prop="proposerTokenLimit">
        <label slot="label"
          >TokenBalance<span class="ml-16 t-grey"
            >设置最小持币量，满足的地址可以参与发起提案</span
          ></label
        >
        <a-input-number
          class="w-100p"
          size="large"
          v-model="form.proposerTokenLimit"
          placeholder="Token Balance"
          :min="0"
          :disabled="isEdit"
        />
      </a-form-model-item>
      <a-form-model-item label="Governance Voter" prop="governanceVoter">
        <a-select size="large" v-model="form.voteType" :disabled="isEdit">
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
            placeholder="Ethereum Address"
            style="width: 60%"
            :max-length="42"
            :disabled="isEdit"
          />
          <a-button
            v-if="form.voteAssignAddrs.length !== 1"
            size="large"
            class="ml-16"
            style="width:10%"
            @click="removeAddress(index)"
            :disabled="isEdit"
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
            :disabled="isEdit"
          >
            <a-icon type="plus" />Add
          </a-button>
        </a-form-model-item>
      </template>
      <a-form-model-item v-if="form.voteType === 2" prop="voteTokenLimit">
        <label slot="label"
          >TokenBalance<span class="ml-16 t-grey"
            >设置最小持币量，满足的地址可以参与投票</span
          ></label
        >
        <a-input-number
          class="w-100p"
          size="large"
          v-model="form.voteTokenLimit"
          placeholder="Token Balance"
          :min="0"
          :disabled="isEdit"
        />
      </a-form-model-item>
      <a-form-model-item label="Vote Setting">
        <a-card style="background:rgba(247,248,255,1); border:1px dashed rgba(191,191,191,1);">
          <a-form-model-item label="SUPPORT NEED">
            <number-input
              size="large"
              :min="0"
              v-model="form.voteSupport"
              :disabled="isEdit"
              addon-after="Address"
              style="max-width: 240px"
            />
          </a-form-model-item>
          <a-form-model-item label="MINIMUM APPROVAL %" class="mb-00">
            <a-slider
              v-model="form.voteMinApprovalPercent"
              class="slider-item"
              :disabled="isEdit"
            />
            <a-input-number
              size="large"
              v-model="form.voteMinApprovalPercent"
              style="width:12%"
              :min="0"
              :max="100"
              :disabled="isEdit"
            />
            <span class="ml-4">%</span>
          </a-form-model-item>
        </a-card>
        <a-card
          style="margin-top:24px; background:rgba(247,248,255,1); border:1px dashed rgba(191,191,191,1); "
        >
          <a-form-model-item label="VOTE DURATION" class="mb-00">
            <a-row :gutter="24">
              <a-col :span="10">MinDuration</a-col>
              <a-col :span="14">
                <a-form-model-item prop="minDuration">
                  <a-input-number
                    size="large"
                    v-model="form.minDuration"
                    :min="0"
                    :max="100"
                    :parser="positiveInteger"
                    :disabled="isEdit"
                  />
                  <span class="ml-4">Days</span>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="10">MaxDuration</a-col>
              <a-col :span="14">
                <a-form-model-item prop="maxDuration" class="mb-0">
                  <a-input-number
                    size="large"
                    v-model="form.maxDuration"
                    :min="0"
                    :max="100"
                    :parser="positiveInteger"
                    :disabled="isEdit"
                  />
                  <span class="ml-4">Days</span>
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
        <a-col :span="24">
          <a-button class="mt-36" block size="large" v-if="isEdit" disabled @click="edit">
            Edit
          </a-button>
        </a-col>
        <!--<a-col :span="6">-->
        <!--  <a-button block size="large" @click="cancel">Cancel</a-button>-->
        <!--</a-col>-->
        <!--<a-col :span="6">-->
        <!--  <a-button block size="large" @click="back">-->
        <!--    <a-icon type="arrow-left"></a-icon>-->
        <!--    Back-->
        <!--  </a-button>-->
        <!--</a-col>-->
        <!--<a-col :span="12">-->
        <!--  <a-button block size="large" type="primary" html-type="submit">-->
        <!--    Next：Review information-->
        <!--    <a-icon type="arrow-right"></a-icon>-->
        <!--  </a-button>-->
        <!--</a-col>-->
      </a-row>
    </a-form-model>
  </a-card>
</template>

<script>
import { Slider } from 'ant-design-vue';
import { positiveInteger, validateAddress } from '@/utils/validators';
import NumberInput from '@/components/form/NumberInput';
import mixins from '../../../startup/steps/mixins';
import services from '@/services';
import { governanceTypesMap } from '@/constants';

export default {
  name: 'governance',
  mixins: [mixins],
  props: {
    // startup id
    id: {
      required: true,
      type: String
    }
  },
  components: {
    [Slider.name]: Slider,
    NumberInput
  },
  data() {
    return {
      governanceTypesMap: governanceTypesMap,
      validateEthAddress: validateAddress,
      form: {
        ...{
          governanceProposer: 1, // 1.FounderAssign 2.POS 3.All
          proposerAssignAddrs: [''],
          proposerTokenLimit: '',
          voteType: 1, // 1.FounderAssign 2.POS 3.All
          voteAssignAddrs: [''],
          voteTokenLimit: '',
          voteSupport: 0,
          voteMinApprovalPercent: 100,
          // voteMinDurationHours: 0,
          // voteMaxDurationHours: 0
          minDuration: 0,
          maxDuration: 0
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
        proposerTokenLimit: {
          type: 'number',
          required: true,
          message: 'Please input the proposer token limit.'
          // validator: (rule, value, callback) => {
          //   callback();
          // }
        },
        voteTokenLimit: {
          type: 'number',
          required: true,
          message: 'Please input the vote token limit.'
          // validator: (rule, value, callback) => {
          //   callback();
          // }
        },
        maxDuration: {
          type: 'number',
          trigger: 'change',
          validator: (rule, value, callback) => {
            if (value < this.form.minDuration) {
              // eslint-disable-next-line standard/no-callback-literal
              callback("Must greater than 'MinDuration' days.");
            } else {
              callback();
            }
          }
        }
      },
      isEdit: true
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
    },
    edit() {
      this.isEdit = false;
    }
  },
  async mounted() {
    const { error, data } = await services['cores@startup-我的-获取']({ startupId: this.id });
    const startup = error ? {} : data;
    const { settings } = startup;

    const governance = {
      blockChainAddr: startup.transaction.blockAddr,
      governanceProposer: settings.proposerType,
      proposerAssignAddrs: settings.assignedProposers || [],
      proposerTokenLimit: settings.proposerTokenLimit,
      voteType: settings.voterType,
      voteAssignAddrs: settings.assignedVoters || [],
      voteTokenLimit: settings.voterTokenLimit,
      voteSupport: settings.proposalSupporters,
      voteMinApprovalPercent: settings.proposalMinApprovalPercent,
      minDuration: settings.proposalMinDuration,
      maxDuration: settings.proposalMaxDuration
    };

    this.form = {
      ...governance
    };
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
