// import store from '..'

const userModules = {
  state: {
    /**  登录后的账户信息 */
    accounts: []
  },
  mutations: {
    /**
     * @description 更新账户信息
     * @param state
     * @param account
     */
    updateAccount(state, account) {
      state.accounts = account;
    }
  },
  actions: {
    /**
     * @description 连接钱包
     */
    connectWallet() {}
  },
  getters: {
    /**
     * @description 是否连接了metamask
     * @param state
     * @returns {boolean}
     */
    isMetaMaskConnected(state) {
      return state.accounts && state.accounts.length > 0;
    }
  }
};

export default userModules;
