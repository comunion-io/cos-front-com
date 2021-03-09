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
  public async sendDiscoTransaction(
    disco: Disco,
    id: string,
    account: string,
    discoBlockCallBack: Function
  ) {
    const contractInstance = await this.getDiscoContractInstance(disco, id, account);
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
          discoBlockCallBack(txid, id, disco);
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
  private async getDiscoContractInstance(disco: Disco, id: string, account: string) {
    this.id = id;
    const coinBase = await this.contractInstance.methods.setCoinBase(account);
    await this.setCoinbase(coinBase, account);

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
      id,
      walletAddr,
      tokenAddr,
      description,
      // 合约的时间是数字， 这里要转换成秒数(合约是的时间最小单位是秒)
      +new Date(fundRaisingStartedAt) / 1000,
      +new Date(fundRaisingEndedAt) / 1000,
      investmentReward,
      rewardDeclineRate,
      shareToken,
      minFundRaising,
      addLiquidityPool,
      totalDepositToken
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

  /**
   * @description 启用 disco， 开启募资
   * @author Ze Hui
   * @date 23/12/2020
   */
  public async enableDisco(id: string, account: string) {
    if (this.contractInstance) {
      const enabledDisco = await this.contractInstance.methods.enableDisco(id);
      const blockParams = await Promise.all([
        enabledDisco.encodeABI(),
        web3.eth.getTransactionCount(account, 'pending'),
        web3.eth.getChainId()
      ]);

      const tx = {
        from: account,
        to: COMUNION_RECEIVER_DOISCO_ACCOUNT,
        data: blockParams[0],
        value: web3.utils.numberToHex(0),
        nonce: web3.utils.numberToHex(blockParams[1]),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 12)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: blockParams[2]
      };
      await enabledDisco.send(tx);
    }
  }

  /**
   * @description 给 disco 投钱
   * @author Ze Hui
   * @date 24/01/2021
   */
  public async invest(id: string, investAddress: string, account: string) {
    if (!this.contractInstance) {
      // this.contractInstance = await this.createContractInstance();
      const coinBase = await this.contractInstance.methods.setCoinBase(account);
      await this.setCoinbase(coinBase, account);
    }

    // TODO zehui: 从后端目前获取不到募资地址， 用上链的地址代替
    if (!investAddress) {
      investAddress = COMUNION_RECEIVER_DOISCO_ACCOUNT;
    }

    if (this.contractInstance) {
      const now = +(new Date().getTime() / 1000).toFixed(0);
      const investDisco = await this.contractInstance.methods.investor(id, now);
      const blockParams = await Promise.all([
        investDisco.encodeABI(),
        web3.eth.getTransactionCount(account, 'pending'),
        web3.eth.getChainId()
      ]);

      const tx = {
        from: account,
        to: investAddress,
        data: blockParams[0],
        // TODO 暂时先投0.1ether
        value: web3.utils.numberToHex(Math.pow(10, 16)),
        nonce: web3.utils.numberToHex(blockParams[1]),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: blockParams[2]
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
          console.log('%c 🍟 txid: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', txid);
        }
      );
    }
  }
}
