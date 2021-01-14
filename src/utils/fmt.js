import { isNumber } from './utils';

/**
 * 格式化数字为字符串格式，如：3500 -> "3,500"
 * @param {Number} num 需要格式化的数字
 */
export function fmtNumber(num) {
  const n = +num;
  if (!isNumber(n) || isNaN(n)) {
    return num;
  }

  // TODO: 根据不同语言区域进行区分格式化数字
  return new Intl.NumberFormat().format(n);
}
