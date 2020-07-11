import Web3 from 'web3';
import { Modal } from 'ant-design-vue';

// // 测试环境下， startup 收款账号
// const DEV_STARTUP_RECEIVER = '0xfC938765401224e62AfA26535ed07fb334d3e11c';
// // 测试环境下， setting 账号收款账号
// const DEV_SETTING_RECEIVER = '0xFdE6dC94cE94a9b873977DdE385d33FcA99d8eA5';

// 生产环境， startup 收款账号
const PROD_STARTUP_RECEIVER = '0x50C972636DC3cc2DE457517Ab62279c6eF3050bA';
// 生产环境下 setting 收款账号地址
const PROD_SETTING_RECEIVER = '0x50C972636DC3cc2DE457517Ab62279c6eF3050bA';

// comunion new start up接收方钱包地址
export const COMUNION_RECEIVER_ACCOUNT = PROD_STARTUP_RECEIVER;
// comunion setting 接收方钱包地址
export const COMMUNION_SETTING_RECEIVE_ACCOUNT = PROD_SETTING_RECEIVER;

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
