// import getWeb3 from '../../utils/getWeb3';
import Web3 from 'web3';
import * as http from '../../services/startup.service';

const transactionModule = {
  state: {
    web3: null,
    toAccount: 'https://goerli.etherscan.io/address/0xaB51602001bac963CdA4d34b4B253C26dE7239Df'
  },
  mutations: {
    /**
     * @description 注册web3
     *
     * @param { commit }
     */
    initWeb3(state) {
      let web3 = '';
      const web3js = window.web3;
      if (typeof web3js !== 'undefined') {
        web3 = new Web3(web3js.currentProvider);
        state.web3 = web3;
      }
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
