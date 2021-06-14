import { request } from './request';
import { web3 } from '@/libs/web3';
import axios from 'axios';
import { IS_RELEASE_ENV } from '@/configs/app';

// 列表形式的通用返回
export async function commonList(url, query) {
  const { error, data } = await request('get', url, query);
  return error ? [[], 0] : [data.result, data.total];
}

/**
 * @description get ether amount
 * @export
 */
export async function getEtherBalance(account) {
  const balance = await web3.eth.getBalance(account);
  return Math.round((balance / Math.pow(10, 18)) * 10000) / 10000;
}

/**
 * @description get token amount
 * @export
 * @param {*} tokenAddr
 */
export async function getTokenBalance(tokenAddr, account) {
  const tokenContract = await getTokenContract(tokenAddr);
  const tokenAmount = await tokenContract.methods.balanceOf(account).call();
  return Math.round((tokenAmount / Math.pow(10, 18)) * 10000) / 10000;
}

export async function getTokenContract(tokenAddr) {
  const tokenABI = await axios.get('/static/Erc20ABI.json');
  const tokenContract = new web3.eth.Contract(tokenABI.data.abi, tokenAddr);
  return tokenContract;
}

/**
 * @description 单位换算
 * @export
 * @param {*} value： 值
 * @param {*} unit： 需要转换的单位， 相对于 wei
 * @return {*}
 */
export async function unitTransfer(value, unit) {
  // eg： web3.utils.toWei('1', 'ether'); // "1000000000000000000"
  const res = await web3.utils.toWei(value + '', unit);
  return +res;
}

export async function getGasPrice() {
  const gasPrice = await web3.eth.getGasPrice();
  return IS_RELEASE_ENV ? gasPrice : gasPrice * 3;
}
