const STRING_PROTOTYPE = '[object String]';
const NUMBER_PROTOTYPE = '[object Number]';
const REGEXP_PROTOTYPE = '[object RegExp]';
const DATE_PROTOTYPE = '[object Date]';
const BOOL_PROTOTYPE = '[object Boolean]';
const ARRAY_PROTOTYPE = '[object Array]';
const OBJECT_PROTOTYPE = '[object Object]';
const FUNCTION_PROTOTYPE = '[object Function]';

function protoString(obj) {
  return Object.prototype.toString.call(obj);
}

export function isString(str) {
  return protoString(str) === STRING_PROTOTYPE;
}

export function isNumber(num) {
  return protoString(num) === NUMBER_PROTOTYPE;
}

export function isRegExp(reg) {
  return protoString(reg) === REGEXP_PROTOTYPE;
}

export function isBool(bool) {
  return protoString(bool) === BOOL_PROTOTYPE;
}

export function isDate(date) {
  return protoString(date) === DATE_PROTOTYPE;
}

export function isArray(arr) {
  return protoString(arr) === ARRAY_PROTOTYPE;
}

export function isObject(obj) {
  return protoString(obj) === OBJECT_PROTOTYPE;
}

export function isFunction(fn) {
  return protoString(fn) === FUNCTION_PROTOTYPE;
}

/**
 * search result from an array that matched
 * @param  {Array} array        array to filter
 * @param  {String} searchKey   key to search
 * @return {Array} filterArray  filtered array
 */
export function search(array, searchKey, filterArray) {
  return array.filter(obj => {
    return (filterArray || Object.keys(obj)).some(key => {
      return (
        String(obj[key])
          .toLowerCase()
          .indexOf(searchKey.toLowerCase()) > -1
      );
    });
  });
}

// 将纯文字的数组转化为value+label的数组给a-select用
export function expandValuesToOptions(values) {
  return values.map(v => ({ value: v, label: v }));
}

/**
 * Vue data merge，避免深度对象被null覆盖掉
 * @param  {Object} to      object that want to be merget to
 * @param  {Object} origins origin object sources
 */
export function merge(to, ...origins) {
  if (!origins) return;
  origins.forEach(from => {
    for (const key in from) {
      const value = from[key];
      // 空值且源属性不为空时跳过
      if (value == null && to[key] != null) continue;
      // Just merge existed property in origin data
      if (key in to) {
        switch (protoString(value)) {
          case OBJECT_PROTOTYPE:
            merge(to[key], value);
            break;
          default:
            to[key] = value;
            break;
        }
      }
    }
  });
}
