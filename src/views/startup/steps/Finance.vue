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
      <a-row :gutter="20">
        <a-col :span="14">
          <a-form-model-item label="Token Name" prop="tokenName">
            <a-input size="large" v-model="form.tokenName" placeholder="My Organization Token" />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="Token Symbol" prop="tokenSymbol">
            <a-input size="large" v-model="form.tokenSymbol" placeholder="Token Symbol" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="Token Contract" prop="tokenAddr">
        <a-input size="large" v-model="form.tokenAddr" placeholder="Contract Name" />
      </a-form-model-item>
      <a-form-model-item
        v-for="(wallet, index) in form.walletAddrs"
        :key="index"
        :label="index === 0 ? 'Wallet' : ''"
        prop="walletAddrs"
        :autoLink="false"
        class="mb-00"
      >
        <a-card size="small">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-model-item :prop="`walletAddrs.${index}.name`" required>
                <a-input
                  size="large"
                  v-model="form.walletAddrs[index].name"
                  placeholder="Wallet Name"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item :prop="`walletAddrs.${index}.ballance`">
                <a-input
                  size="large"
                  v-model="form.walletAddrs[index].ballance"
                  placeholder="Ballance"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="16">
              <a-form-model-item :prop="`walletAddrs.${index}.address`" class="mb-00">
                <a-input
                  size="large"
                  v-model="form.walletAddrs[index].address"
                  placeholder="Ethereum Address"
                />
              </a-form-model-item>
            </a-col>
            <a-col v-if="form.walletAddrs.length > 1" :span="4">
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
        <a href="https://vittominacori.github.io/erc20-generator/">Erc20-Generator</a> to create
        your token.
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
  </a-card>
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
          tokenName: '',
          tokenSymbol: '',
          tokenAddr: '',
          walletAddrs: [{ name: '', ballance: '', address: '' }]
        },
        ...this.defaultData
      },
      rules: {
        tokenName: { required: true, message: 'Please input your token name.' },
        tokenSymbol: { required: true, message: 'Please input token symbol.' },
        tokenAddr: { required: true, message: 'Please input your contract address.' },
        walletAddrs: [
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
      this.$refs.form.validateField('walletAddrs', errMsg => {
        if (!errMsg) {
          this.form.walletAddrs.push({
            name: '',
            ballance: '',
            address: ''
          });
        }
      });
    },
    // 删除地址
    removeAddress(index) {
      this.form.walletAddrs.splice(index, 1);
    }
  }
};
</script>

<style></style>
