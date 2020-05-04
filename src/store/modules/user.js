// import store from '..'

const userModules = {
  state: {
    /**  登录后的账户信息 */
    accounts: [],
  },

  getters: {
    /**
     * @description 是否连接了metamask
     * @param state
     * @returns {boolean}
     */
    isMetaMaskConnected(state) {
      console.log(state);
      return true; // state.accounts && state.accounts.length > 0;
    }
  },

  mutations: {
    /**
     * @description 更新账户信息
     * @param state
     * @param account
     */
    updateAccount(state, account) {
      // eslint-disable-next-line no-debugger
      debugger;
      state.accounts = account;
    },
  },

  actions: {
    /**
     * @description 连接钱包
     */
    connectWallet() {

    }
  }
}

export default userModules
