/*
 * @Author       : Zehui
 * @Date         : 2021-01-11 22:42:00
 * @Descripttion : ether 与 token 互换， 交易流动性的增加删除
 * @FilePath     : \cos-front-com\src\utils\contract\swap.ts
 */
import { COMUNION_RECEIVER_SWAP_ACCOUNT, web3 } from '@/libs/web3';
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
  public contractInstance: undefined;
  private shadowWindow = window as any;

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new SwapTranscation();
      console.log(
        '%c 🥦 this.instance: ',
        'font-size:20px;background-color: #FCA650;color:#fff;',
        this.instance
      );
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
    console.log(
      '%c 🍲 this.contractInstance: ',
      'font-size:20px;background-color: #ED9EC7;color:#fff;',
      this.contractInstance
    );
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
      const { amount: amountIn, amountOutMin, path, to: account, deadline } = params;
      const res = await this.contractInstance.methods.swapExactTokensForETH(
        amountIn,
        amountOutMin,
        path,
        account,
        deadline
      );
      if (res) {
        // 上链 设置 用户的 account
        const result = await Promise.all([
          res.encodeABI(),
          web3.eth.getTransactionCount(account, 'pending'),
          web3.eth.getChainId()
        ]);

        const tx = {
          from: account,
          to: COMUNION_RECEIVER_SWAP_ACCOUNT,
          data: result[0],
          value: web3.utils.numberToHex(0),
          nonce: web3.utils.numberToHex(result[1]),
          gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
          gasLimit: web3.utils.numberToHex(183943),
          chainId: result[2]
        };

        const value = await res.send(tx);
        console.log('%c 🍵 value: ', 'font-size:20px;background-color: #B03734;color:#fff;', value);
      }

      // swapExactTokensForETHCallback(data[0]);
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
    const { amount: amountOut, amountOutMin, path, to: account, deadline } = params;
    console.log(
      '%c 🥩 amountOut: ',
      'font-size:20px;background-color: #42b983;color:#fff;',
      amountOut
    );
    const data = await this.contractInstance.methods.swapExactETHForTokens(
      amountOutMin,
      // path,
      ['0xa74433ad2bafe833ea9620e5ab1f0a1bf7d13344', '0x2872EDbd154ADf0FDc8bA6CD2f87427AaD093C43'],
      account,
      deadline
    );

    if (data) {
      // 上链 设置 用户的 account
      const result = await Promise.all([
        data.encodeABI(),
        web3.eth.getTransactionCount(account, 'pending'),
        web3.eth.getChainId()
      ]);

      const tx = {
        from: account,
        to: COMUNION_RECEIVER_SWAP_ACCOUNT,
        data: result[0],
        value: web3.utils.numberToHex(0),
        nonce: web3.utils.numberToHex(result[1]),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: result[2]
      };

      console.log('%c 🥡 tx: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', tx);
      debugger;
      const value = await data.send(tx);
      console.log('%c 🍵 value: ', 'font-size:20px;background-color: #B03734;color:#fff;', value);
    }

    const isMock = deadline === 0;
    if (isMock) {
      swapExactEthForTokensCallback(data[0]);
    } else {
      const { txid } = data;
      swapExactEthForTokensCallback(txid);
    }
  }
}
