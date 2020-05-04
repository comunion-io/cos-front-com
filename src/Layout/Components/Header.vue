<template>
  <div :class="headerbg" class="app-header header-shadow">
    <div class="logo-src"/>
    <div class="app-header__content">
      <div class="app-header-left">
        <!--<SearchBox/>-->
        <MegaMenu/>
      </div>
      <div class="app-header-right">
        <!-- create startup -->
        <div class="page-title-actions">
          <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success">
            <font-awesome-icon class="mr-2" icon="plus"/>
            <router-link to="/newStartUp">New Startup</router-link>
          </button>
        </div>

        <div class="user-info">
          <HeaderConnect v-if="!isMetaMaskConnected"/>
          <UserArea v-else/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import MegaMenu from './Header/MegaMenu';
import UserArea from './Header/HeaderUserArea';
import HeaderConnect from './Header/HeaderConnect';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {mapGetters} from 'vuex';

library.add(
  faEllipsisV,
);
export default {
  name: "Header",
  components: {
    MegaMenu,
    UserArea,
    HeaderConnect,
    'font-awesome-icon': FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['isMetaMaskConnected']),
  },

  data() {
    return {
      isOpen: false,
      isOpenMobileMenu: false,
    }
  },
  methods: {}
};
</script>
