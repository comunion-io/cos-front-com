<template>
  <div class="main-card card">
    <b class="card-header">Help Center</b>
    <div class="card-body">
      <ol>
        <li v-for="n in 5" :key="n">
          <a href="/">What is the Comunion?What is the Comunion?What is the Comunion?</a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-body ol {
  padding-left: 1em;
  list-style-type: decimal;
  color: #999;
  li {
    margin-bottom: 12px;
    a {
      color: #999;
    }
  }
}
</style>
