import Web3 from 'web3';
import { Modal } from 'ant-design-vue';

// comunion接收方钱包地址
export const COMUNION_RECEIVER_ACCOUNT = '0xfC938765401224e62AfA26535ed07fb334d3e11c';

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
