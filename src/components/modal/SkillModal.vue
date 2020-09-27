<template>
  <a-modal v-model="visible" :title="title" destroyOnClose @ok="onOk">
    <div class="flex flex-wrap">
      <a-tag
        v-for="skill in currentSkills"
        :key="skill"
        class="tag-item"
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
        class="tag-item_input"
        :style="{ width: '78px' }"
        v-model.trim="inputValue"
        @keyup.enter="handleInputConfirm"
        @keydown.esc.stop="doCancelInput"
        @blur="onInputBlur"
      />
      <a-tag class="tag-item" @click="showInput"><a-icon type="plus"/></a-tag>
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
    doCancelInput() {
      this.inputVisible = false;
      this.inputValue = '';
    },
    onInputBlur() {
      if (!this.inputValue) {
        return this.doCancelInput();
      }
      if (!this.currentSkills.includes(this.inputValue)) {
        this.currentSkills.push(this.inputValue);
      }
      this.doCancelInput();
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
      if (!this.inputValue) {
        return this.doCancelInput();
      }
      if (!this.currentSkills.includes(this.inputValue)) {
        this.currentSkills.push(this.inputValue);
      }
      if (this.selectedSkills.length >= this.maxLength) {
        return this.$message.warning(`You can choose up to ${this.maxLength} Skill Tags`);
      }
      this.selectedSkills.push(this.inputValue);
      return this.doCancelInput();
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
.tag-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 0 12px;
  height: 24px;
}
</style>
