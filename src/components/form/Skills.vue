<template>
  <div>
    <input
      class="ant-input ant-input-lg"
      @click="modalVisible = true"
      :value="text"
      :placeholder="placeholder"
      :disabled="disabled"
      readonly
    />
    <skill-modal
      v-if="modalVisible"
      v-model="modalVisible"
      :maxLength="maxLength"
      :skills="value"
      @ok="updateSkills"
    />
  </div>
</template>

<script>
import SkillModal from '@/components/modal/SkillModal';
export default {
  components: {
    SkillModal
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Please select skills'
    },
    maxLength: {
      type: Number,
      default: 3
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalVisible: false
    };
  },
  computed: {
    text() {
      console.log(
        '%c 🍤 this.value: ',
        'font-size:20px;background-color: #4b4b4b;color:#fff;',
        this.value
      );
      return this.value.join(',');
    }
  },
  methods: {
    updateSkills(v) {
      this.$emit('input', v);
      this.modalVisible = false;
    }
  }
};
</script>

<style></style>
