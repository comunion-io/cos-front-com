<script>
import { isString } from '@/utils';
import Breadcrumb from './components/Breadcrumb';
import services from '@/services';

const tabs = [
  'Preference',
  'Settings',
  'Bounty',
  'Team',
  'Governance',
  { name: 'DISCO & Swap', route: 'DISCOSwap' }
].map(item => {
  const _isString = isString(item);
  return {
    name: _isString ? item : item.name,
    route: `startupManagement${_isString ? item : item.route}`
  };
});

export default {
  data() {
    return {
      loading: true,
      startupDetail: {}
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
    const { error, data } = await services['cores@startup-我的-获取']({
      startupId: this.$route.params.id
    });
    this.loading = false;
    if (!error) {
      this.startupDetail = data;
    }
  },
  render(h) {
    return (
      <div class="flex" style="padding: 16px 50px">
        <a-card title="Start-Up Management" class="mr-20 side-menus">
          <a-tabs vModel={this.selectedTab} tab-position="left">
            {tabs.map(tab => (
              <a-tab-pane key={tab.route} tab={tab.name} />
            ))}
          </a-tabs>
        </a-card>
        {this.loading ? (
          <loading />
        ) : (
          <a-card class="flex-1">
            <Breadcrumb startupName={this.startupDetail.name} />
            <router-view id={this.$route.params.id} startup={this.startupDetail} />
          </a-card>
        )}
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
