<script>
import TabHunter from './components/Hunter';
export default {
  name: 'hunter-manage',
  components: {
    TabHunter,
    TabBounty: () => import('./components/Bounty'),
    TabProposal: () => import('./components/Proposal')
  },
  data() {
    return {
      activeTab: 'Hunter',
      tabs: ['Hunter', 'Bounty', 'Proposal']
    };
  },
  render(h) {
    const TabComponent = `Tab${this.activeTab}`;
    return (
      <div class="flex" style="padding: 16px 50px">
        <a-card title="Hunter Management" class="mr-20 hunter-menus">
          <a-tabs vModel={this.activeTab} tab-position="left">
            {this.tabs.map(tab => (
              <a-tab-pane key={tab} tab={tab} />
            ))}
          </a-tabs>
        </a-card>
        <a-card class="flex-1">
          <TabComponent />
        </a-card>
      </div>
    );
  }
};
</script>

<style scoped lang="less">
.hunter-menus {
  flex-shrink: 0;
  width: 220px;
  align-self: flex-start;
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
