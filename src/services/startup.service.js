import { request } from './request';
import { commonList } from './utils';

/**
 * @description 获取 comunion 的类型
 * @export
 * @returns
 */
export async function getCategories() {
  const { error, data } = await request(
    'get',
    '/cores/categories',
    { limit: -1 },
    { keepWhenNavigate: true }
  );
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
  const { error, data } = await request('post', '/cores/startups/', params);
  return error ? {} : data;
}

/**
 * @description 获取我的列表
 *
 * @export
 * @param params
 * @returns
 */
export async function getMyStartups(query) {
  return commonList('/cores/startups/me', query);
}

/**
 * @description 获取startup detail
 *
 * @export
 * @param startupId
 */
export async function getStartupDetail(startupId) {
  const { error, detail } = await request('get', `/cores/startups/${startupId}`);
  return error ? {} : detail;
}

/**
 * 初次设置startup setting
 */
export async function createStartupSetting(startupId, body) {
  const { error } = await request('put', `/cores/startups/${startupId}/settings`, body);
  return !error;
}
