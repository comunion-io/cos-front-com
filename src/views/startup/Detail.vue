<script>
import Breadcrumb from './components/Breadcrumb';
import services from '@/services';
const tabs = ['Preference', 'Bounty', 'DISCO', 'Swap', 'Governance'].map(item => {
  return {
    name: item,
    route: `startupDetail${item}`
  };
});
export default {
  data() {
    return {
      loading: false,
      startup: {}
    };
  },
  computed: {
    selectedTab: {
      get() {
        return this.$route.name;
      },
      set(v) {
        this.$router.push({ name: v, params: { id: this.$route.params.id } });
      }
    }
  },
  async mounted() {
    const tab = this.$route.query.tab;
    if (tab && tabs.find(tab => tab.name === tab)) {
      this.selectedTab = tab;
    }
    this.loading = true;
    const { error, data } = await services['cores@startup-获取'](
      {
        startupId: this.$route.params.id
      },
      { keepWhenNavigate: true }
    );
    this.startup = error ? {} : data;
    this.loading = false;
  },
  render(h) {
    return (
      <div class="flex" style="padding: 16px 50px">
        <a-card title="Menu" class="mr-20 startup-menus">
          <a-tabs vModel={this.selectedTab} tab-position="left">
            {tabs.map(tab => (
              <a-tab-pane key={tab.route} tab={tab.name}></a-tab-pane>
            ))}
          </a-tabs>
        </a-card>
        {this.loading ? (
          <loading />
        ) : (
          <a-card class="flex-1">
            {this.selectedTab !== 'startupDetailPreference' && (
              <Breadcrumb startupName={this.startup.name} />
            )}
            <router-view id={this.$route.params.id} startup={this.startup} />
          </a-card>
        )}
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
