<template>
  <div class="d-flex">
    <div>
      <div class="widget-content p-0">
        <div class="widget-content-wrapper">
          <div class="widget-content-left">
            <div class="widget-content-left">
              <b-dropdown
                toggle-class="p-0 mr-2"
                menu-class="dropdown-menu-lg"
                variant="link"
                no-caret
                right
              >
                <!-- 按钮内容 -->
                <div class="dropdown-btn" slot="button-content">
                  <div class="icon-wrapper icon-wrapper-alt rounded">
                    <img
                      width="19"
                      class="rounded-circle"
                      src="@/assets/images/avatars/1.jpg"
                      alt=""
                    />
                  </div>
                  <div class="content">
                    <div class="widget-heading">Alina Mclourd</div>
                    <div class="widget-subheading">connected to Mainnet</div>
                  </div>
                </div>
                <!-- 下拉内容 -->
                <div class="dropdown-content">
                  <div class="metamask">
                    <div class="logo">
                      <img src="@/assets/images/metamask@2x.png" alt="" />
                    </div>
                    <div class="content" v-if="isMetaMaskConnected">
                      <span>
                        CONNECTED TO ETHEREUM MAINNET NETWORK
                      </span>
                      <span>
                        <a-button variant="light" @click="disConnectWallet">
                          Disconnect Wallet
                        </a-button>
                      </span>
                    </div>
                    <div class="content" v-else>
                      <span>
                        X DISCONNECT TO ETHEREUM NETWORK
                      </span>
                      <span>
                        <a-button variant="light" @click="connectWallet">
                          Connect Wallet
                        </a-button>
                      </span>
                    </div>
                  </div>

                  <div class="userInfo" v-if="isMetaMaskConnected">
                    <div class="log">
                      <img
                        width="42"
                        class="rounded-circle"
                        src="@/assets/images/avatars/1.jpg"
                        alt=""
                      />
                    </div>
                    <div class="content">
                      <span>
                        name
                      </span>
                      <span>
                        Hunt bounty with your
                      </span>
                      <span>
                        <a-button variant="primary" @click="transformHunter"
                          >Transform Hunter</a-button
                        >
                      </span>
                    </div>
                  </div>
                </div>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['isMetaMaskConnected'])
  },

  methods: {
    /**
     * @description 断开钱包链接
     */
    disConnectWallet() {
      console.log('断开钱包链接');
    },

    /**
     * @description 发布hunter
     */
    transformHunter() {
      console.log('发布hunter');
    },

    /**
     * @description 连接钱包
     */
    connectWallet() {
      this.$store.commit('connectWallet');
    }
  }
};
</script>

<style scoped lang="less">
.dropdown-btn {
  display: flex;
  align-items: center;
  flex-direction: row;
  .icon-wrapper {
    height: unset;
    width: unset;
    margin-right: 7px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .widget-heading {
      font-size: 7px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .widget-subheading {
      font-size: 7px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(187, 188, 200, 1);
    }
  }
}

.dropdown-content {
  .metamask {
    display: flex;
    flex-direction: row;
    .content {
      margin-top: 40px;
      margin-left: -120px;
    }
  }

  .userInfo {
    display: flex;
    flex-direction: row;
    .content {
      display: flex;
      flex-direction: column;
      span {
        display: inline-block;
      }
    }
  }
}
</style>
