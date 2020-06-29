<template>
  <div class="user-area">
    <a-popover placement="bottom">
      <template slot="content">
        <div class="connected">
          <img src="@/assets/images/metamask@2x.png" alt="" />
          <div class="description">
            <img src="@/assets/images/check@2x.png" alt="" />
            <span>
              CONNECTED TO ETHEREUM
              <span style="color: rgba(58, 196, 125, 1);">{{ netWorkName.toUpperCase() }}</span>
              NETWORK
            </span>
          </div>
          <div class="connect-btn" @click="disConnectWallet">
            <a-button>Disconnect Wallet</a-button>
          </div>
          <a-divider></a-divider>
          <div class="show-user-info">
            <a-avatar :src="user.avatar" />
            <span class="account">{{ account }}</span>
            <div class="description">
              <span>Hunt bounty with skill，change the life .</span>
            </div>
            <a-button class="transform-btn" type="primary" @click="transformHunter">
              Transform Hunter
            </a-button>
          </div>
        </div>
      </template>
      <div class="user-info flex ai-center">
        <a-avatar class="mr-12" :src="user.avatar" />
        <div class="flex-column">
          <span class="t-trunc">{{ lessAccount }}</span>
          <span class="network">Connected to {{ netWorkName }}</span>
        </div>
      </div>
    </a-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderUserArea',
  computed: {
    ...mapGetters(['isLoggedIn', 'user', 'account', 'netWorkName']),
    // 把账户名处理成只保留前后四位，中间省略号
    lessAccount() {
      let account = this.account;
      if (account && account.length > 0) {
        account = `${account.substr(0, 10)}...${account.substr(-4)}`;
      }
      return account;
    }
  },
  methods: {
    /**
     * @description 断开钱包链接
     */
    disConnectWallet() {
      this.$store.dispatch('logout');
    },
    /**
     * @description 发布hunter
     */
    transformHunter() {
      alert('working');
      console.log('发布hunter');
    }
  }
};
</script>

<style scoped lang="less">
.user-area {
  margin-left: 20px;
  cursor: pointer;
  .user-info {
    & > div {
      & > span {
        &:first-child {
          max-width: 140px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        &:last-child {
          font-weight: 400;
          color: rgba(58, 196, 125, 1);
        }
      }
    }
  }
}

.disconnected {
  .description {
    margin-top: 29px;
    font-weight: 400;
    color: rgba(216, 0, 0, 1);
    font-size: 7px;

    img {
      width: 10px;
      height: 10px;
      margin-left: 15px;
    }

    span {
      margin-left: 10px;
    }
  }

  .connect-btn {
    margin-top: 20px;
    margin-left: 32px;
  }
}

.connected {
  .description {
    margin-top: 15px;
    font-weight: 400;
    color: rgba(205, 205, 205, 1);
    font-size: 7px;

    img {
      width: 10px;
      height: 10px;
      margin-left: 15px;
    }

    span {
      margin-left: 10px;
    }
  }

  .connect-btn {
    margin-top: 20px;
    margin-left: 32px;
  }

  .show-user-info {
    .account {
      margin-left: 5px;
    }
    .description {
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      font-size: 7px;
      margin-left: 28px;
      margin-top: -2px;
    }
    .transform-btn {
      margin-top: 4px;
      margin-left: 38px;
    }
  }
}
</style>
