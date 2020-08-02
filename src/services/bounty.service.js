import { commonList } from './utils';

/**
 * @description 获取所有的bounty或者startup发布的bounty
 * @param startupId: startup 的id, 如果为空， 则获取所有的bounty
 */
export async function getBounties(query, startupId) {
  if (startupId) {
    return commonList(`cores/startups/${startupId}/bounties`, query);
  } else {
    return commonList('cores/bounties', query);
  }
}
