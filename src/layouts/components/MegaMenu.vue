<template>
  <div class="header-megamenu">
    <HeaderUserArea v-if="isLoggedIn" />
    <HeaderConnect v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderConnect from '@/layouts/components/HeaderConnect';
import HeaderUserArea from '@/layouts/components/HeaderUserArea';

export default {
  components: {
    HeaderConnect,
    HeaderUserArea
  },
  name: 'MegaMenu',
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
