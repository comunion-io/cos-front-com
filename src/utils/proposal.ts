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
