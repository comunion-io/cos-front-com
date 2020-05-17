import getWeb3 from '../../utils/getWeb3';
import * as http from '../../services/startup.service';

const transactionModule = {
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null
    }
  },
  mutations: {
    /**
     * @description 注册web3
     * @param state
     * @param payload
     */
    registerWeb3Instance(state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload);
      let result = payload;
      let web3Copy = state.web3;
      web3Copy.coinbase = result.coinbase;
      web3Copy.networkId = result.networkId;
      web3Copy.balance = parseInt(result.balance, 10);
      web3Copy.isInjected = result.injectedWeb3;
      web3Copy.web3Instance = result.web3;
      state.web3 = web3Copy;
    }
  },
  getters: {
    web3Info(state) {
      return state.web3;
    }
  },
  actions: {
    registerWeb3({ commit }) {
      console.log('registerWeb3 Action being executed');
      getWeb3
        .then(result => {
          commit('registerWeb3Instance', result);
        })
        .catch(e => {
          console.log('error in action registerWeb3', e);
        });
    },
    /**
     * @description 创建startup
     *
     */
    async createStartup(context, data) {
      const startup = await http.createStartup(data);
      console.log('%c 🍱 data: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', data);
      try {
        return Promise.resolve(startup);
      } catch (error) {
        console.error(console.error);
        return Promise.reject(error);
      }
    }
  }
};
export default transactionModule;
