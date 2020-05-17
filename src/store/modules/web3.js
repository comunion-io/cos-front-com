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
    },
    toAccount: 'https://goerli.etherscan.io/address/0xaB51602001bac963CdA4d34b4B253C26dE7239Df'
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
    /**
     * @description 返回web3信息
     *
     * @param state
     * @returns
     */
    web3Info(state) {
      return state.web3;
    },
    /**
     * @description 交易的收款方账户
     *
     * @param state
     * @returns
     */
    getToAccount(state) {
      return state.toAccount;
    }
  },
  actions: {
    /**
     * @description 注册web3
     *
     * @param { commit }
     */
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
      try {
        const startup = await http.createStartup(data);
        return startup;
      } catch (error) {
        console.error(console.error);
        return false;
      }
    },

    /**
     * @description 发送交易
     *
     * @param options： 与生成txid的数据要一致
     */
    async sendTransaction(options) {
      const transaction = await this.web3Info.web3Instance().eth.sendTransaction(options);
      return transaction;
    }
  }
};
export default transactionModule;
