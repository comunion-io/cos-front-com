<template>
  <a-form-model-item label="Description on bbs" :prop="prop" class="form-item">
    <a-input size="large" v-model="data" placeholder="https://" />
    <div class="tip flex jc-end">
      No bbs description,<a href="https://bbs.comunion.io/">Go to Post</a>
    </div>
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    prop: {
      type: String,
      default: 'descriptionAddr'
    },
    value: String
  },
  computed: {
    data: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form-item {
  margin-bottom: 40px;
  &.ant-form-item-with-help {
    margin-bottom: 21px;
  }
}
.tip {
  position: absolute;
  right: 0;
  bottom: -32px;
  line-height: 1;
}
</style>
