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
    <b-row>
      <b-col lg="6">
        <b-btn class="mr-2 mb-2 w-100 btn-square btn-transition link" variant="link">
          Cancel
        </b-btn>
      </b-col>
      <b-col lg="6">
        <b-btn class="mr-2 mb-2 w-100 btn-square btn-transition primary">
          Next: Review information
        </b-btn>
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
