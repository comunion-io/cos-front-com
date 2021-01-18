/*
 * @Author       : Zehui
 * @Date         : 2021-01-11 22:42:00
 * @Descripttion : ether 与 token 互换， 交易流动性的增加删除
 * @FilePath     : \cos-front-com\src\utils\contract\swap.ts
 */
import { COMUNION_RECEIVER_STARTUP_ACCOUNT, web3 } from '@/libs/web3';
import axios from 'axios';

/**
 * @name: Zehui
 * @description: swap 交易上链的参数
 * @param {*}
 * @return {*}
 */
export interface ISwap {
  /** 用户打算兑换ether(token)的token(ether) */
  amount: number;
  /** 用户希望兑换的最小值， 当前是0 */
  amountOutMin: number;
  /**
   *  地址数组， 两个值， 第一个是token（ether） 的发布地址，
   *  第二个是ethet(token) 的募资地址（disco 上链成功后的募资地址）
   */
  path: string[];
  /** 用户的地址 */
  to: string;
  /** 交易的超时时间 */
  deadline: number;
}

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
   * @description 获取abi
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

  /**
   * @name: Zehui
   * @description: token 兑换 ether
   * @param {*}
   * @return {*}
   */
  async swapExactTokensForETH(
    params: ISwap,
    swapExactTokensForETHCallback: (ether: number) => void
  ) {
    if (this.contractInstance) {
      const { amount: amountIn, amountOutMin, path, to, deadline } = params;
      const data: number[] = await this.contractInstance.methods.swapExactTokensForETH(
        amountIn,
        amountOutMin,
        path,
        to,
        deadline
      );
      swapExactTokensForETHCallback(data[0]);
    }
  }

  /**
   * @name: Zehui
   * @description: ether 兑换 token
   * @param {*}
   * @return {*}
   */
  async swapExactETHForTokens(
    params: ISwap,
    swapExactEthForTokensCallback: (ether: number) => void
  ) {
    const { amount: amountOut, amountOutMin, path, to, deadline } = params;
    const data = await this.contractInstance.methods.swapExactETHForTokens(
      amountOutMin,
      path,
      to,
      deadline
    );
    const isMock = deadline === 0;
    if (isMock) {
      swapExactEthForTokensCallback(data[0]);
    } else {
      const { txid } = data;
      swapExactEthForTokensCallback(txid);
    }
  }
}
