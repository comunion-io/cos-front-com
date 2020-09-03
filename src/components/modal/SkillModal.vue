<template>
  <a-modal v-model="visible" :title="title" :footer="null" destroyOnClose @ok="onOk">
    <div>
      <a-tag v-for="skill in skills" :key="skill">
        {{ skill }}
      </a-tag>
      <a-input
        v-if="inputVisible"
        ref="input"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        :value="inputValue"
        @change="handleInputChange"
        @blur="handleInputConfirm"
        @keyup.enter="handleInputConfirm"
      />
      <a-tag @click="showInput"><a-icon type="plus"/></a-tag>
    </div>
  </a-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { modalMixin } from '@/mixins';
export default {
  mixins: [modalMixin],
  props: {
    title: {
      type: String,
      default: 'Add Skill Tags'
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    };
  },
  computed: {
    ...mapGetters(['skills'])
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.inputValue = '';
    },
    onOk() {}
  }
};
</script>

<style></style>
