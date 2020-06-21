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
 * @description 创建startup 之前， 先获取一个id
 * @returns {Promise<*>}
 */
export async function getPrepareStartupId() {
  const { error, data } = await request('get', '/cores/startups/prepareId');
  return error ? {} : data;
}

/**
 * @description 创建startup
 */
export async function createStartup(params) {
  const { error, data } = await request('post', '/cores/startups/', params);
  return error ? {} : data;
}

/**
 * @description 创建startup后， 上链失败， 需要回退，
 * @param id： startup id
 * @returns {Promise<void>}
 */
export async function restoreStartUp(id) {
  await request('post', `/cores/startups/${id}/settings:restore`);
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

/**
 * @description setting 上链失败后的， 需要回退
 * @param startupId
 * @returns {Promise<void>}
 */
export async function restoreStartupSetting(startupId) {
  await request('post', `/cores/startups/${startupId}/settings:restore`);
}
