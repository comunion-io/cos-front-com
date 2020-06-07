<template>
  <div class="startup-item flex ai-center">
    <img :src="startup.logo || defaultLogo" alt="Startup logo" class="logo" />
    <div class="flex-1">
      <div class="flex ai-center">
        <div class="t-dark">{{ startup.name }}</div>
        <div v-if="tagMap[startup.state]" class="state" :class="[`state-${tagMap[startup.state]}`]">
          {{ startup.state | state }}
        </div>
      </div>
      <p class="mt-12 mb-0 t-grey">{{ startup.mission }}</p>
    </div>
  </div>
</template>

<script>
import { startupStateFilter } from '@/filters/startup';
export default {
  props: {
    startup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultLogo: require('@/assets/images/file@2x.png'),
      // 状态对应的tag的颜色
      tagMap: {
        0: startupStateFilter(0),
        2: startupStateFilter(2),
        3: 'failed'
      }
    };
  },
  filters: {
    state: startupStateFilter
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
    background: #ffeaea;
    color: #d80000;
  }
  &.state-waiting {
    background: #e2fff0;
    color: #3ac47d;
  }
}
</style>
