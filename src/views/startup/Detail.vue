<script>
import TabPreference from './details/Preference';
import StartupInfo from './details/blocks/StartupInfo';
import services from '@/services';
export default {
  components: {
    TabPreference,
    TabBounty: () => import('./details/Bounty'),
    TabDISCO: () => import('./details/DISCO.vue'),
    TabSwap: () => import('./details/Swap/index.vue'),
    TabGovernance: () => import('./details/Governance')
  },
  data() {
    return {
      selectedTab: 'Preference',
      tabs: ['Preference', 'Bounty', 'DISCO', 'Swap', 'Governance'],
      loading: false,
      startup: {}
    };
  },
  methods: {
    // 获取startup详情数据
    async getStartupDetail() {
      this.loading = true;
      const { error, data } = await services['cores@startup-获取']({
        startupId: this.$route.params.id
      });
      this.startup = error ? {} : data;
      this.loading = false;
    }
  },
  mounted() {
    if (this.$route.query?.tabName) {
      this.selectedTab = this.$route.query.tabName;
    }
    this.getStartupDetail();
  },
  render(h) {
    const TabComponent = 'Tab' + this.selectedTab;
    return (
      <div class="flex" style="padding: 16px 50px">
        <a-card title="Menu" class="mr-20 startup-menus">
          <a-tabs vModel={this.selectedTab} tab-position="left">
            {this.tabs.map(tab => (
              <a-tab-pane key={tab} tab={tab}></a-tab-pane>
            ))}
          </a-tabs>
        </a-card>
        <a-card class="flex-1">
          <StartupInfo id={this.$route.params.id} startup={this.startup} />
          <TabComponent id={this.$route.params.id} startup={this.startup} />
        </a-card>
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.startup-menus {
  flex-shrink: 0;
  width: 200px;
  /deep/ .ant-tabs-left-bar {
    border-right: none;
  }
  /deep/ .ant-tabs-tab {
    margin-bottom: 14px;
    padding-left: 6px;
    text-align: left;
  }
  /deep/ .ant-tabs-ink-bar {
    display: none !important;
  }
}
</style>
