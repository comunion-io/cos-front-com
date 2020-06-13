/**
 * @description setting 上链的api
 * @type {{}}
 */
export const settingAbi = [
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
        name: 'id',
        type: 'string'
      },
      {
        name: 'tokenName',
        type: 'string'
      },
      {
        name: 'tokenSymbol',
        type: 'string'
      },
      {
        name: 'tokenAddr',
        type: 'string'
      },
      {
        name: 'walletAddrs',
        type: 'address[]'
      },
      {
        name: 'voteType',
        type: 'string'
      },
      {
        name: 'voteTokenLimit',
        type: 'string'
      },
      {
        name: 'voteAssignAddrs',
        type: 'address[]'
      },
      {
        name: 'voteMSupportPercent',
        type: 'string'
      },
      {
        name: 'voteMinApprovalPercent',
        type: 'string'
      },
      {
        name: 'voteMinDurationHours',
        type: 'string'
      },
      {
        name: 'voteMaxDurationHours',
        type: 'string'
      }
    ],
    name: 'newSetting',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'id',
        type: 'string'
      }
    ],
    name: 'getTokenSetting',
    outputs: [
      {
        name: 'tokenName',
        type: 'string'
      },
      {
        name: 'tokenSymbol',
        type: 'string'
      },
      {
        name: 'tokenAddr',
        type: 'string'
      },
      {
        name: 'walletAddrs',
        type: 'address[]'
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
        name: 'id',
        type: 'string'
      }
    ],
    name: 'getVoteSetting',
    outputs: [
      {
        name: 'voteType',
        type: 'string'
      },
      {
        name: 'voteTokenLimit',
        type: 'string'
      },
      {
        name: 'voteAssignAddrs',
        type: 'address[]'
      },
      {
        name: 'voteMSupportPercent',
        type: 'string'
      },
      {
        name: 'voteMinApprovalPercent',
        type: 'string'
      },
      {
        name: 'voteMinDurationHours',
        type: 'string'
      },
      {
        name: 'voteMaxDurationHours',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
