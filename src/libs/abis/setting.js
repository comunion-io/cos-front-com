/**
 * @description setting 上链的api
 * @type {{}}
 */
export const settingAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'id',
        type: 'string'
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'tokenName',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenSymbol',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenAddr',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'walletAddrs',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.TokenSetting',
            name: 'tokenSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.ProposerDriver',
                name: 'driver',
                type: 'uint8'
              },
              {
                internalType: 'uint256',
                name: 'tokenBalance',
                type: 'uint256'
              },
              {
                internalType: 'address[]',
                name: 'assignAddresses',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.ProposerSetting',
            name: 'proposerSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.VoteType',
                name: 'voteType',
                type: 'uint8'
              },
              {
                internalType: 'string',
                name: 'voteTokenLimit',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'voteAssignAddrs',
                type: 'address[]'
              },
              {
                internalType: 'uint256',
                name: 'voteMinSupporters',
                type: 'uint256'
              },
              {
                internalType: 'string',
                name: 'voteMinApprovalPercent',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMinDurationHours',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMaxDurationHours',
                type: 'string'
              }
            ],
            internalType: 'struct IRO.VoterSetting',
            name: 'voterSetting',
            type: 'tuple'
          }
        ],
        indexed: false,
        internalType: 'struct IRO.Setting',
        name: 'setting',
        type: 'tuple'
      }
    ],
    name: 'sendWhenHasChanges',
    type: 'event'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'tokenName',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenSymbol',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenAddr',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'walletAddrs',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.TokenSetting',
            name: 'tokenSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.ProposerDriver',
                name: 'driver',
                type: 'uint8'
              },
              {
                internalType: 'uint256',
                name: 'tokenBalance',
                type: 'uint256'
              },
              {
                internalType: 'address[]',
                name: 'assignAddresses',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.ProposerSetting',
            name: 'proposerSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.VoteType',
                name: 'voteType',
                type: 'uint8'
              },
              {
                internalType: 'string',
                name: 'voteTokenLimit',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'voteAssignAddrs',
                type: 'address[]'
              },
              {
                internalType: 'uint256',
                name: 'voteMinSupporters',
                type: 'uint256'
              },
              {
                internalType: 'string',
                name: 'voteMinApprovalPercent',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMinDurationHours',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMaxDurationHours',
                type: 'string'
              }
            ],
            internalType: 'struct IRO.VoterSetting',
            name: 'voterSetting',
            type: 'tuple'
          }
        ],
        internalType: 'struct IRO.Setting',
        name: 'setting',
        type: 'tuple'
      }
    ],
    name: 'fullSet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      }
    ],
    name: 'getTokenSetting',
    outputs: [
      {
        internalType: 'string',
        name: 'tokenName',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'tokenSymbol',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'tokenAddr',
        type: 'string'
      },
      {
        internalType: 'address[]',
        name: 'walletAddrs',
        type: 'address[]'
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
      }
    ],
    name: 'getVoterSetting',
    outputs: [
      {
        internalType: 'enum IRO.VoteType',
        name: 'voteType',
        type: 'uint8'
      },
      {
        internalType: 'string',
        name: 'voteTokenLimit',
        type: 'string'
      },
      {
        internalType: 'address[]',
        name: 'voteAssignAddrs',
        type: 'address[]'
      },
      {
        internalType: 'uint256',
        name: 'voteMinSupporters',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'voteMinApprovalPercent',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'voteMinDurationHours',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'voteMaxDurationHours',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'tokenName',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenSymbol',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenAddr',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'walletAddrs',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.TokenSetting',
            name: 'tokenSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.ProposerDriver',
                name: 'driver',
                type: 'uint8'
              },
              {
                internalType: 'uint256',
                name: 'tokenBalance',
                type: 'uint256'
              },
              {
                internalType: 'address[]',
                name: 'assignAddresses',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.ProposerSetting',
            name: 'proposerSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.VoteType',
                name: 'voteType',
                type: 'uint8'
              },
              {
                internalType: 'string',
                name: 'voteTokenLimit',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'voteAssignAddrs',
                type: 'address[]'
              },
              {
                internalType: 'uint256',
                name: 'voteMinSupporters',
                type: 'uint256'
              },
              {
                internalType: 'string',
                name: 'voteMinApprovalPercent',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMinDurationHours',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMaxDurationHours',
                type: 'string'
              }
            ],
            internalType: 'struct IRO.VoterSetting',
            name: 'voterSetting',
            type: 'tuple'
          }
        ],
        internalType: 'struct IRO.Setting',
        name: 'setting',
        type: 'tuple'
      }
    ],
    name: 'partialSet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      }
    ],
    name: 'setting',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'tokenName',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenSymbol',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'tokenAddr',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'walletAddrs',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.TokenSetting',
            name: 'tokenSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.ProposerDriver',
                name: 'driver',
                type: 'uint8'
              },
              {
                internalType: 'uint256',
                name: 'tokenBalance',
                type: 'uint256'
              },
              {
                internalType: 'address[]',
                name: 'assignAddresses',
                type: 'address[]'
              }
            ],
            internalType: 'struct IRO.ProposerSetting',
            name: 'proposerSetting',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'enum IRO.VoteType',
                name: 'voteType',
                type: 'uint8'
              },
              {
                internalType: 'string',
                name: 'voteTokenLimit',
                type: 'string'
              },
              {
                internalType: 'address[]',
                name: 'voteAssignAddrs',
                type: 'address[]'
              },
              {
                internalType: 'uint256',
                name: 'voteMinSupporters',
                type: 'uint256'
              },
              {
                internalType: 'string',
                name: 'voteMinApprovalPercent',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMinDurationHours',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'voteMaxDurationHours',
                type: 'string'
              }
            ],
            internalType: 'struct IRO.VoterSetting',
            name: 'voterSetting',
            type: 'tuple'
          }
        ],
        internalType: 'struct IRO.Setting',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
