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
  const { error } = await request('post', `/cores/startups/${id}:restore`);
  return !error;
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
 * @description 获取我的startup detail
 */
export async function getMyStartupDetail(startupId) {
  const { error, data } = await request('get', `/cores/startups/me/${startupId}`);
  return error ? {} : data;
}

/**
 * 获取单个startup详情
 */
export async function getStartupDetail(startupId) {
  const { error, data } = await request('get', `/cores/startups/${startupId}`);
  return error ? {} : data;
}

/**
 * 更新startup
 */
export async function updateStartup(id, newStartup) {
  const { error } = await request('put', `/cores/startups/${id}`, newStartup);
  return !error;
}

/**
 * 关注startup
 * @param {string} startupId startup的id
 */
export async function followStartup(startupId) {
  const { error } = await request('post', `/startups/${startupId}/follows`);
  return !error;
}

/**
 * @description 获取follow startup列表
 */
export async function getFollowStartups(query) {
  return commonList('/cores/startups/me/followed', query);
}
