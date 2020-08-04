<script>
import { get } from 'lodash';
import { getStartupDetail } from '@/services';

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
            ...this.startup.settings?.walletAddrs?.map((addr, index) => ({
              label: addr.name,
              value: `settings.walletAddrs[${index}].addr`,
              copyable: true
            }))
          ]
        },
        {
          icon: require('./images/governance.png'),
          title: 'Governance',
          fields: [
            { label: 'Governance', value: 'settings.type' },
            // ...this.startup.settings?.voteAssignAddrs?.map(addr => {

            // }),
            // { label: 'Assign Address', value: 'name', copyable: true },
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
          <a-button type="primary" size="large" class="ml-auto">
            123+ Follow
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
  async created() {
    this.startup = await getStartupDetail(this.id);
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
</style>
