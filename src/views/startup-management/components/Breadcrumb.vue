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
      return this.$route.matched.slice(2).reduce(
        (arr, matched) => {
          arr.push({
            label: matched.meta.title?.replace('Start-Up Management ', ''),
            routeName: matched.name
          });
          return arr;
        },
        [{ label: this.startupName, routeName: 'startupManagement' }]
      );
    }
  },
  render(h) {
    const { items } = this;
    return (
      <Breadcrumb class="startup-management-breadcrumb">
        <BreadcrumbItem>
          <Icon type="environment" theme="filled" class="t-primary" />
        </BreadcrumbItem>
        {items.map(item => (
          <BreadcrumbItem>
            <route-link to={{ name: item.routeName, id: this.$route.params.id }}>
              {item.label}
            </route-link>
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
}
</style>
