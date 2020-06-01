<template>
  <div class="header-megamenu">
    <div v-if="isLoggedIn">
      <HeaderUserArea />
    </div>

    <div v-else>
      <HeaderConnect />
    </div>
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
