<template>
  <a-card title="Help Center" :headStyle="{ fontSize: '18px' }">
    <ol>
      <li v-for="link in links" :key="link.title">
        <a :href="link.url" target="_blank">{{ link.title }}</a>
      </li>
    </ol>
  </a-card>
</template>

<script>
export default {
  props: {
    // 帮助中心的类型 default|setting
    category: {
      type: String,
      default: 'default',
      validator: v => ['default', 'setting'].includes(v)
    }
  },
  data() {
    return {
      links: []
    };
  },
  async created() {
    const links = await import(`./${this.category}.js`);
    this.links = links.default;
  }
};
</script>

<style lang="less" scoped>
ol {
  padding-left: 1em;
  list-style-type: decimal;
  color: #999;
  li {
    margin-bottom: 12px;
    a {
      color: #999;
      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
