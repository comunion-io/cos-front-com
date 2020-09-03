/**
 * @description bounty 上链的abi
 */
export const bountyAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      }
    ],
    name: 'getBounty',
    outputs: [
      {
        internalType: 'string',
        name: 'startupName',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'intro',
        type: 'string'
      },
      {
        internalType: 'address[]',
        name: 'paymentToken',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'paymentValue',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'startupName',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'intro',
        type: 'string'
      },
      {
        internalType: 'address[]',
        name: 'paymentToken',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'paymentValue',
        type: 'uint256[]'
      }
    ],
    name: 'newBounty',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'addr',
        type: 'address'
      }
    ],
    name: 'setConbise',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
