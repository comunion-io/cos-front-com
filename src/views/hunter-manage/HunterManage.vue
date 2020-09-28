<template>
  <div class="hunter-manage">
    <h1 class="title">Hunter Management</h1>
    <div class="content mb-24">
      <div class="tabs flex ai-center jc-around">
        <div
          class="tab flex ai-center jc-center f-18 t-bold"
          :class="{ active: activeTab === tab.name }"
          v-for="tab in tabs"
          :key="tab.name"
          @click="tabOnChange(tab.name)"
        >
          {{ tab.name }}
        </div>
      </div>

      <Hunter v-if="activeTab === 'Hunter'" />
      <Bounty v-else-if="activeTab === 'Bounty'" />
    </div>
  </div>
</template>

<script>
import Bounty from '@/views/hunter-manage/components/Bounty';
import Hunter from '@/views/hunter-manage/components/Hunter';
export default {
  name: 'hunter-manage',
  components: { Hunter, Bounty },
  data() {
    return {
      activeTab: 'Hunter',
      tabs: [{ name: 'Hunter' }, { name: 'Bounty' }, { name: 'Proposal' }]
    };
  },
  computed: {},
  methods: {
    // tab改变
    tabOnChange(tab) {
      this.activeTab = tab;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.hunter-manage {
  .title {
    font-size: 24px;
    line-height: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin: 30px 0 48px;
    text-align: center;
  }

  .content {
    background-color: #fff;
    box-shadow: 0px 2px 4px 0px rgba(6, 0, 1, 0.04);
    border-radius: 4px;

    .tabs {
      height: 70px;
      position: relative;
      padding: 0 30px;

      &:after {
        content: '';
        position: absolute;
        left: 30px;
        right: 30px;
        bottom: 0;
        border-bottom: 1px solid #bfbfbf;
      }
      .tab {
        color: #000;
        cursor: pointer;
        height: 100%;
        position: relative;
        padding: 0 32px;

        &:hover,
        &.active {
          &:after {
            content: '';
            position: absolute;
            height: 5px;
            left: 0;
            right: 0;
            bottom: -2px;
            border-radius: 3px;
            background-color: #6170ff;
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>
