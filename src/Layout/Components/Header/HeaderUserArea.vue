<template>
  <div class="d-flex">
    <div class="header-btn-lg pr-0">
      <div class="widget-content p-0">
        <div class="widget-content-wrapper">
          <div class="widget-content-left">
            <div class="widget-content-left">
              <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" no-caret right>
                <!-- 按钮内容 -->
                <div class="dropdown-btn" slot="button-content">
                  <div class="icon-wrapper icon-wrapper-alt rounded">
                    <img width="42" class="rounded-circle" src="@/assets/images/avatars/1.jpg" alt="">
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
                      <img src="@/assets/images/metamask/metamask@2x.png" alt="">
                    </div>
                    <div class="content" v-if="isMetaMaskConnected">
                      <span>
                        CONNECTED TO ETHEREUM MAINNET NETWORK
                      </span>
                      <span>
                          <b-button variant="light" @click="disConnectWallet">
                            Disconnect Wallet
                          </b-button>
                      </span>
                    </div>
                    <div class="content" v-else>
                      <span>
                         X DISCONNECT TO ETHEREUM NETWORK
                      </span>
                      <span>
                          <b-button variant="light" @click="connectWallet">
                            Connect Wallet
                          </b-button>
                      </span>
                    </div>
                  </div>

                  <div class="userInfo" v-if="isMetaMaskConnected">
                    <div class="log">
                      <img width="42" class="rounded-circle" src="@/assets/images/avatars/1.jpg" alt="">
                    </div>
                    <div class="content">
                      <span>
                        name
                      </span>
                      <span>
                        Hunt bounty with your
                      </span>
                      <span>
                        <b-button variant="primary" @click="transformHunter">Transform Hunter</b-button>
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


import {mapGetters} from "vuex";

export default {
  components: {},
  data() {
    return {}
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
}


</script>

<style scoped lang="scss">
.dropdown-btn {
  display: flex;
  align-items: center;
  flex-direction: row;

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
