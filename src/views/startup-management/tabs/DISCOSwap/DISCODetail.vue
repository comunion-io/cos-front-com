<template>
  <disco-detail :id="$route.params.id" no-btn> </disco-detail>
</template>

<script>
import DiscoDetail from '@/components/disco-detail';
export default {
  components: {
    DiscoDetail
  }
};
</script>

<style></style>
