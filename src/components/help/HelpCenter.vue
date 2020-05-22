<template>
  <a-card title="Help Center" :headStyle="{ fontSize: '18px' }">
    <ol>
      <li v-for="n in 5" :key="n">
        <a href="/">What is the Comunion?What is the Comunion?What is the Comunion?</a>
      </li>
    </ol>
  </a-card>
</template>

<script>
export default {};
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
