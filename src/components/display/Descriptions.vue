<script>
import { get } from 'lodash';
export default {
  props: {
    columns: {
      type: Array
    },
    dataSource: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: Number,
      default: 244
    }
  },
  render(h) {
    const { columns, dataSource, labelWidth } = this;
    return (
      <div class="info-table f-15">
        {columns.map(column => {
          const value = get(dataSource, column.value, '');
          return (
            <div class="info-tr flex">
              <label class="t-bold no-shrink" style={{ width: `${labelWidth}px` }}>
                {column.label ? `${column.label}:` : ''}
              </label>
              <p class="mb-0 t-grey">
                {column.prefix}
                {/** 可复制的 */}
                {column.copyable ? (
                  <CopyableAddress address={value} />
                ) : column.render ? (
                  column.render(value, dataSource)
                ) : (
                  value
                )}
                {column.suffix}
              </p>
            </div>
          );
        })}
      </div>
    );
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
    text-align: right;
  }
  > p {
    display: flex;
    word-break: break-all;
  }
}
</style>
