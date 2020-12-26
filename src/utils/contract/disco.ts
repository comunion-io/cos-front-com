/*
 * @Author: zehui
 * @Date: 2020-12-13 23:40:00
 * @LastEditTime: 2020-12-23 00:32:28
 * @LastEditors: Please set LastEditors
 * @Description: disco 上链的函数， 包括disco 合约的创建， 发起上链
 * @FilePath: \cos-front-com\src\utils\contract\disco.ts
 */
import { discoAbi } from '@/libs/abis/disco';
import { COMUNION_RECEIVER_STARTUP_ACCOUNT, web3 } from '@/libs/web3';

/**
 * @description: Disco 接口
 * @param {*}
 * @return {*}
 */
export interface Disco {
  id: string;
  walletAddr: string;
  tokenContract: string;
  description: string;
  fundRaisingTime: string[];
  investmentReward: number;
  rewardDeclineRate: number;
  shareToken: number;
  minFundRaising: number;
  addLiquidityPool: number;
  totalDepositToken: number;
  txId: string;
}

export class DiscoTranscation {
  static instance: DiscoTranscation | undefined = undefined;
  /* 合约实例 */
  private contractInstance = undefined;
  private id = '';

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
  public async sendDiscoTransaction(disco: Disco, id: string, account: string) {
    const contractInstance = await this.getDiscoContractInstance(disco, id);
    if (contractInstance) {
      const codeData = await contractInstance.encodeABI();
      const countAll = await web3.eth.getTransactionCount(account, 'pending');
      const chainId = await web3.eth.getChainId();
      const tx = {
        from: account,
        to: COMUNION_RECEIVER_STARTUP_ACCOUNT,
        data: codeData,
        value: web3.utils.numberToHex(0),
        nonce: web3.utils.numberToHex(countAll),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: chainId
      };
      const shadowWindow = window as any;
      shadowWindow.ethereum.sendAsync(
        {
          method: 'eth_sendTransaction',
          params: [tx],
          from: shadowWindow.ethereum.selectedAddress
        },
        (err, result) => {
          if (err) {
            return console.error(err);
          }
          const txid = result.result;
          return txid;
        }
      );
    }
  }

  /**
   * @description 获取disco的合约实例
   * @author Ze Hui
   * @date 09/12/2020
   * @param disco
   * @param id
   * @returns {*}
   */
  private async getDiscoContractInstance(disco: Disco, id: string) {
    this.id = id;
    this.contractInstance = new web3.eth.Contract(discoAbi, COMUNION_RECEIVER_STARTUP_ACCOUNT);
    const {
      walletAddr,
      tokenContract,
      description,
      investmentReward,
      rewardDeclineRate,
      shareToken,
      minFundRaising,
      addLiquidityPool
    } = disco;

    const fundRaisingTimeFrom = disco.fundRaisingTime[0].valueOf();
    const fundRaisingTimeTo = disco.fundRaisingTime[1].valueOf();
    const totalDepositToken = +(+disco.totalDepositToken).toFixed(0);

    const contractDisco = await this.contractInstance.methods.newDisco(
      id,
      walletAddr,
      tokenContract,
      description,
      fundRaisingTimeFrom,
      fundRaisingTimeTo,
      investmentReward,
      rewardDeclineRate,
      shareToken,
      minFundRaising,
      addLiquidityPool,
      totalDepositToken
    );
    return contractDisco;
  }

  /**
   * @description 启用 disco， 开启募资
   * @author Ze Hui
   * @date 23/12/2020
   */
  public enableDisco() {
    if (this.contractInstance) {
      this.contractInstance.methods.enableDisco();
    }
  }
}
