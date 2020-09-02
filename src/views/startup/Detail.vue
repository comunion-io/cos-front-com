<script>
import TabPerference from './details/Perference';
export default {
  components: {
    TabPerference,
    TabBounty: () => import('./details/Bounty'),
    TabExchange: () => import('./details/Exchange'),
    TabIRO: () => import('./details/IRO'),
    TabVote: () => import('./details/Vote'),
    TabProposals: () => import('./details/Proposals')
  },
  data() {
    return {
      selectedTab: 'Perference',
      tabs: ['Perference', 'Bounty', 'Exchange', 'IRO', 'Vote', 'Proposals']
    };
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
        <TabComponent class="flex-1" id={this.$route.params.id} />
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
