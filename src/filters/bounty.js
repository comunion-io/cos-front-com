// 检查bounty 的状态
export function bountyStatus(bounty) {
  if (bounty === 0) {
    return 'open';
  } else if (bounty === 1) {
    return 'process';
  } else if (bounty === 2) {
    return 'closed';
  } else {
    return '';
  }
}
