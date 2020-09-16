<template>
  <div>
    <input
      class="ant-input ant-input-lg"
      @click="modalVisible = true"
      :value="text"
      :placeholder="placeholder"
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
      default: 'Please select skills that required for the bounty'
    },
    maxLength: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      modalVisible: false
    };
  },
  computed: {
    text() {
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
