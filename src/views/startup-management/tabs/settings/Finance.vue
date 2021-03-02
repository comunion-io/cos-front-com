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
      <a-row :gutter="20">
        <a-col :span="14">
          <a-form-model-item label="Token Name" prop="tokenName">
            <a-input
              size="large"
              v-model="form.tokenName"
              placeholder="My Organization Token"
              :max-length="20"
              :disabled="isEdit"
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
              :disabled="isEdit"
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
          :disabled="isEdit"
        />
      </a-form-model-item>
      <a-form-model-item label="Wallet" prop="walletAddrs" required :autoLink="false" class="mb-00">
        <a-card size="small">
          <a-row v-for="(wallet, index) in form.walletAddrs" :key="index" :gutter="20">
            <a-col :span="9">
              <a-form-model-item
                :prop="`walletAddrs.${index}.name`"
                :rules="{ required: true, validator: validateTokenName }"
              >
                <a-input
                  size="large"
                  v-model="form.walletAddrs[index].name"
                  placeholder="Wallet Name"
                  :max-length="20"
                  :disabled="isEdit"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="11">
              <a-form-model-item
                :prop="`walletAddrs.${index}.addr`"
                :rules="{ required: true, validator: validateEthAddress }"
              >
                <a-input
                  size="large"
                  v-model="form.walletAddrs[index].addr"
                  placeholder="Ethereum Address"
                  :max-length="42"
                  :disabled="isEdit"
                />
              </a-form-model-item>
            </a-col>
            <a-col v-if="form.walletAddrs.length" :span="2">
              <a-button
                size="large"
                style="line-height:40px"
                :disabled="isEdit"
                @click="removeAddress(index)"
              >
                <a-icon type="delete" />
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-form-model-item>
      <a-button class="mt-16" block size="large" :disabled="isEdit" @click="addAddress"
        >+&nbsp;Add More</a-button
      >

      <a-row :gutter="20">
        <a-col :span="24">
          <a-button class="mt-36" block size="large" v-if="isEdit" disabled @click="edit"
            >Edit</a-button
          >
        </a-col>
      </a-row>
    </a-form-model>
  </a-card>
</template>

<script>
import mixins from '../../../startup/steps/mixins';
import { validateName, validateAddress } from '@/utils/validators';
import services from '@/services';

export default {
  mixins: [mixins],
  props: {
    // startup id
    id: {
      required: true,
      type: String
    }
  },
  data() {
    let validateTokenName = validateName;
    let validateEthAddress = validateAddress;
    return {
      validateTokenName: validateTokenName,
      validateEthAddress: validateEthAddress,
      form: {
        ...{
          blockChainAddr: '',
          tokenName: '',
          tokenSymbol: '',
          tokenAddr: '',
          walletAddrs: [{ name: '', addr: '' }]
        }
      },
      rules: {
        tokenName: { required: true, validator: validateTokenName },
        tokenSymbol: { required: true, validator: validateTokenName },
        tokenAddr: { required: true, validator: validateEthAddress }
      },
      isEdit: true
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
    },

    edit() {
      this.isEdit = true;
    }
  },
  async mounted() {
    const { error, data } = await services['cores@startup-我的-获取']({ startupId: this.id });
    const startup = error ? {} : data;
    const { settings } = startup;
    const finance = {
      blockChainAddr: startup.transaction.blockAddr,
      tokenName: settings.tokenName,
      tokenSymbol: settings.tokenSymbol,
      tokenAddr: settings.tokenAddr,
      walletAddrs: settings.walletAddrs
    };

    this.form = {
      ...finance
    };
  }
};
</script>

<style></style>
