<template>
  <div class="user-area">
    <a-popover placement="bottom">
      <template slot="content">
        <div v-if="!isMetaMaskConnected" class="disconnected">
          <img src="@/assets/images/metamask@2x.png" alt="" />
          <div class="description">
            <img src="@/assets/images/close@2x.png" alt="" />
            <span>DISCONNECT TO ETHEREUM NETWORK</span>
          </div>
          <div class="connect-btn" @click="connect">
            <a-button>Connect Wallet</a-button>
          </div>
        </div>

        <div v-else class="connected">
          <img src="@/assets/images/metamask@2x.png" alt="" />
          <div class="description">
            <img src="@/assets/images/check@2x.png" alt="" />
            <span>CONNECTED TO ETHEREUM MAINNET NETWORK</span>
          </div>
          <div class="connect-btn" @click="disConnectWallet">
            <a-button>Disconnect Wallet</a-button>
          </div>
          <a-divider></a-divider>
          <div class="show-user-info">
            <a-avatar shape="square" :src="avatar" />
            <span class="account">{{ from }}</span>
            <div class="description">
              <span>Hunt bounty with your skill,change the life.</span>
            </div>
            <a-button class="transform-btn" type="primary" @click="transformHunter">
              Transform Hunter
            </a-button>
          </div>
        </div>
      </template>
      <div class="user-info">
        <a-avatar shape="square" :src="avatar" />
        <div>
          <span>{{ from }}</span>
          <span>Connected to Mainnet</span>
        </div>
      </div>
    </a-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderUserArea',
  components: {},
  data() {
    return {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    };
  },

  computed: {
    ...mapGetters(['isMetaMaskConnected', 'from'])
  },

  methods: {
    /**
     * @description 断开钱包链接
     */
    disConnectWallet() {
      this.$store.commit('updateAccount', []);
    },

    /**
     * @description 发布hunter
     */
    transformHunter() {
      alert('working');
      console.log('发布hunter');
    },

    async connect() {
      const ethereum = window.ethereum;
      if (ethereum) {
        const accounts = await ethereum.enable();
        this.$store.commit('updateAccount', accounts);
      } else {
        window.open('https://metamask.io/');
      }
    }
  }
};
</script>

<style scoped lang="less">
.user-area {
  margin-left: 10px;
  cursor: pointer;
  .user-info {
    display: flex;
    flex-direction: row;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      & > span {
        &:first-child {
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        &:last-child {
          font-weight: 400;
          color: rgba(187, 188, 200, 1);
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
      margin-top: 5px;
    }
    .transform-btn {
      margin-top: 4px;
      margin-left: 38px;
    }
  }
}
</style>
