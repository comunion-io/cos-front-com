/**
 * @description 合约的abi
 */
export const startupAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
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
    constant: false,
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'categoryId',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'mission',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'descriptionAddr',
        type: 'string'
      }
    ],
    name: 'newStartup',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      }
    ],
    name: 'getStartup',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'categoryId',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'mission',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'descriptionAddr',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
