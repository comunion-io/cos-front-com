/**
 * 验证器
 */

// 邮箱验证
export const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function emailValidator(rule, value) {
  return emailRegexp.test(value);
}

// a-input-number正整数规则
export const positiveInteger = v => (/^\d+/.test(v) ? v : 1);

// url地址
export function urlValidator(rule, value, callback) {
  return new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ).test(value);
}

/**
 * @description 验证输入的名称（只能是英文字母）
 * @param rule
 * @param value
 * @param callback
 */
export const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input'));
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    callback(new Error('输入只能包含英文字母'));
  } else {
    callback();
  }
};

/**
 * @description 验证地址， 只能是OX开头的字母数字长度为40的字符串
 * @param rule
 * @param value
 * @param callback
 */
export const validateAddress = (rule, value, callback) => {
  var regExp = /^0x[a-fA-F0-9]{40}$/;
  if (value === '') {
    callback(new Error('Please input your address'));
  } else if (!regExp.test(value)) {
    callback(new Error('请输入正确的地址(OX开头的字母数字长度为40的字符串)'));
  } else {
    callback();
  }
};
