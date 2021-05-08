<template>
  <div class="number-input-wrap">
    <div class="input-wrap" :class="{ 'has-addon-after': Boolean(addonAfter) }">
      <a-input-number
        class="input"
        :size="size"
        :max="max"
        :min="min"
        :precision="precision"
        :step="step"
        v-model="data"
        :placeholder="placeholder"
        :disabled="disabled"
        @change="onChange"
        @pressEnter="onPressEnter"
      />
    </div>
    <div class="addon-after-wrap">
      <div class="addon-after" v-if="addonAfter">{{ addonAfter }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    disabled: Boolean,
    addonAfter: {
      type: String,
      default: ''
    },
    size: String,
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    precision: {
      type: Number
    },
    step: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: ''
    }
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
  },
  methods: {
    onChange(value) {
      this.$emit('change', value);
    },
    onPressEnter(e) {
      this.$emit('pressEnter', e);
    }
  }
};
</script>

<style lang="less" scoped>
.number-input-wrap {
  width: 100%;
  display: flex;
  line-height: normal;
  .input-wrap {
    flex: 1;
    .input {
      width: 100%;
    }
  }
  .has-addon-after {
    /deep/ .ant-input-number {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .addon-after-wrap {
    .addon-after {
      height: 100%;
      padding: 0 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fafafa;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      border: 1px solid #d9d9d9;
      border-left: 0;
      box-sizing: border-box;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      transition: all 0.3s;
    }
  }
}
</style>
<style lang="less">
.has-error .number-input-wrap .addon-after-wrap .addon-after {
  background-color: #fff;
  color: #f5222d;
  border-color: #f5222d;
}
</style>
