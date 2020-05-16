<template>
  <a-form-model
    ref="form"
    :labelCol="{ span: 24 }"
    :wrapperCol="{ span: 24 }"
    :model="form"
    :rules="rules"
    @submit.prevent="handleSubmit"
  >
    <div class="flex jc-end my-8">
      <a-switch v-model="enabled">
        <a-icon slot="checkedChildren" type="check" />
        <a-icon slot="unCheckedChildren" type="close" />
      </a-switch>
    </div>
    <a-card :class="{ disabled: !form.enabled }">
      <a-form-model-item label="The Fundraising Contact Address" class="mb-00"
        >Auto generate after creation</a-form-model-item
      >
      <a-form-model-item label="Startup Fundraising Address" prop="fundraisingAddress">
        <a-input
          :disabled="!form.enabled"
          v-model="form.fundraisingAddress"
          placeholder="Ethereum Address"
        />
      </a-form-model-item>
      <a-form-model-item label="Description on bbs" prop="descUrl" class="mb-00">
        <a-input :disabled="!form.enabled" v-model="form.descUrl" placeholder="https://" />
        <div class="flex jc-end">
          No bbs description,<a href="https://bbs.comunion.io/">Go to Post</a>
        </div>
      </a-form-model-item>
      <a-form-model-item label="Fundraising Time" prop="fundraisingTime">
        <a-date-picker :disabled="!form.enabled" v-model="form.fundraisingTime" class="w-100p" />
      </a-form-model-item>
      <a-form-model-item label="Fundraising ETH" prop="fundraising" class="mb-00">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-model-item prop="fundraising.eth">
              <a-input-number
                :disabled="!form.enabled"
                v-model="form.fundraising.eth"
                :min="0"
                style="width:72%"
              />
              <span class="ml-4">ETH</span>
            </a-form-model-item>
          </a-col>
          <a-col :span="1" class="t-center">=</a-col>
          <a-col :span="6">
            <a-form-model-item prop="fundraising.symbol">
              <a-input-number
                :disabled="!form.enabled"
                v-model="form.fundraising.symbol"
                :min="0"
                style="width:72%"
              />
              <span class="ml-4">UVU</span>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item label="Exchange Creation" prop="exchangeAddress">
        <a-input
          :disabled="!form.enabled"
          v-model="form.exchangeAddress"
          placeholder="Token Contrace Address"
        />
      </a-form-model-item>
      <a-form-model-item
        label="Exchange Initial Liquidity"
        prop="exchangeInitialLiquidity"
        class="mb-00"
      >
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-model-item prop="exchangeInitialLiquidity.eth">
              <a-input-number
                :disabled="!form.enabled"
                v-model="form.exchangeInitialLiquidity.eth"
                :min="0"
                style="width:72%"
              />
              <span class="ml-4">ETH</span>
            </a-form-model-item>
          </a-col>
          <a-col :span="1" class="t-center">=</a-col>
          <a-col :span="6">
            <a-form-model-item prop="exchangeInitialLiquidity.symbol">
              <a-input-number
                :disabled="!form.enabled"
                v-model="form.exchangeInitialLiquidity.symbol"
                :min="0"
                style="width:72%"
              />
              <span class="ml-4">UVU</span>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item label="Unlock  Token  (IRO Token + Liquitidy Token)" prop="unlockToken">
        <a-input
          :disabled="!form.enabled"
          v-model="form.unlockToken"
          placeholder="Token Contrace Address"
        >
          <div slot="suffix" class="flex ai-center">
            <div class="mr-16 t-grey">UVU</div>
            <a-button size="small" type="danger">Unlock</a-button>
          </div>
        </a-input>
      </a-form-model-item>
    </a-card>
    <a-row class="mt-24" :gutter="20">
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
import mixins from './mixins';

export default {
  name: 'fundraise',
  mixins: [mixins],
  data() {
    return {
      form: {
        ...{
          enabled: false,
          fundraisingAddress: '',
          descUrl: '',
          fundraisingTime: '',
          fundraising: {
            eth: null,
            symbol: null
          },
          exchangeAddress: '',
          exchangeInitialLiquidity: {
            eth: null,
            symbol: null
          },
          unlockToken: ''
        },
        ...this.defaultData
      },
      rules: {
        fundraisingAddress: { required: true },
        fundraisingTime: { required: true },
        fundraising: {
          type: 'object',
          fields: {
            eth: { required: true, type: 'number', min: 0 },
            symbol: { required: true, type: 'number', min: 0 }
          }
        },
        exchangeAddress: { required: true },
        exchangeInitialLiquidity: {
          type: 'object',
          fields: {
            eth: { required: true, type: 'number', min: 0 },
            symbol: { required: true, type: 'number', min: 0 }
          }
        },
        unlockToken: { required: true }
      }
    };
  },
  methods: {
    handleSubmit() {
      if (this.enabled) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit('next', [this.$options.name, this.form]);
          }
        });
      } else {
        this.$emit('next', [this.$options.name, this.form]);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.disabled {
  background: #e8e8e8;
}
</style>
