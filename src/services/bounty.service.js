import { commonList } from './utils';
import { request } from './request';

/**
 * @description 获取所有的bounty或者startup发布的bounty
 * @param startupId: startup 的id,
 * @param type: 获取哪种类型的bounty-list
 */
export async function getBounties(query, startupId, type) {
  let url = '';
  switch (type) {
    case 'startup-bounty-list':
      url = `cores/startups/${startupId}/bounties`;
      break;
    case 'startup-bounty-list-me':
      url = `cores/startups/${startupId}/bounties/me`;
      break;
    case 'bounty-list':
      break;
    case 'bounty-list-me':
      break;
    default:
      break;
  }
  return commonList(url, query);
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
