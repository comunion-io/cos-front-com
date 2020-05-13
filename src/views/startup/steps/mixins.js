export default {
  props: {
    defaultData: Object
  },
  methods: {
    cancel() {
      this.$emit('cancel', [this.$options.name, this.form]);
    },
    back() {
      this.$emit('back', [this.$options.name, this.form]);
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('next', [this.$options.name, this.form]);
        }
      });
    }
  }
};
