/*
 * @Author: zehui
 * @Date: 2020-12-13 23:40:00
 * @LastEditTime : 2021-01-10 16:24:17
 * @LastEditors  : Please set LastEditors
 * @Description: disco 合约编译的abi, 用于web3新建disco的合约实例
 * @FilePath     : \cos-front-com\src\libs\abis\disco.ts
 */
export const discoAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'discoId',
        type: 'string'
      }
    ],
    name: 'createdDisco',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'discoId',
        type: 'string'
      }
    ],
    name: 'enabeldDisco',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'discoId',
        type: 'string'
      }
    ],
    name: 'fundraisingFailed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'discoIdo',
        type: 'string'
      }
    ],
    name: 'fundraisingFinished',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'discoId',
        type: 'string'
      }
    ],
    name: 'fundraisingSuccessed',
    type: 'event'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    name: 'discos',
    outputs: [
      {
        internalType: 'address',
        name: 'walletAddr',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'fundRaisingStartedAt',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'fundRaisingEndedAt',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'investmentReward',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardDeclineRate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'shareToken',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minFundRaising',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'addLiquidityPool',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalDepositToken',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    name: 'investors',
    outputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'sharedToken',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardedToken',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    name: 'status',
    outputs: [
      {
        internalType: 'bool',
        name: 'isFinished',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'isSuccess',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'isEnabled',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address payable',
        name: 'addr',
        type: 'address'
      }
    ],
    name: 'setCoinBase',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getCoinBase',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getDate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      },
      {
        internalType: 'address',
        name: 'walletAddr',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'fundRaisingStartedAt',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'fundRaisingEndedAt',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'investmentReward',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardDeclineRate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'shareToken',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minFundRaising',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'addLiquidityPool',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalDepositToken',
        type: 'uint256'
      }
    ],
    name: 'newDisco',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      }
    ],
    name: 'enableDisco',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      },
      {
        internalType: 'address',
        name: 'investorAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'sharedToken',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardedToken',
        type: 'uint256'
      }
    ],
    name: 'investor',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
