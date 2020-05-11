<template>
  <a-form :form="form" @submit="handleSubmit">
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
          'symbol',
          { rules: [{ required: true, message: 'Please input token symbol!' }] }
        ]"
      />
    </a-form-item>
    <a-button block size="large">+&nbsp;Add More</a-button>
    <div class="my-32">
      If you have not created token, you can use <a href="">Erc20-Generator</a> to create your
      token.
    </div>
    <a-row gutter="20">
      <a-col :span="12">
        <a-button block size="large">Cancel</a-button>
      </a-col>
      <a-col :span="12">
        <a-button block size="large" type="primary" html-type="submit">Submit</a-button>
      </a-col>
    </a-row>
  </a-form>
  <!-- <v-form ref="form" v-model="valid" lazy-validation>
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
        <a-button class="mr-2 mb-2 w-100" variant="outline-secondary" @click="cancel">
          Cancel
        </a-button>
      </b-col>
      <b-col lg="6"> 
        <a-button class="mr-2 mb-2 w-100" variant="primary" @click="next">
          Next: Review information
        </a-button>
      </b-col>
    </b-row>
  </v-form> -->
</template>

<script>
export default {
  data: () => ({
    form: this.$form.createForm(this, { name: 'finance' })
  }),
  methods: {
    cancel() {},
    next() {
      this.$emit('next');
    }
  }
};
</script>

<style></style>
