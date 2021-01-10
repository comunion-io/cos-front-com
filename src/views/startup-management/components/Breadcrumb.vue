<script>
import { Icon, Breadcrumb } from 'ant-design-vue';

const BreadcrumbItem = Breadcrumb.Item;

export default {
  props: {
    startupName: {
      type: String,
      required: true
    }
  },
  computed: {
    items() {
      return this.$route.matched.slice(2).map(matched => {
        return {
          label: matched.meta.title?.replace('Start-Up Management ', ''),
          routeName: matched.name
        };
      });
    }
  },
  render(h) {
    const { items } = this;
    return (
      <Breadcrumb class="startup-management-breadcrumb">
        <BreadcrumbItem>
          <Icon type="environment" theme="filled" class="t-primary" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <router-link
            class=".startup-management-breadcrumb_name t-trunc"
            to={{ name: 'startupManagement', id: this.$route.params.id }}
          >
            {this.startupName}
          </router-link>
        </BreadcrumbItem>
        {items.map(item => (
          <BreadcrumbItem key={item.name}>
            <router-link to={{ name: item.routeName, id: this.$route.params.id }}>
              {item.label}
            </router-link>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    );
  }
};
</script>

<style lang="less">
.startup-management-breadcrumb {
  display: flex;
  align-items: center;
  margin: -24px -24px 24px;
  padding: 0 32px;
  height: 54px;
  background: #fcfcfc;
  &_name {
    max-width: 120px;
  }
}
</style>
