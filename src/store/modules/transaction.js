/**
 * @description 上链
 * @type {{mutation: {}, state: {}, getters: {}, actions: {sendTransaction(*, *)}}}
 */
import * as Web3 from 'web3';

const transactionModule = {
  state: {},
  mutation: {},
  getters: {},
  actions: {
    /**
     * @description 上链交易
     * @param context
     * @param startup
     */
    sendTransaction(context, startup) {
      let web3;
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider(''));
      }
      const from = web3.eth.accounts[0];
      console.log(from);
    }
  }
};
export default transactionModule;
