<script>
import { getStartupDetail } from '@/services';

export default {
  components: {
    CopyableAddress: {
      functional: true,
      props: {
        address: String
      },
      render(h, context) {
        return (
          <div class="flex-inline ai-center">
            <a>{context.address}</a>
            <a-icon type="copy" style="margin-left:50px;font-size:12px" />
          </div>
        );
      }
    }
  },
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
            { label: 'Type', value: 'name' },
            { label: 'Mission', value: 'name' },
            { label: 'Create Time', value: 'name' },
            { label: 'Description', value: 'name' },
            { label: 'BlockChain Address', value: 'name', copyable: true }
          ]
        },
        {
          icon: require('./images/token.png'),
          title: 'Token',
          fields: [
            { label: 'Token Name', value: 'name' },
            { label: 'Token Symbol', value: 'name' },
            { label: 'Token Contract', value: 'name', copyable: true },
            { label: 'Wallet Name 1', value: 'name', copyable: true }
          ]
        },
        {
          icon: require('./images/governance.png'),
          title: 'Governance',
          fields: [
            { label: 'Governance', value: 'name' },
            { label: 'Assign Address', value: 'name', copyable: true },
            { label: 'Vote', value: 'name' }
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
                {fields.map(field => (
                  <div class="info-tr flex ai-center">
                    <label class="t-bold">{field.label}</label>
                    <p class="mb-0 t-grey">
                      {field.copyable ? <CopyableAddress address={field.value} /> : field.value}
                    </p>
                  </div>
                ))}
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
  height: 44px;
  & + .info-tr {
    border-top: 1px solid @border-color-light;
  }
  > label {
    padding-right: 32px;
    width: 244px;
    text-align: right;
    &::after {
      content: ':';
    }
  }
  > p {
    display: flex;
  }
}
</style>
