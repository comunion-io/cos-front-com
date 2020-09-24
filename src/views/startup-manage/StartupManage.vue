<template>
  <div id="startup-manage">
    <div class="title">Startup Management</div>
    <div class="content mb-24">
      <div class="tabs flex ai-center">
        <div
          class="tab flex ai-center jc-center flex-1 f-18 t-bold"
          :class="{ active: activeTab === tab.name }"
          v-for="tab in tabs"
          :key="tab.name"
          @click="tabOnChange(tab.name)"
        >
          {{ tab.name }}
        </div>
      </div>
      <StartupManagePerference
        v-if="activeTab === 'Perference'"
        :startupId="startupId"
      ></StartupManagePerference>
      <StartupSetting v-else-if="activeTab === 'Settings'"></StartupSetting>
      <StartupBounty v-else-if="activeTab === 'Bounty'" :startupId="startupId"></StartupBounty>
    </div>
  </div>
</template>
<script>
import StartupManagePerference from './components/StartupPerference';
import StartupSetting from './components/StartupSettings';
import StartupBounty from './components/StartupBounty';

export default {
  components: { StartupManagePerference, StartupSetting, StartupBounty },
  data() {
    return {
      activeTab: 'Perference',
      startupId: this.$route.query.startupId,
      tabs: [
        { name: 'Perference' },
        { name: 'Settings' },
        { name: 'Bounty' },
        { name: 'Team' },
        { name: 'Operation' },
        { name: 'Fundraising' }
      ]
    };
  },

  methods: {
    // tab改变
    tabOnChange(tab) {
      this.activeTab = tab;
    }
  },
  mounted() {
    const tab = this.$route.query.tab;
    if (tab === 'bounty') {
      this.activeTab = 'Bounty';
    } else {
      this.activeTab = this.tabs[0].name;
    }
  }
};
</script>
<style lang="less" scoped>
#startup-manage {
  padding: 0 50px;

  .title {
    font-size: 24px;
    line-height: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin: 30px 0 42px;
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

        &:hover,
        &.active {
          &:after {
            content: '';
            position: absolute;
            height: 5px;
            left: 17px;
            right: 17px;
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
