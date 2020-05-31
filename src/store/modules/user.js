const userModules = {
  state: {
    /**  登录后的账户信息 */
    accounts: [],
    categories: []
  },
  mutations: {
    /**
     * @description 更新账户信息
     * @param state
     * @param account
     */
    updateAccount(state, account) {
      state.accounts = account;
    },

    categories(state, data) {
      state.categories = data;
    }
  },
  actions: {
    logout() {
      //
    }
  },
  getters: {
    /**
     * @description 获取我的钱包地址
     * @param state
     * @returns
     */
    from(state) {
      return state.accounts[0];
    },
    /**
     * @description 是否连接了metamask
     * @param state
     * @returns {boolean}
     */
    isMetaMaskConnected(state) {
      return state.accounts && state.accounts.length > 0;
    },

    /**
     * @description 获取categories
     * @param state
     * @returns
     */
    categories(state) {
      return state.categories;
    }
  }
};

export default userModules;
