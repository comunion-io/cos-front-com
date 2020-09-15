<template>
  <a-modal v-model="visible" :title="title" destroyOnClose @ok="onOk">
    <div class="flex flex-wrap">
      <a-tag
        v-for="skill in currentSkills"
        :key="skill"
        :class="{ selected: selectedSkills.includes(skill) }"
        @click.native="toggleSelect(skill)"
      >
        {{ skill }}
      </a-tag>
      <a-input
        v-if="inputVisible"
        ref="input"
        type="text"
        size="small"
        class="mr-16"
        :style="{ width: '78px' }"
        v-model.trim="inputValue"
        @keyup.enter="handleInputConfirm"
        @keydown.esc.stop="cancelInput"
      />
      <a-tag @click="showInput"><a-icon type="plus"/></a-tag>
    </div>
    <div class="mt-36">
      You can choose up to <span class="t-error">{{ maxLength }}</span> Skill Tags
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
    },
    skills: Array,
    maxLength: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      currentSkills: [],
      selectedSkills: []
    };
  },
  computed: {
    ...mapGetters({
      systemSkills: 'skills'
    })
  },
  watch: {
    skills: {
      immediate: true,
      handler(v) {
        if (v?.length) {
          this.selectedSkills = [...v];
          this.currentSkills = Array.from(new Set([...v, ...this.currentSkills]));
        }
      }
    },
    systemSkills: {
      immediate: true,
      handler(v) {
        this.currentSkills = Array.from(new Set([...v, ...this.currentSkills]));
      }
    }
  },
  methods: {
    cancelInput() {
      this.inputVisible = false;
      this.inputValue = '';
    },
    toggleSelect(skill) {
      const index = this.selectedSkills.indexOf(skill);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      } else {
        if (this.selectedSkills.length >= this.maxLength) {
          return this.$message.warning(`You can choose up to ${this.maxLength} Skill Tags`);
        }
        this.selectedSkills.push(skill);
      }
    },
    showInput() {
      this.inputVisible = true;
      this.inputValue = '';
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (!this.inputValue) return;
      if (this.selectedSkills.length >= this.maxLength) {
        return this.$message.warning(`You can choose up to ${this.maxLength} Skill Tags`);
      }
      if (!this.currentSkills.includes(this.inputValue)) {
        this.currentSkills.push(this.inputValue);
      }
      this.selectedSkills.push(this.inputValue);
      this.inputValue = '';
      this.inputVisible = false;
    },
    onOk() {
      this.$emit('ok', this.selectedSkills);
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables.less';
.selected {
  /deep/ &.ant-tag {
    background: @primary-color;
    color: #fff;
  }
}
</style>
