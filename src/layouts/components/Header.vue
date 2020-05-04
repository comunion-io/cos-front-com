<template>
  <div class="app-header header-shadow">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="" />
    </div>
    <div class="menu">
      <MegaMenu />
    </div>

    <div class="actions">
      <!-- create startup -->
      <div class="new-start-up-btn">
        <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success">
          <font-awesome-icon class="mr-2" icon="plus" />
          <router-link to="/newStartUp">New Startup</router-link>
        </button>
      </div>
      <!--&lt;!&ndash; 用户信息 &ndash;&gt;-->
      <!--<div class="user-info">-->
      <!--  <HeaderConnect v-if="!isMetaMaskConnected"/>-->
      <!--  <UserArea v-else/>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import MegaMenu from './MegaMenu';
// import UserArea from './Header/HeaderUserArea';
// import HeaderConnect from './Header/HeaderConnect';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';

library.add(faEllipsisV);
export default {
  name: 'Header',
  components: {
    MegaMenu,
    // UserArea,
    // HeaderConnect,
    'font-awesome-icon': FontAwesomeIcon
  },
  computed: {
    ...mapGetters(['isMetaMaskConnected'])
  },

  data() {
    return {
      isOpen: false,
      isOpenMobileMenu: false
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.app-header {
  padding-left: 180px;
  padding-right: 180px;

  .logo {
  }

  .menu {
  }

  .actions {
  }
}
</style>
