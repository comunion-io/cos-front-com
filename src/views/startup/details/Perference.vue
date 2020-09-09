<script>
import { get } from 'lodash';
import { getStartupDetail, followStartup } from '@/services';

export default {
  props: {
    // startup id
    id: String
  },
  data() {
    return {
      defaultLogo: require('@/assets/images/file@2x.png'),
      startup: {}
    };
  },
  computed: {
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
            customRender: () => (
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
              customRender: v => (
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
    }
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
                    customRender: text => <CopyableAddress address={text} />
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
      let success = await followStartup(this.id);
      if (success) {
        this.getStartupDetail();
      }
    },
    // 获取startup详情数据
    async getStartupDetail() {
      this.startup = await getStartupDetail(this.id);
    }
  },
  render(h) {
    const { startup, defaultLogo, modules } = this;
    return (
      <a-card>
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
            size="large"
            class={`${this.startup.followed ? 'followed' : ''} ml-auto`}
            onClick={this.followBtnOnClick}
          >
            {startup.followCount > 0 ? startup.followCount : ''} Follow
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
              <div class="info-table f-15">
                {fields.map(field => {
                  const value = get(this.startup, field.value, '');
                  return (
                    <div class="info-tr flex ai-center">
                      <label class="t-bold no-shrink">{field.label ? `${field.label}:` : ''}</label>
                      <p class="mb-0 t-grey">
                        {field.prefix}
                        {/** 可复制的 */}
                        {field.copyable ? (
                          <CopyableAddress address={value} />
                        ) : field.customRender ? (
                          field.customRender(value, field)
                        ) : (
                          value
                        )}
                        {field.suffix}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </a-card>
    );
  },
  created() {
    this.getStartupDetail();
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables.less';
.info-table {
  border: 1px solid @border-color-light;
  border-radius: 3px;
}
.info-tr {
  padding: 12px 12px 12px 0;
  & + .info-tr {
    border-top: 1px solid @border-color-light;
  }
  > label {
    padding-right: 32px;
    width: 244px;
    text-align: right;
  }
  > p {
    display: flex;
  }
}

.followed {
  background-color: gray;
}
</style>
