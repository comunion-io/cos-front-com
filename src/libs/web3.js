import Web3 from 'web3';
import { Modal } from 'ant-design-vue';

// comunion new start up接收方钱包地址
export const COMUNION_RECEIVER_STARTUP_ACCOUNT = process.env.VUE_APP_STARTUP_RECEIVER;
// comunion setting 接收方钱包地址
export const COMMUNION_SETTING_RECEIVE_ACCOUNT = process.env.VUE_APP_SETTING_RECEIVER;
// comunion bounty 接收方钱包地址
export const COMUNION_BOUNTY_RECEIVE_ACCOUNT = process.env.VUE_APP_BOUNTY_RECEIVER;
// hunter 向 comunion 转账的地址
export const COMUNION_RECEIVE_HUNTER_TRANSFER = process.env.VUE_APP_HUNTER_FOR_COMUNION;

// web3示例
export let web3;

/**
 * 初始化web3
 * */
export function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(ethereum);
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    Modal.warning({
      title: 'Warning',
      content: 'Non-Ethereum browser detected. You should consider trying MetaMask!'
    });
  }
}
