<template>
  <div class="header-connect">
    <a-button class="ml-auto mr-24" size="large" @click="connectAccount">Connect account</a-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderConnect',
  computed: {
    ...mapGetters(['web3', 'isMetaMaskConnected'])
  },
  data() {
    return {
      // metamask 实例
      ethereum: undefined,
      /** 账户信息 */
      accounts: []
    };
  },

  mounted() {
    this.ethereum = window.ethereum;
  },

  methods: {
    /**
     * @description 检查用户是否安装了metamask
     * @returns {Boolean|undefined}
     */
    isMetaMaskInstalled() {
      return Boolean(this.ethereum && this.ethereum.isMetaMask);
    },

    /**
     * @description 点击连接按钮
     */
    connectAccount() {
      const isInstalled = this.isMetaMaskInstalled();
      if (!isInstalled) {
        console.log('you have not install metamask');
        window.open('https://metamask.io/');
      } else {
        this.connect();
      }
    },

    /**
     * @description 连接mteamask
     */
    async connect() {
      try {
        const accounts = await this.ethereum.enable();
        this.$store.commit('updateAccount', accounts);

        this.registerEvents();
        if (this.isMetaMaskConnected) {
          // 登录注册web3
          this.$store.commit('initWeb3');
          // TODO
          const msg = '';
          const signature = await this.web3.eth.sign(this.web3.utils.sha3(msg), accounts[0]);
          console.log(signature);
          // await this.$store.dispatch('login');
        }
        console.log('accounts:::', accounts);
      } catch (e) {
        console.error(e);
      }
    },

    /**
     *@description 注册metamask事件
     */
    registerEvents() {
      if (this.isMetaMaskInstalled()) {
        /** network更改， 自动刷新 */
        this.ethereum.autoRefreshOnNetworkChange = true;
        this.ethereum.on('chainIdChanged', this.handleNewChain);
        this.ethereum.on('networkChanged', this.handleNewNetwork);
        this.ethereum.on('accountsChanged', this.handleNewAccounts);
      }
    },

    /**
     * @description chain 更换了
     */
    handleNewChain(chainId) {
      console.log(chainId);
    },

    /**
     * @description network更换了
     */
    handleNewNetwork(networkId) {
      console.log(networkId);
    },

    /**
     * @description 监听用户是否切换了
     * @param newAccounts
     */
    handleNewAccounts(newAccounts) {
      this.$store.commit('updateAccount', newAccounts);
    }
  }
};
</script>

<style scoped lang="less">
.header-connect {
  margin-left: 10px;
}
</style>
