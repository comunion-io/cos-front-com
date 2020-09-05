import { commonList } from './utils';
import { request } from './request';

/**
 * @description 获取startup 下的bounty
 * @param startupId: startup 的id,
 */
export async function getBounties(query, startupId) {
  if (startupId) {
    return commonList(`cores/startups/${startupId}/bounties`, query);
  } else {
    return commonList('cores/bounties', query);
  }
}

/**
 * @description 获取主页BOUNTY 下的bounty
 * @param startupId: startup 的id,
 */
export async function getHomeBounties(query) {
  return commonList(`cores/bounties`, query);
}

/**
 * @description 获取startup 下的bounty
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
