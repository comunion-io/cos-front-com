/**
 * startup状态
 * 0 创建中
 * 1 已创建
 * 2 未确认到tx产生
 * 3 上链失败
 * 4 已设置
 */
export function startupStateFilter(state) {
  return (
    ['creating', 'waiting for setting', 'waiting for blockchain', 'block failed', 'done'][state] ||
    ''
  );
}
