<template>
  <div class="startup-item flex ai-center">
    <img :src="startup.logo || defaultLogo" alt="Start-Up logo" class="logo" />
    <div class="flex-1">
      <div class="flex ai-center">
        <div class="t-dark t-trunc" :title="startup.name">{{ startup.name }}</div>
        <div
          v-if="state.label"
          class="state t-trunc-2"
          :class="[`state-${state.state}`]"
          :title="state.label"
        >
          {{ state.label }}
        </div>
      </div>
      <p class="mt-12 mb-0 t-grey t-trunc-2">{{ startup.mission }}</p>
    </div>
  </div>
</template>

<script>
import { startupState } from '@/filters/startup';
export default {
  props: {
    startup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultLogo: require('@/assets/images/file@2x.png')
    };
  },
  computed: {
    state() {
      return startupState(this.startup);
    }
  }
};
</script>

<style lang="less" scoped>
.startup-item {
  margin-bottom: 24px;
  padding: 0 30px;
  width: 100%;
  height: 124px;
  font-size: 15px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
.logo {
  margin-right: 36px;
  width: 48px;
  height: 48px;
}
.state {
  display: inline-flex;
  align-items: center;
  margin-left: 24px;
  padding: 0 20px;
  height: 24px;
  font-size: 13px;
  border-radius: 12px;
  &.state-creating {
    background: #e2fff0;
    color: #3ac47d;
  }
  &.state-waiting {
    background: #ffead2;
    color: #ffad4d;
  }
  &.state-failed {
    color: #d80000;
    background: #ffeaea;
  }
}
</style>
