<script>
import { mapGetters } from 'vuex';
import Descriptions from '@/components/display/Descriptions';
import {
  getStartupDetail,
  followStartup,
  cancelFollowStartup,
  getStartupIsFollowed
} from '@/services';

export default {
  props: {
    // startup id
    id: String
  },
  data() {
    return {
      defaultLogo: require('@/assets/images/file@2x.png'),
      loading: false,
      startup: {},
      followCount: 0, // follow数量
      followBtnLoading: false, // follow按钮loading状态
      isFollowed: false // 是否followed
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    // 模块
    modules() {
      // 投票地址过多，展示为可点击
      let voteAssignAddr;
      if (this.startup.settings?.voteAssignAddrs?.length) {
        const addrs = this.startup.settings.voteAssignAddrs;
        voteAssignAddr = addrs.slice(0, 2).map((addr, index) => {
          return {
            label: index === 0 ? 'Assign Address' : '',
            value: `settings.voteAssignAddrs[${index}]`,
            copyable: true
          };
        });
        if (addrs.length > 2) {
          voteAssignAddr.push({
            render: () => (
              <a class="t-grey" onClick={this.showAllVoteAssignAddrs}>
                View more (In total {addrs.length})
              </a>
            )
          });
        }
      }
      return [
        {
          icon: require('./images/startup.png'),
          title: 'Startup',
          fields: [
            { label: 'Name', value: 'name' },
            { label: 'Type', value: 'category.name' },
            { label: 'Mission', value: 'mission' },
            { label: 'Create Time', value: 'name' },
            {
              label: 'Description',
              value: 'descriptionAddr',
              render: v => (
                <a href={v} target="_black">
                  {v}
                </a>
              )
            },
            { label: 'BlockChain Address', value: 'transaction.blockAddr', copyable: true }
          ]
        },
        {
          icon: require('./images/token.png'),
          title: 'Token',
          fields: [
            { label: 'Token Name', value: 'settings.tokenName' },
            { label: 'Token Symbol', value: 'settings.tokenSymbol' },
            { label: 'Token Contract', value: 'settings.tokenAddr', copyable: true },
            ...(this.startup.settings?.walletAddrs?.map((addr, index) => ({
              label: addr.name,
              value: `settings.walletAddrs[${index}].addr`,
              copyable: true
            })) || [])
          ]
        },
        {
          icon: require('./images/governance.png'),
          title: 'Governance',
          fields: [
            { label: 'Governance', value: 'settings.type' },
            ...(voteAssignAddr || []),
            {
              label: 'Vote',
              value: 'settings.voteSupportPercent',
              prefix: 'Support: ',
              suffix: '%'
            },
            {
              value: 'settings.voteMinApprovalPercent',
              prefix: 'Minimum Approval: ',
              suffix: '%'
            },
            {
              value: 'settings.voteMinDurationHours',
              prefix: 'MinDuration: ',
              suffix: 'Days'
            },
            {
              value: 'settings.voteMaxDurationHours',
              prefix: 'MaxDuration: ',
              suffix: 'Days'
            }
          ]
        },
        {
          icon: require('./images/team.png'),
          title: (
            <span>
              Teamnumber: <span class="t-primary f-16">2</span>
            </span>
          ),
          fields: []
        }
      ];
    },
    // follow按钮文字
    btnText() {
      let text = this.isFollowed ? 'Followed' : 'Follow';
      if (this.followCount > 0) {
        text = `${this.followCount}+ ${text}`;
      }
      return text;
    }
  },
  created() {
    // 判断是否登录
    if (this.isLoggedIn) {
      // 获取startup是否被follow
      this.getStartupIsFollowed();
    }
    // 获取startup详情
    this.getStartupDetail();
  },
  methods: {
    // 显示所有的投票地址
    showAllVoteAssignAddrs() {
      this.$info({
        icon: 'none',
        title: 'AssignAddress',
        width: 600,
        maskClosable: true,
        content: h => {
          const addrs = this.startup.settings.voteAssignAddrs;
          return (
            <div style="margin-left:-38px">
              <p class="f-15">
                In total <span class="t-primary">{addrs.length}</span>
              </p>
              <a-table
                showHeader={false}
                row-key="index"
                columns={[
                  {
                    align: 'center',
                    dataIndex: 'addr',
                    render: text => <CopyableAddress address={text} />
                  }
                ]}
                dataSource={addrs.map((addr, index) => ({ addr, index }))}
                pagination={{ position: 'bottom', hideOnSinglePage: true }}
              />
            </div>
          );
        }
      });
    },
    // follow按钮被点击
    async followBtnOnClick() {
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'guide', params: { from: this.$route.fullPath } });
        return;
      }
      this.followBtnLoading = true;
      let requestSuccess;
      // 判断是否已经followed
      if (this.isFollowed) {
        requestSuccess = await cancelFollowStartup(this.id);
        if (requestSuccess) {
          requestSuccess && this.followCount--;
          this.isFollowed = false;
        }
      } else {
        requestSuccess = await followStartup(this.id);
        if (requestSuccess) {
          requestSuccess && this.followCount++;
          this.isFollowed = true;
        }
      }
      this.followBtnLoading = false;
    },
    // 获取startup详情数据
    async getStartupDetail() {
      this.loading = true;
      this.startup = await getStartupDetail(this.id);
      this.followCount = this.startup.followCount;
      this.loading = false;
    },
    // 获取startup是否被followed
    async getStartupIsFollowed() {
      this.isFollowed = await getStartupIsFollowed(this.id);
    }
  },
  render(h) {
    const { startup, defaultLogo, modules } = this;
    return (
      <a-card loading={this.loading}>
        <div class="flex" style="margin-bottom: 44px;">
          <a-avatar
            src={startup.logo || defaultLogo}
            alt="logo"
            width="46"
            height="46"
            class="no-shrink"
          />
          <div class="flex-1 mx-24">
            <h3 class="mb-0 lh-1 t-bold t-break t-trunc" title={startup.name}>
              {startup.name}
            </h3>
            <p class="mt-16 mb-0 t-break t-grey">{startup.mission}</p>
          </div>
          <a-button
            type="primary"
            // size="large"
            class={`${this.isFollowed ? 'followed' : ''} ml-auto`}
            onClick={this.followBtnOnClick}
            loading={this.followBtnLoading}
          >
            {this.btnText}
          </a-button>
        </div>
        {modules.map(_module => {
          const { title, icon, fields } = _module;
          return (
            <div class="mb-32">
              <div class="flex ai-end mb-16">
                <img src={icon} alt="icon" height="18" />
                <span class="ml-8 t-bold f-18 lh-1">{title}</span>
              </div>
              <Descriptions columns={fields} dataSource={this.startup} />
            </div>
          );
        })}
      </a-card>
    );
  }
};
</script>

<style lang="less" scoped>
.followed {
  background-color: gray;
}
</style>
