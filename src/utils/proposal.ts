import { getTokenBalance } from '@/services/utils';

/**
 * 格式化提案的剩余时间文字
 * @param duration 投票天数（单位天）
 * @returns 剩余时间文案
 */
export function fmtProposalLeftDays(duration: number): string {
  const d = duration;
  if (d == null) {
    // TODO: 需根据具体需求进行调整
    return '-';
  }

  if (d >= 1) {
    return d % 1 === 0 ? `${d} days` : `${Math.ceil(d)} days yet`;
  }

  const h = d * 24;
  if (h <= 1) {
    return h === 1 ? `1 hour` : `1 hour yet`;
  }

  return h % 1 === 0 ? `${h} hours` : `${Math.ceil(h)} hours yet`;
}

/**
 * 判断我是否可以对某startup的提案发起投票
 * @param startup Startup
 * @param myAccount 我的钱包地址
 * @param assignAddrsField 指定钱包地址列表字段名
 * @returns 是否可以发起投票
 */
export async function canVote(
  startup: any,
  myAccount: string,
  // 分配类型字段
  typeField = 'voterType',
  // 分配人列表字段
  assignAddrsField = 'assignedVoters'
): Promise<boolean> {
  const settings = startup.settings;
  if (!settings) return false;
  // found assign
  if (settings.voterType === 1) {
    return settings[assignAddrsField].includes(myAccount);
  }
  const tokenBalance = await getTokenBalance(startup.settings.tokenAddr, myAccount);
  // pos
  if (settings.voterType === 2) {
    return tokenBalance >= settings.voterTokenLimit;
  }
  // all
  if (settings.voterType === 3) {
    return tokenBalance > 0;
  }
  return false;
}

/**
 * 判断我是否可以对某startup发起提案
 * @param startup Startup
 * @param myAccount 我的钱包地址
 * @returns 是否可以发起提案
 */
export function canInitiateProposal(startup: any, myAccount: string): Promise<boolean> {
  return canVote(startup, myAccount, 'proposerType', 'assignedProposers');
}
