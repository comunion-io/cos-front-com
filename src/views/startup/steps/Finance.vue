<template>
  <a-form-model
    class="vertical-form"
    ref="form"
    :labelCol="{ span: 24 }"
    :wrapperCol="{ span: 24 }"
    :model="form"
    :rules="rules"
    @submit.prevent="handleSubmit"
  >
    <a-row :gutter="20">
      <a-col :span="14">
        <a-form-model-item label="Token Name" prop="name">
          <a-input size="large" v-model="form.name" placeholder="My Organization Token" />
        </a-form-model-item>
      </a-col>
      <a-col :span="10">
        <a-form-model-item label="Token Symbol" prop="symbol">
          <a-input size="large" v-model="form.symbol" placeholder="Token Symbol" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-form-model-item label="Token Contract" prop="contract">
      <a-input size="large" v-model="form.contract" placeholder="Contract Name" />
    </a-form-model-item>
    <a-form-model-item
      v-for="(wallet, index) in form.wallets"
      :key="index"
      :label="index === 0 ? 'Wallet' : ''"
      prop="wallets"
      :autoLink="false"
      class="mb-00"
    >
      <a-card size="small">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-model-item :prop="`wallets.${index}.name`" required>
              <a-input size="large" v-model="form.wallets[index].name" placeholder="Wallet Name" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item :prop="`wallets.${index}.ballance`">
              <a-input size="large" v-model="form.wallets[index].ballance" placeholder="Ballance" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="16">
            <a-form-model-item :prop="`wallets.${index}.address`" class="mb-00">
              <a-input
                size="large"
                v-model="form.wallets[index].address"
                placeholder="Ethereum Address"
              />
            </a-form-model-item>
          </a-col>
          <a-col v-if="form.wallets.length > 1" :span="4">
            <a-button size="large" style="line-height:40px" @click="removeAddress(index)">
              <a-icon type="delete" />Remove
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-form-model-item>
    <a-button class="mt-16" block size="large" @click="addAddress">+&nbsp;Add More</a-button>
    <div class="my-32">
      If you have not created token, you can use
      <a href="https://vittominacori.github.io/erc20-generator/">Erc20-Generator</a> to create your
      token.
    </div>
    <a-row :gutter="20">
      <a-col :span="12">
        <a-button block size="large" @click="cancel">Cancel</a-button>
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
  name: 'finance',
  mixins: [mixins],
  data() {
    return {
      form: {
        ...{
          name: '',
          symbol: '',
          contract: '',
          wallets: [{ name: '', ballance: '', address: '' }]
        },
        ...this.defaultData
      },
      rules: {
        name: { required: true, message: 'Please input your organization name.' },
        symbol: { required: true, message: 'Please input token symbol.' },
        contract: { required: true, message: 'Please input your contract address.' },
        wallets: [
          {
            type: 'array',
            required: true,
            message: 'Please input at least one wallet.',
            defaultField: {
              type: 'object',
              required: true,
              fields: {
                name: { type: 'string', required: true, message: 'Please input wallet name.' },
                ballance: {
                  type: 'string',
                  required: true,
                  message: 'Please input wallet ballance.'
                },
                address: { type: 'string', required: true, message: 'Please input wallet address.' }
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    // 添加地址
    addAddress() {
      this.$refs.form.validateField('wallets', errMsg => {
        if (!errMsg) {
          this.form.wallets.push({
            name: '',
            ballance: '',
            address: ''
          });
        }
      });
    },
    // 删除地址
    removeAddress(index) {
      this.form.wallets.splice(index, 1);
    }
  }
};
</script>

<style></style>
