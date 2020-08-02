<template>
  <div id="startup-manage">
    <a-card id="start-manage" :bordered="false" style="margin-bottom: 24px;">
      <h1 class="title">Startup Manage</h1>
      <section class="content">
        <a-tabs v-model="activeTab">
          <a-tab-pane key="1" tab="Perference">
            <StartupManagePerference></StartupManagePerference>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Settings">
            <StartupSetting></StartupSetting>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Bounty">
            <StartupBounty :startupId="startupId"></StartupBounty>
          </a-tab-pane>
          <a-tab-pane key="4" tab="Team" disabled> </a-tab-pane>
          <a-tab-pane key="5" tab="Operation" disabled> </a-tab-pane>
          <a-tab-pane key="6" tab="Fundrais" disabled> </a-tab-pane>
        </a-tabs>
      </section>
    </a-card>
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
      activeTab: '1',
      startupId: this.$route.query.startupId
    };
  },

  methods: {},
  mounted() {
    const tab = this.$route.query.tab;
    if (tab === 'bounty') {
      this.activeTab = '3';
    }
  }
};
</script>
<style lang="less" scoped>
#startup-manage {
  .title {
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 24px;
    text-align: center;
  }

  .content {
    margin: 0 auto;
    width: 80%;
    max-width: 850px;
    min-width: 240px;
  }
}
</style>
