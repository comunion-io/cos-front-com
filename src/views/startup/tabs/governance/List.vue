<template>
  <div>
    <router-link :to="{ name: 'proposalDetail', params: { id: id, proposalId: '123' } }"
      >Detail</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    id: String
  }
};
</script>

<style></style>
