/*
 * @Author: zehui
 * @Date: 2020-12-13 23:40:00
 * @Description: disco 上链的函数， 包括disco 合约的创建， 发起上链
 * @FilePath     : \cos-front-com\src\utils\contract\disco.ts
 */
import { COMUNION_RECEIVER_DOISCO_ACCOUNT } from '@/configs/app';
import { web3 } from '@/libs/web3';
import axios from 'axios';

/**
 * @description Disco 接口
 * @param {*}
 * @return {*}
 */
export interface Disco {
  id: string;
  walletAddr: string;
  tokenAddr: string;
  description: string;
  fundRaisingTime: string[];
  investmentReward: number;
  rewardDeclineRate: number;
  shareToken: number;
  minFundRaising: number;
  addLiquidityPool: number;
  totalDepositToken: number;
  txId: string;
  fundRaisingStartedAt: string;
  fundRaisingEndedAt: string;
  fundRaisingAddr: string;
}

export class DiscoTranscation {
  static instance: DiscoTranscation | undefined = undefined;
  /* 合约实例 */
  private contractInstance = undefined;
  private id = '';
  private shadowWindow = window as any;

  constructor() {
    this.createContractInstance();
  }

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new DiscoTranscation();
    }
    return this.instance;
  }

  /**
   * @description disco 发起上链
   * @author Ze Hui
   * @date 09/12/2020
   * @param disco
   * @param id
   * @param account
   */
  public async sendDiscoTransaction(disco: Disco, account: string, discoBlockCallBack: Function) {
    const contractInstance = await this.getDiscoContractInstance(disco, account);
    if (contractInstance) {
      const codeData = await contractInstance.encodeABI();
      const countAll = await web3.eth.getTransactionCount(account, 'pending');
      const chainId = await web3.eth.getChainId();
      const tx = {
        from: account,
        to: COMUNION_RECEIVER_DOISCO_ACCOUNT,
        data: codeData,
        value: web3.utils.numberToHex(0),
        nonce: web3.utils.numberToHex(countAll),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: chainId
      };

      this.shadowWindow.ethereum.sendAsync(
        {
          method: 'eth_sendTransaction',
          params: [tx],
          from: this.shadowWindow.ethereum.selectedAddress
        },
        (err, result) => {
          if (err) {
            return console.error(err);
          }
          const txid = result.result;
          discoBlockCallBack(txid, disco);
        }
      );
    }
  }

  async createContractInstance(contractAddr = COMUNION_RECEIVER_DOISCO_ACCOUNT) {
    const abi = await this.getAbi();
    this.contractInstance = new web3.eth.Contract(abi, contractAddr);
  }

  /**
   * @description 获取disco的合约实例
   * @author Ze Hui
   * @date 09/12/2020
   * @param disco
   * @param id
   * @returns {*}
   */
  private async getDiscoContractInstance(disco: Disco, account: string) {
    this.id = disco.id;
    // const coinBase = await this.contractInstance.methods.setCoinBase(account);
    // await this.setCoinbase(coinBase, account);

    const {
      walletAddr,
      tokenAddr,
      description,
      investmentReward,
      rewardDeclineRate,
      shareToken,
      minFundRaising,
      addLiquidityPool,
      fundRaisingStartedAt,
      fundRaisingEndedAt
    } = disco;
    const totalDepositToken = +(+disco.totalDepositToken).toFixed(0);

    const contractDisco = await this.contractInstance.methods.newDisco([
      disco.id,
      walletAddr,
      tokenAddr,
      description,
      // 合约的时间是数字， 这里要转换成秒数(合约是的时间最小单位是秒)
      new Date(fundRaisingStartedAt).getTime() / 1000,
      new Date(fundRaisingEndedAt).getTime() / 1000,
      investmentReward,
      rewardDeclineRate,
      shareToken,
      minFundRaising,
      addLiquidityPool,
      BigInt(totalDepositToken * Math.pow(10, 18))
    ]);
    return contractDisco;
  }

  /**
   * @dev: 设置用户钱包地址
   * @param {*} coinBase
   * @param {string} account
   * @return {*}
   */
  private async setCoinbase(coinBase, account: string) {
    // 上链 设置 用户的 account
    const result = await Promise.all([
      coinBase.encodeABI(),
      web3.eth.getTransactionCount(account, 'pending'),
      web3.eth.getChainId()
    ]);

    const tx = {
      from: account,
      to: COMUNION_RECEIVER_DOISCO_ACCOUNT,
      data: result[0],
      value: web3.utils.numberToHex(0),
      nonce: web3.utils.numberToHex(result[1]),
      gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
      gasLimit: web3.utils.numberToHex(183943),
      chainId: result[2]
    };
    await coinBase.send(tx);
  }

  /**
   * @name: Zehui
   * @description: 获取disco abi
   * @param {*}
   * @return {*}
   */
  private async getAbi() {
    try {
      const res = await axios.get('/static/Disco.json');
      return res.data.abi;
    } catch (error) {
      console.error(error);
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async waitTransaction(txHash: string) {
    let tx = null;
    while (tx == null) {
      tx = await web3.eth.getTransactionReceipt(txHash);
      await this.sleep(1000);
    }
    console.log(`ransaction ${txHash} was mined`);
    return tx.status;
  }
  /**
   * @description approve the 1inch dex aggregator smart contract to spend our token
   * you can see the detial at url: https://ethereumdev.io/swap-tokens-with-1inch-exchange-in-javascript-dex-and-arbitrage-part-2/
   * @author Ze Hui
   * @date 17/03/2021
   * @private
   * @param {string} address: token的地址
   * @param {string} id： 当前disco 的id
   * @param {string} fromAddress: 我的钱包地址
   * @return {*}
   */
  public async approval(disco: Disco, fromAddress: string): Promise<false | undefined> {
    if (!disco) {
      return;
    }
    // 募资提供的token
    const amount = disco.totalDepositToken;
    const tokenABI = await axios.get('/static/Erc20ABI.json');
    // 創建token的合约实例
    const tokenInstance = new web3.eth.Contract(tokenABI.data.abi, disco.tokenAddr);
    try {
      // token 要 approval 给disco的主合约地址， 而不是目的地址
      const txHash = await tokenInstance.methods
        .approve(
          COMUNION_RECEIVER_DOISCO_ACCOUNT,
          web3.utils.numberToHex(amount * Math.pow(10, 18))
        )
        .send({ from: fromAddress });
      const status = await this.waitTransaction(txHash.transactionHash);
      if (!status) {
        console.log('Approval transaction failed.');
        return;
      }
      this.enableDisco(disco.id, fromAddress);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @description 启用 disco， 开启募资
   * @author Ze Hui
   * @date 23/12/2020
   */
  public async enableDisco(id: string, account: string) {
    if (this.contractInstance) {
      const countAll = await web3.eth.getTransactionCount(account, 'pending');
      const chainId = await web3.eth.getChainId();
      const tx = {
        from: account,
        // to: COMUNION_RECEIVER_DOISCO_ACCOUNT,
        value: web3.utils.numberToHex(Math.pow(10, 17)),
        nonce: web3.utils.numberToHex(countAll),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: chainId
      };

      await this.contractInstance.methods.enableDisco(id).send(tx);
    }
  }

  /**
   * @description 给 disco 投钱
   * @author Ze Hui
   * @date 24/01/2021
   */
  public async invest(id: string, account: string) {
    // if (!this.contractInstance) {
    //   const coinBase = await this.contractInstance.methods.setCoinBase(account);
    //   await this.setCoinbase(coinBase, account);
    // }
    if (this.contractInstance) {
      const now = Math.round(new Date().getTime() / 1000); // ms -> s
      await this.contractInstance.methods.investor(id, now).send({
        from: account,
        value: web3.utils.numberToHex(Math.pow(10, 17))
      });
    }
  }
}
