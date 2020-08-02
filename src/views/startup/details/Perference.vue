<template>
  <a-card>
    <div class="flex ai-center">
      <img :src="startup.logo || defaultLogo" alt="" width="46" height="46" class="no-shrink" />
      <div class="flex-1 ml-24">
        <h3 class="mb-0 lh-1 t-bold t-break t-trunc" :title="startup.name">{{ startup.name }}</h3>
        <p class="mt-16 mb-0 t-break t-trunc-2">{{ startup.mission }}</p>
      </div>
      <a-button type="primary" class="ml-auto">123+ Follow</a-button>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    // startup id
    id: String
  }
};
</script>

<style></style>
