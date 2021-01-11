<template>
  <a-badge
    :color="color"
    :text="text"
    :style="`color: ${color};`"
    class="c-badge-container"
  ></a-badge>
</template>

<script>
export default {
  props: {
    color: String,
    text: String
  }
};
</script>

<style lang="less">
.c-badge-container {
  display: inline-flex;
  align-items: center;

  .ant-badge-status-dot {
    top: 0;
    vertical-align: unset;
  }

  .ant-badge-status-text {
    flex: 1;
    min-width: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
  }
}
</style>
