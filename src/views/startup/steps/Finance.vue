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
            <a-input
              size="large"
              v-model="form.tokenName"
              placeholder="My Organization Token"
              :max-length="20"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="Token Symbol" prop="tokenSymbol">
            <a-input
              size="large"
              v-model="form.tokenSymbol"
              placeholder="Token Symbol"
              :max-length="10"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="Token Contract" prop="tokenAddr">
        <a-input
          size="large"
          v-model="form.tokenAddr"
          placeholder="Contract Name"
          :max-length="42"
        />
      </a-form-model-item>
      <a-form-model-item label="Wallet" prop="walletAddrs" required :autoLink="false" class="mb-00">
        <a-card size="small">
          <a-row v-for="(wallet, index) in form.walletAddrs" :key="index" :gutter="20">
            <a-col :span="9">
              <a-form-model-item
                :prop="`walletAddrs.${index}.name`"
                :rules="{ required: true, message: 'Please input wallet name.' }"
              >
                <a-input
                  size="large"
                  v-model="form.walletAddrs[index].name"
                  placeholder="Wallet Name"
                  :max-length="20"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="11">
              <a-form-model-item
                :prop="`walletAddrs.${index}.addr`"
                :rules="{ required: true, message: 'Please input wallet address.' }"
              >
                <a-input
                  size="large"
                  v-model="form.walletAddrs[index].addr"
                  placeholder="Ethereum Address"
                  :max-length="42"
                />
              </a-form-model-item>
            </a-col>
            <a-col v-if="form.walletAddrs.length" :span="2">
              <a-button size="large" style="line-height:40px" @click="removeAddress(index)">
                <a-icon type="delete" />
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
          walletAddrs: [{ name: '', addr: '' }]
        },
        ...this.defaultData
      },
      rules: {
        tokenName: { required: true, message: 'Please input your token name.' },
        tokenSymbol: { required: true, message: 'Please input token symbol.' },
        tokenAddr: { required: true, message: 'Please input your contract address.' }
      }
    };
  },
  methods: {
    // 添加地址
    addAddress() {
      this.form.walletAddrs.push({
        name: '',
        addr: ''
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
