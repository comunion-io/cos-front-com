import { request } from './request';
import { commonList } from './utils';

/**
 * @description 获取 comunion 的类型
 * @export
 * @returns
 */
export async function getCategories() {
  const { error, data } = await request('get', '/cores/categories', { limit: -1 });
  return error ? [] : data.result;
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
  const { error } = await request('post', '/cores/startups/', params);
  return !error;
}

/**
 * @description 获取我的列表
 *
 * @export
 * @param params
 * @returns
 */
export async function getMyStartup(params) {
  const { error, data } = await request('get', '/cores/startups/me', params);
  return error ? [] : data.result;
}

/**
 * @description 获取startup detail
 *
 * @export
 * @param startupId
 */
export async function getStartupDetail(startupId) {
  const data = await request('get', `/cores/startups/${startupId}`);
  return data;
}

/**
 * 初次设置startup setting
 */
export async function createStartupSetting(startupId, body) {
  const { error } = await request('post', `/startups/${startupId}/settings`, body);
  return !error;
}
