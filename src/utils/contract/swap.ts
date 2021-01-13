/*
 * @Author       : Zehui
 * @Date         : 2021-01-11 22:42:00
 * @Descripttion : ether 与 token 互换， 交易流动性的增加删除
 * @FilePath     : \cos-front-com\src\utils\contract\swap.ts
 */
import { COMUNION_RECEIVER_STARTUP_ACCOUNT, web3 } from '@/libs/web3';
import axios from 'axios';

export class SwapTranscation {
  static instance: SwapTranscation | undefined = undefined;
  contractInstance: undefined;

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new SwapTranscation();
    }
    return this.instance;
  }

  constructor() {
    this.getSwapContractInstance();
  }

  /**
   * @name: Zehui
   * @description  创建swap的实例
   * @param {*}
   * @return {*}
   */
  async getSwapContractInstance() {
    const abi = await this.getAbi();
    this.contractInstance = new web3.eth.Contract(abi, COMUNION_RECEIVER_STARTUP_ACCOUNT);
  }

  /**
   * @name: Zehui
   * @description 获取abi的
   * @param {*}
   * @return {*}
   */
  async getAbi() {
    try {
      const res = await axios.get('/static/IUniswapV2Router01.json');
      return res.data.abi;
    } catch (error) {
      console.error(error);
    }
  }
}
