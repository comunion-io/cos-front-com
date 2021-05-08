<template>
  <div class="payment-terms">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="row">
        <number-input
          size="large"
          :min="0"
          v-model="item.number"
          :addon-after="tokenSymbol"
          @change="onChange"
        />
        <a-button
          v-if="index === 0"
          class="btn"
          type="primary"
          shape="circle"
          icon="plus"
          size="small"
          @click="onAdd"
        />
        <a-button
          v-else
          class="btn"
          shape="circle"
          icon="close"
          size="small"
          @click="onDel(index)"
        />
      </div>
      <div class="row">
        <a-textarea
          v-model="item.text"
          placeholder="Please input terms"
          :rows="3"
          :maxLength="100"
          @change="onChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NumberInput from '@/components/form/NumberInput';

export default {
  data() {
    return {
      list: [
        {
          number: '',
          text: ''
        }
      ]
    };
  },
  props: {
    tokenSymbol: {
      type: String
    }
  },
  components: {
    NumberInput
  },
  methods: {
    onAdd() {
      this.list.push({
        number: '',
        text: ''
      });
      this.onChange();
    },
    onDel(index) {
      this.$delete(this.list, index);
      this.onChange();
    },
    onChange() {
      this.$nextTick(() => {
        this.emitChange();
      });
    },
    emitChange() {
      let value = this.list;
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="less" scoped>
.payment-terms {
  width: 100%;
  margin-top: 16px;

  .item {
    width: 100%;
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .row {
    width: 100%;
    margin-bottom: 16px;
    position: relative;

    &:last-of-type {
      margin-bottom: 0;
    }

    .btn {
      position: absolute;
      right: -30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
