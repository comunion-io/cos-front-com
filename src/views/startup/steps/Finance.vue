<template>
  <a-form
    :labelCol="{ span: 24 }"
    :wrapperCol="{ span: 24 }"
    :form="form"
    @submit.prevent="handleSubmit"
  >
    <a-row :gutter="20">
      <a-col :span="14">
        <a-form-item label="Token Name">
          <a-input
            placeholder="My Organization Token"
            v-decorator="[
              'name',
              { rules: [{ required: true, message: 'Please input token name!' }] }
            ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-form-item label="Token Symbol">
          <a-input
            placeholder="Token Symbol"
            v-decorator="[
              'symbol',
              { rules: [{ required: true, message: 'Please input token symbol!' }] }
            ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="Token Contract">
      <a-input
        placeholder="Contract Name"
        v-decorator="[
          'contract',
          { rules: [{ required: true, message: 'Please input token symbol!' }] }
        ]"
      />
    </a-form-item>
    <a-form-item
      v-for="(k, index) in form.getFieldValue('wallet')"
      :key="k"
      :label="index === 0 ? 'Wallet' : ''"
      required
    >
      <a-row :gutter="20">
        <a-col :span="16">
          <a-input v-decorator="[`names[${k}]`]" placeholder="Wallet Name" />
        </a-col>
        <a-col :span="8">
          <a-input v-decorator="[`ballances[${k}]`]" placeholder="Ballance" />
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="20">
          <a-input v-decorator="[`addresses[${k}]`]" placeholder="Ethereum Address" />
        </a-col>
        <a-col :span="4">
          <a-icon type="delete" @click="removeAddress(index)" />
        </a-col>
      </a-row>
    </a-form-item>
    <a-button block size="large" @click="addAddress">+&nbsp;Add More</a-button>
    <div class="my-32">
      If you have not created token, you can use <a href="">Erc20-Generator</a> to create your
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
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      // form: this.$form.createForm(this, { name: 'finance' })
    };
  },
  methods: {
    cancel() {},
    handleSubmit() {
      this.form.validateFields((err, values) => {
        console.log(err, values);
        if (!err) {
          this.$emit('next');
        }
      });
    },
    // 添加地址
    addAddress() {
      const { form } = this;
      let wallet = form.getFieldValue('wallet');
      wallet = wallet.concat({
        name: '',
        ballance: '',
        address: ''
      });
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        wallet
      });
    },
    // 删除地址
    removeAddress(index) {
      const { form } = this;
      let wallet = form.getFieldValue('wallet');
      if (wallet.length === 1) {
        return;
      }
      wallet.splice(index, 1);
      form.setFieldsValue({
        wallet
      });
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'finance' });
    this.form.getFieldDecorator('wallet', { initialValue: [], preserve: true });
  }
};
</script>

<style></style>
