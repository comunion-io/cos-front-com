import { commonList } from './utils';
import { request } from './request';

/**
 * @description  主页点入bounty详情， 点击我 ，进入我的主页， 我的bouny 列表
 * @param startupId: startup 的id,
 */
export async function getStartupMeBounties(query) {
  return commonList(`cores/bounties/me`, query);
}

/**
 * @description 获取主页bounty 列表
 * @param startupId: startup 的id,
 */
export async function getHomeBounties(query) {
  return commonList(`cores/bounties`, query);
}

/**
 * @description 我成为hunter 以后， 我接的bounty
 *
 * @export
 * @param query
 * @param hunterId
 * @returns
 */
export async function getBountiesForHunter(query, hunterId) {
  return commonList(`cores/bounties/users/${hunterId}`, query);
}

/**
 * @description 获取startup 下的bounty （我发的bounty）
 * @param startupId: startup 的id,
 */
export async function getStartUpBounties(startupId, query) {
  if (startupId) {
    return commonList(`cores/startups/${startupId}/bounties`, query);
  }
}

/**
 * @description 创建bounty
 * @param id： bounty 的id
 * @param params: bounty 的表单参数
 */
export async function createBounty(id, params) {
  const { error, data } = await request('post', `/cores/startups/${id}/bounties`, params);
  return error ? {} : data;
}

/**
 * @description 创建bounty 之前， 先获取一个id
 * @returns {Promise<*>}
 */
export async function getPrepareBountyId() {
  const { error, data } = await request('get', '/cores/prepareId');
  return error ? {} : data;
}

// 获取bounty详情
export async function getBountyDetail(id) {
  const { error, data } = await request('get', `/cores/bounties/${id}`);
  return error ? {} : data;
}

/**
 * @description startup work
 *
 * @export
 * @param startupId startup 的id
 * @param bountyId bounty 的id
 * @param params 转币后的txid
 * @returns
 */
export async function startupWork(bountyId, params) {
  const { error } = await request('post', `/cores/bounties/${bountyId}:startWork`, params);
  return !error;
}

/**
 * 获取某个用户的bounty列表
 * @param {object} query 查询条件
 * @param {string} userId 用户id
 */
export async function getUserBounties(query, userId) {
  return commonList(`cores/bounties/users/${userId}`, query);
}

/**
 * @description  chuan
 *
 * @export
 * @param startupId
 * @returns
 */
export async function getBountyToken(startupId) {
  const url = `/cores/startups/${startupId}/payTokens`;
  const { error, data } = await request('get', url);
  return error ? {} : data.payTokens;
}
