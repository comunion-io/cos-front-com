<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <b-row>
      <b-col cols="7">
        <v-text-field
          v-model="form.name"
          label="Token Name"
          placeholder="My Organization Token"
          required
        ></v-text-field>
      </b-col>
      <b-col cols="5">
        <v-text-field
          v-model="form.symbol"
          label="Token Symbol"
          placeholder="Token Symbol"
          required
        ></v-text-field>
      </b-col>
    </b-row>
    <v-text-field
      v-model="form.contract"
      label="Token Contract"
      placeholder="Contract Name"
      required
    ></v-text-field>
    <b-button class="w-100" variant="outline-secondary">+&nbsp;Add More</b-button>
    <div class="my-4">
      If you have not created token, you can use <a href="">Erc20-Generator</a> to create your
      token.
    </div>
    <b-row>
      <b-col lg="6">
        <b-button class="mr-2 mb-2 w-100" variant="outline-secondary" @click="cancel">
          Cancel
        </b-button>
      </b-col>
      <b-col lg="6">
        <b-button class="mr-2 mb-2 w-100" variant="primary" @click="next">
          Next: Review information
        </b-button>
      </b-col>
    </b-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    form: {
      name: '',
      symbol: '',
      contract: ''
    }
  }),
  methods: {
    cancel() {},
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
    }
  }
};
</script>

<style></style>
