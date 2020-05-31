import { request } from './request';
import { commonList } from './utils';

/**
 * @description 获取 comunion 的类型
 * @export
 * @returns
 */
export async function getCategories() {
  try {
    const { error, data } = await request('get', '/cores/categories', { limit: -1 });
    return error ? [] : data.result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * 获取startup列表
 * @param {Object} params query
 */
export async function getStartups(query) {
  return commonList('/cores/startups', query);
}

/**
 * @description 创建startup
 */
export async function createStartup(params) {
  try {
    const { error, data } = await request('post', '/cores/startups/', params);
    return error ? [] : data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * @description 获取我的列表
 *
 * @export
 * @param params
 * @returns
 */
export async function getMyStartup(params) {
  try {
    const { error, data } = await request('get', '/cores/startups/me', params);
    return error ? [] : data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * @description 获取startup detail
 *
 * @export
 * @param startupId
 */
export async function getStartupDetail(startupId) {
  try {
    const data = await request('get', `/cores/startups/${startupId}`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
