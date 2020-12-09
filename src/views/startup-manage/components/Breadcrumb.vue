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
  render(h) {
    const { startupName } = this;
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <Icon type="environment" theme="filled" class="t-primary" />
        </BreadcrumbItem>
        <BreadcrumbItem href="/">{startupName}</BreadcrumbItem>
      </Breadcrumb>
    );
  }
};
</script>

<style></style>
