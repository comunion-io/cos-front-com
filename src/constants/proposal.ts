// 1.未开始 2.进行中 3.已结束 4.未成案 5.提案被拒绝 6.提案被通过
export const proposalStatusTxtMap = {
  1: 'Not started',
  2: 'Voting',
  3: 'Finished',
  4: 'No enough vote',
  5: 'Rejected',
  6: 'Passed'
};
export const proposalStatusColorMap = {
  1: '#d9d9d9',
  2: '#1890ff',
  3: '#52c41a',
  4: '#faad14',
  5: '#f5222d',
  6: '#52c41a'
};

// 提案状态
export const proposalStatusMap = {
  notStarted: 1,
  voting: 2,
  finished: 3,
  noEnoughVote: 4,
  rejected: 5,
  passed: 6
};

// 提案类型
export const proposalTypeTxtMap = {
  1: 'Finance',
  2: 'Governance',
  3: 'Strategy',
  4: 'Product',
  5: 'Media',
  6: 'Community',
  7: 'Node'
};
