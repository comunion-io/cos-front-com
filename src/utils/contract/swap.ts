/*
 * @Author       : Zehui
 * @Date         : 2021-01-11 22:42:00
 * @Descripttion : ether 与 token 互换， 交易流动性的增加删除
 * @FilePath     : \cos-front-com\src\utils\contract\swap.ts
 */
import { COMUNION_VUE_APP_UNISWAPV2ROUTER01 } from '@/configs/app';
import { web3 } from '@/libs/web3';
import axios from 'axios';
import { getGasPrice } from '@/services/utils';

/**
 * @name: Zehui
 * @description: swap 交易上链的参数
 * @param {*}
 * @return {*}
 */
export interface ISwap {
  /** 用户打算兑换ether(token)的token(ether) */
  amount: number;
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

export interface IChangeToken {
  amount: number;
  reserveIn: number;
  reserveOut: number;
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
    this.contractInstance = new web3.eth.Contract(abi, COMUNION_VUE_APP_UNISWAPV2ROUTER01);
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
   * @description:  指定卖出ETH数量，得到另一种ERC20代币
   * @param {ISwap} params
   * @param {string} myWalletAddress
   */
  async swapExactETHForTokens(params: ISwap, myWalletAddress: string) {
    if (this.contractInstance) {
      const gasPrice = await getGasPrice();
      const amount = params.amount; // await unitTransfer(params.amount, 'ether');
      const res = await this.contractInstance.methods
        .swapETHForExactTokens(amount, params.path, params.to, params.deadline)
        .send({
          from: myWalletAddress,
          gasPrice: gasPrice
        });
      return res;
    }
  }

  /**
   * @description: 指定卖出ERC20代币数量，得到ETH，
   * @param {ISwap} params
   */
  async swapExactTokensForETH(params: ISwap, myWalletAddress: string) {
    const gasPrice = await getGasPrice();
    const amount = params.amount; // await unitTransfer(params.amount, 'ether');

    const res = await this.contractInstance.methods
      .swapExactTokensForETH(amount, 0, params.path, params.to, params.deadline)
      .send({
        from: myWalletAddress,
        gasPrice: gasPrice
      });
  }

  /**
   * @dev 获取单个输出数额
   * @notice 给定一项资产的输入量和配对的储备，返回另一项资产的最大输出量
   * @param amountIn 输入数额
   * @param reserveIn 储备量In
   * @param reserveOut 储备量Out
   * @return amounts  输出数额
   */
  async getAmountOut(params: IChangeToken): Promise<number> {
    const amount = params.amount; // await unitTransfer(params.amount, 'ether');
    const targetAmount = await this.contractInstance.methods
      .getAmountOut(amount, params.reserveIn, params.reserveOut)
      .call();
    return targetAmount;
  }

  /**
   * @dev 获取单个输出数额
   * @notice 给定一项资产的输出量和对储备，返回其他资产的所需输入量
   * @param amountOut 输出数额
   * @param reserveIn 储备量In
   * @param reserveOut 储备量Out
   * @return amounts  输入数额
   */
  async getAmountIn(params: IChangeToken): Promise<number> {
    const amount = params.amount; // await unitTransfer(params.amount, 'ether');
    const targetAmount = await this.contractInstance.methods
      .getAmountIn(BigInt(amount), params.reserveIn, params.reserveOut)
      .call();
    return targetAmount;
  }

  /**
   * @description 增加流动性
   * @author Ze Hui
   * @date 02/02/2021
   * @param params
   */
  async addLiquidity(params: IFundsPool, myWalletAddress: string) {
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
    const gasPrice = await getGasPrice();
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
      .send({
        from: myWalletAddress,
        gasPrice: gasPrice
      });
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
