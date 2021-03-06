<script>
import CopyableAddress from '@/components/helper/CopyableAddress';
import Descriptions from '@/components/display/Descriptions';
import StartupInfo from './blocks/StartupInfo';
import { governanceTypesMap } from '@/constants';

export default {
  props: {
    // startup id
    id: String,
    startup: Object
  },
  computed: {
    // 模块
    modules() {
      // Governance proposal type
      const governance = this.startup.settings?.proposerType;
      // 投票地址过多，展示为可点击
      let voteAssignAddr;
      // 当Governance选项为pos时
      if (governance === 1) {
        const addrs = this.startup.settings.assignedVoters;
        voteAssignAddr = addrs.slice(0, 2).map((addr, index) => {
          return {
            label: index === 0 ? 'Assign Address' : '',
            value: `settings.assignedVoters[${index}]`,
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
          title: 'Start-Up',
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
          title: 'Opertion Information',
          fields: [
            {
              label: 'Governance',
              value: 'settings.proposerType',
              render: v => governanceTypesMap[v]
            },
            ...(governance === 3
              ? []
              : governance === 1
              ? voteAssignAddr || []
              : [{ label: 'Token Balance', value: 'settings.voterTokenLimit' }]),
            {
              label: 'Vote',
              value: 'settings.proposalSupporters',
              prefix: 'Support: '
              // suffix: '%'
            },
            {
              value: 'settings.proposalMinApprovalPercent',
              prefix: 'Minimum Approval: ',
              suffix: '%'
            },
            {
              value: 'settings.proposalMinDuration',
              prefix: 'MinDuration: ',
              suffix: 'Days'
            },
            {
              value: 'settings.proposalMaxDuration',
              prefix: 'MaxDuration: ',
              suffix: 'Days'
            }
          ]
        }
        // {
        //   icon: require('./images/team.png'),
        //   title: (
        //     <span>
        //       Team Member: <span class="t-primary f-16">2</span>
        //     </span>
        //   ),
        //   fields: []
        // }
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
          const addrs = this.startup.settings.assignedVoters;
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
    }
  },
  render(h) {
    const { modules } = this;
    return (
      <div>
        <StartupInfo id={this.id} startup={this.startup} />
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
      </div>
    );
  }
};
</script>

<style lang="less" scoped></style>
