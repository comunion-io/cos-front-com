<script>
import TabPerference from './details/Perference';
import StartupInfo from './details/blocks/StartupInfo';
import { getStartupDetail } from '@/services';
export default {
  components: {
    TabPerference,
    TabBounty: () => import('./details/Bounty'),
    TabExchange: () => import('./details/Exchange'),
    TabDisco: () => import('./details/Dosci.vue'),
    TabIRO: () => import('./details/IRO'),
    TabVote: () => import('./details/Vote'),
    TabProposals: () => import('./details/Proposals')
  },
  data() {
    return {
      selectedTab: 'Perference',
      tabs: ['Perference', 'Bounty', 'Disco', 'Exchange', 'IRO', 'Vote', 'Proposals'],
      loading: false,
      startup: {}
    };
  },
  methods: {
    // 获取startup详情数据
    async getStartupDetail() {
      this.loading = true;
      this.startup = await getStartupDetail(this.$route.params.id);
      this.loading = false;
    }
  },
  mounted() {
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
