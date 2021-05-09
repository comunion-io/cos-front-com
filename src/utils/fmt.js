import { isNumber } from './utils';

/**
 * B: 十亿； M: 百万； K: 千
 * 格式化数字为字符串格式，如：3500 -> "3.5K", 3500000 -> "3.5M", 3500000000 -> "3.5B";
 * @param {Number} num 需要格式化的数字
 */
export function fmtNumber(num) {
  if (!num && num !== 0) {
    return;
  }

  const n = +num;
  if (!isNumber(n) || isNaN(n)) {
    return num;
  }

  // TODO: 临时处理，后续还将需要国际化、精确度处理
  let v = n;
  let unit = '';
  if (n >= Math.pow(10, 10)) {
    v = parseFloat((n / Math.pow(10, 10)).toFixed(4));
    unit = 'B';
  } else if (n >= Math.pow(10, 7)) {
    v = parseFloat((n / Math.pow(10, 7)).toFixed(4));
    unit = 'M';
  } else if (n >= 1000) {
    v = parseFloat((n / 1000).toFixed(4));
    unit = 'K';
  }

  // TODO: 根据不同语言区域进行区分格式化数字
  return `${new Intl.NumberFormat().format(v)}${unit}`;
}
