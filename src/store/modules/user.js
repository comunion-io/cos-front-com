import * as http from '../../services/user.services';

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
     * @description 登录
     *
     * @param state
     */
    login(store, context) {
      // const { commit, dispatch, state, rootState, rootGetters } = store;
      http.login({
        walletAddr: context.state.accounts[0]
      });
    }
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
