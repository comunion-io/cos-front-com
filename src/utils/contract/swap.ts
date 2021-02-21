/*
 * @Author       : Zehui
 * @Date         : 2021-01-11 22:42:00
 * @Descripttion : ether 与 token 互换， 交易流动性的增加删除
 * @FilePath     : \cos-front-com\src\utils\contract\swap.ts
 */
import { COMUNION_RECEIVER_SWAP_ACCOUNT } from '@/configs/app';
import { web3 } from '@/libs/web3';
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
   *  地址数组， 两个值，
   *  第一个是token（ether） 的发布地址，
   *  第二个是ethet(token) 的募资地址（disco 上链成功后的募资地址）
   */
  path: string[];
  /** 用户的地址 */
  to: string;
  /** 交易的超时时间 */
  deadline: number;
}

/**
 * @description 增加或删除流动性 参数
 * @author Ze Hui
 * @date 02/02/2021
 * @export
 * @interface IFundsPool
 */
export interface IFundsPool {
  /** tokenA 的合约地址 */
  tokenA: string;
  /** tokenB 的合约地址 */
  tokenB: string;
  /** 期望数量A */
  amountADesired: number;
  /** 期望数量B */
  amountBDesired: number;
  /** 最小数量A */
  amountAMin: number;
  /** 最小数量B */
  amountBMin: number;
  /** to地址 */
  to: string;
  /** 最后期限 */
  deadline: number;
}

export class SwapTranscation {
  static instance: SwapTranscation | undefined = undefined;
  public contractInstance: undefined;
  private shadowWindow = window as any;

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
    this.contractInstance = new web3.eth.Contract(abi, COMUNION_RECEIVER_SWAP_ACCOUNT);
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
  async swapExactTokensForETH(params: ISwap) {
    if (this.contractInstance) {
      const { amount: amountIn, amountOutMin, path, to: account, deadline } = params;
      const res = await this.contractInstance.methods
        .swapExactTokensForETH(amountIn, amountOutMin, path, account, deadline)
        .call();
      return res;
    }
  }

  /**
   * @name: Zehui
   * @description: ether 兑换 token
   * @param {*}
   * @return {*}
   */
  async swapExactETHForTokens(params: ISwap) {
    const { amount: amountOut, amountOutMin, path, to: account, deadline } = params;
    const res = await this.contractInstance.methods
      .swapExactETHForTokens(amountOutMin, path, account, deadline)
      .call();
    return res;
  }

  /**
   * @description 增加流动性
   * @author Ze Hui
   * @date 02/02/2021
   * @param params
   */
  async addLiquidity(params: IFundsPool) {
    const {
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline
    } = params;
    const data = await this.contractInstance.methods
      .addLiquidity(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline
      )
      .call();
    return data;
  }

  /**
   * @description 删除流动性
   * @author Ze Hui
   * @date 02/02/2021
   * @param params
   */
  async removeLiquidity(params: IFundsPool) {
    const {
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline
    } = params;
    const res = await this.contractInstance.methods
      .removeLiquidity(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline
      )
      .call();
    return res;
  }
}
