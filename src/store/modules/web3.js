// import getWeb3 from '../../utils/getWeb3';
import Web3 from 'web3';

const transactionModule = {
  state: {
    web3: null,
    /* 接收方钱包地址 */
    toAccount: '0xfC938765401224e62AfA26535ed07fb334d3e11c'
  },
  mutations: {
    /**
     * @description 注册web3
     *
     * @param { commit }
     */
    setWeb3(state, web3) {
      state.web3 = web3;
    }
  },
  getters: {
    /**
     * @description 返回web3信息
     *
     * @param state
     * @returns
     */
    web3(state) {
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
    async initWeb3(context) {
      const ethereum = window.ethereum;
      let web3 = '';
      if (ethereum) {
        web3 = new Web3(ethereum);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      context.commit('setWeb3', web3);
      return web3;
    }
  }
};
export default transactionModule;
