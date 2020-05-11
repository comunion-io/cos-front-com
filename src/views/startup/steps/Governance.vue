<template>
  <a-form
    :labelCol="{ span: 24 }"
    :wrapperCol="{ span: 24 }"
    :form="form"
    @submit.prevent="handleSubmit"
  >
    <a-form-item label="Governance" required>
      <a-select v-decorator="['governance']" />
    </a-form-item>
    <a-form-item v-if="form.getFieldValue('governance') === 'FounderAssign'" label="Token Contract">
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
        <a-button block size="large">Cancel</a-button>
      </a-col>
      <a-col :span="12">
        <a-button block size="large" type="primary" html-type="submit"
          >Next：Review information</a-button
        >
      </a-col>
    </a-row>
  </a-form>
  <!-- <v-form ref="form" v-model="valid" lazy-validation>
    <v-select
      v-model="form.governance"
      :items="governanceList"
      label="Governance"
      required
    ></v-select>
    <v-text-field
      v-for="(address, index) in form.assignAddress"
      :key="index"
      :value="address"
      :label="index ? '' : 'Assign Address'"
      placeholder="Ethereum Address"
      required
      @input="v => onAddressChange(index, v)"
    >
      <template #append>
        <a-button v-if="!index" class="w-100" variant="outline-secondary" @click="addAssignAddress"
          >+&nbsp;Add</a-button
        >
        <a-button
          v-else
          class="w-100"
          variant="outline-secondary"
          @click="removeAssignAddress(index)"
          >x&nbsp;Remove</a-button
        >
      </template>
    </v-text-field>
    <div class="row">
      <div class="col-3">
        <a-button class="mr-2 mb-2 w-100" variant="outline-secondary" @click="cancel">
          Cancel
        </a-button>
      </div>
      <div class="col-3">
        <a-button class="mr-2 mb-2 w-100" @click="back">
          Back
        </a-button>
      </div>
      <div class="col-6">
        <a-button class="mr-2 mb-2 w-100" variant="primary" @click="next">
          Next: Review information
        </a-button>
      </div>
    </div>
  </v-form> -->
</template>

<script>
export default {
  data: () => ({
    valid: true,
    form: {
      governance: 'FounderAssign',
      assignAddress: [''],
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
    governanceList: ['FounderAssign', 'POS', 'ALL']
  }),
  methods: {
    cancel() {},
    back() {
      this.$emit('back');
    },
    next() {
      this.$emit('next');
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onAddressChange(index, v) {
      this.form.assignAddress.splice(index, 1, v);
    },
    addAssignAddress() {
      this.form.assignAddress.push('');
    },
    removeAssignAddress(index) {
      this.form.assignAddress.splice(index, 1);
    }
  }
};
</script>

<style></style>
