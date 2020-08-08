<script>
import TabFinance from './setting-details/Finance';

export default {
  components: {
    TabFinance,
    TabGoverance: () => import('./setting-details/Goverance')
  },

  data() {
    return {
      selectedTab: 'Finance',
      tabs: ['Finance', 'Goverance']
    };
  },

  render(h) {
    const TabComponent = 'Tab' + this.selectedTab;
    return (
      <div class="flex">
        <a-card class="mr-20 bounty-menus">
          <a-tabs vModel={this.selectedTab} tab-position="left">
            {this.tabs.map(tab => (
              <a-tab-pane key={tab} tab={tab}></a-tab-pane>
            ))}
          </a-tabs>
        </a-card>
        <TabComponent class="flex-1" id={this.$route.query.startupId}></TabComponent>
      </div>
    );
  }
};
</script>
<style lang="less" scoped>
.bounty-menus {
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
