/**
 * @description web3
 * @type {{mutation: {}, state: {}, getters: {}, actions: {sendTransaction(*, *)}}}
 */
import getWeb3 from '../../utils/getWeb3';

const transactionModule = {
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
      block: null
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
      Object.assign({}, state.web3, web3Copy);
    },

    /**
     * @description 获取链的信息
     *
     * @param state
     * @param blockInfo
     */
    block(state, blockInfo) {
      console.log('block信息', blockInfo);
      state.web3.block = blockInfo;
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
          console.log('committing result to registerWeb3Instance mutation');
          commit('registerWeb3Instance', result);
        })
        .catch(e => {
          console.log('error in action registerWeb3', e);
        });
    },

    /**
     * @description 获取链
     *
     * @param {
     *       commit
     *     }
     */
    async getBlock({ commit }) {
      await window.web3.eth.getBlock(null, null, blockInfo => {
        commit('block', blockInfo);
      });
    }
  }
};
export default transactionModule;
