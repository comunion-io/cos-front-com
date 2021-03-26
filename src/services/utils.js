import { request } from './request';
import { web3 } from '@/libs/web3';
import axios from 'axios';

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
  return Number((balance / Math.pow(10, 18)).toFixed(4));
}

/**
 * @description get token amount
 * @export
 * @param {*} tokenAddr
 */
export async function getTokenBalance(tokenAddr, account) {
  const tokenContract = await getTokenContract(tokenAddr);
  const tokenAmount = await tokenContract.methods.balanceOf(account).call();
  return Number((tokenAmount / Math.pow(10, 18)).toFixed(4));
}

export async function getTokenContract(tokenAddr) {
  const tokenABI = await axios.get('/static/Erc20ABI.json');
  const tokenContract = new web3.eth.Contract(tokenABI.data.abi, tokenAddr);
  return tokenContract;
}
