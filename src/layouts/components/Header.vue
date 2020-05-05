<template>
  <div class="app-header header-shadow">
    <div class="logo">
      <img src="@/assets/images/logo@2x.png" alt="" />
    </div>
    <div class="menu">
      <MegaMenu />
    </div>

    <div class="actions">
      <!-- create startup -->
      <div class="new-start-up-btn">
        <button type="button">
          <img src="@/assets/images/plus@2x.png" alt="" />
          <router-link class="new-up" to="/newStartUp">New Startup</router-link>
        </button>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <HeaderConnect v-if="!isMetaMaskConnected" />
        <div v-else>
          <UserArea />
          <!-- 设置 -->
          <div class="setting" @click="setting">
            <img src="@/assets/images/setting@2x.png" alt="" />
          </div>
          <!-- 通知 -->
          <div class="notification" @click="notification">
            <img src="@/assets/images/notification@2x.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MegaMenu from './MegaMenu';
import UserArea from './HeaderUserArea';
import HeaderConnect from './HeaderConnect';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { mapGetters } from 'vuex';

library.add(faEllipsisV);
export default {
  name: 'Header',
  components: {
    MegaMenu,
    UserArea,
    HeaderConnect
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
  methods: {
    /**
     * @description 设置
     */
    setting() {
      console.log('设置');
    },

    /**
     * @description 系统消息通知
     */
    notification() {
      console.log('消息通知');
    }
  }
};
</script>
<style scoped lang="scss">
.app-header {
  padding-left: 180px;
  padding-right: 180px;
  height: 40px;

  .logo {
    margin-right: 16px;
    width: 65px;
    height: 19px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    flex: 1;
  }

  .actions {
    display: flex;
    align-items: center;

    .user-info {
      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        .setting {
          margin-left: 22px;
          margin-right: 6px;
        }

        .setting,
        .notification {
          width: 19px;
          height: 19px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .new-start-up-btn {
      width: 100px;
      height: 19px;
      background: #3ac47d;
      border-radius: 2px;
      text-align: center;
      margin-right: 7px;

      img {
        height: 5px;
        width: 5px;
        margin-right: 5px;
      }
      .new-up {
        width: 44px;
        height: 8px;
        font-size: 8px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }

      button a {
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
