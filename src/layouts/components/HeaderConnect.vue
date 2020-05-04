<template>
  <div class="header-connect">
    <button
      type="button"
      class="btn-shadow d-inline-flex align-items-center btn btn-success"
      @click="connectAccount"
    >
      <font-awesome-icon class="mr-2" icon="plus" />
      Connect account
    </button>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';

library.add(faEllipsisV);

export default {
  name: 'HeaderConnect',
  components: {
    'font-awesome-icon': FontAwesomeIcon
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

  computed: {
    ...mapGetters(['isMetaMaskConnected'])
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
      // eslint-disable-next-line no-debugger
      try {
        const accounts = await this.ethereum.enable();
        this.$store.commit('updateAccount', accounts);
        if (this.isMetaMaskConnected) {
          this.registerEvents();
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
      console.log('newAccounts:::', newAccounts);
      console.log('isMetaMaskConnected:::', this.isMetaMaskConnected);
    }
  }
};
</script>

<style scoped lang="scss"></style>
