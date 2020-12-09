<script>
import { isString } from '@/utils';
import Breadcrumb from './components/Breadcrumb';
import services from '@/services';

const tabs = [
  'Perference',
  'Settings',
  'Bounty',
  'Team',
  'Operation',
  { name: 'DISCO & Swap', comp: 'DISCOSwap' }
].map(item => {
  if (isString(item)) {
    return { name: item, comp: item };
  }
  return item;
});

export default {
  components: {
    TabPerference: () => import('./components/TabPerference'),
    TabSettings: () => import('./components/TabSettings'),
    TabBounty: () => import('./components/TabBounty'),
    TabTeam: () => 'Team',
    TabOperation: () => 'Operation',
    TabDISCOSwap: () => import('./components/TabDISCOSwap')
  },
  data() {
    return {
      selectedTab: tabs[0].name,
      startupDetail: {}
    };
  },
  async mounted() {
    const tab = this.$route.query.tab;
    if (tab && tabs.find(tab => tab.name === tab)) {
      this.selectedTab = tab;
    }
    const { error, data } = await services['cores@startup-获取']({
      startupId: this.$route.params.id
    });
    if (!error) {
      this.startupDetail = data;
    }
  },
  render(h) {
    const TabComponent = 'Tab' + tabs.find(tab => tab.name === this.selectedTab).comp;
    return (
      <div class="flex" style="padding: 16px 50px">
        <a-card title="Start-Up Management" class="mr-20 side-menus">
          <a-tabs vModel={this.selectedTab} tab-position="left">
            {tabs.map(tab => (
              <a-tab-pane key={tab.name} tab={tab.name}></a-tab-pane>
            ))}
          </a-tabs>
        </a-card>
        <a-card class="flex-1">
          <Breadcrumb startupName={this.startupDetail.name} />
          <TabComponent id={this.$route.params.id} startup={this.startup} />
        </a-card>
      </div>
    );
  }
};
</script>
<style lang="less" scoped>
.side-menus {
  flex-shrink: 0;
  width: 200px;
  align-self: flex-start;
  /deep/ .ant-card-head-title {
    white-space: pre-wrap;
  }
  /deep/ .ant-tabs-left-bar {
    border-right: none;
  }
  /deep/ .ant-tabs-tab {
    margin-bottom: 14px;
    padding-left: 6px;
    text-align: left;
    font-size: 15px;
    &:not(.ant-tabs-tab-active) {
      color: #000;
    }
  }
  /deep/ .ant-tabs-ink-bar {
    display: none !important;
  }
}
</style>
