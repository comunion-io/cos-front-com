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
    },
    skills: Array
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
    skills(v) {
      if (v?.length) {
        this.selectedSkills = v;
      }
    },
    systemSkills(v) {
      this.currentSkills = this.currentSkills.concat(v);
    }
  },
  methods: {
    toggleSelect(skill) {
      const index = this.selectedSkills.indexOf(skill);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      } else {
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
