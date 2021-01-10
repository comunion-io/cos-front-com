// import { commonList } from './utils';
// import { request } from './request';
import services from '@/services';
/**
 * @description  主页点入bounty详情， 点击我 ，进入我的主页， 我的bouny 列表
 * @param startupId: startup 的id,
 * OK
 */
export async function getStartupMeBounties(query) {
  const { error, data } = await services['cores@bounty-列表-我的'](query);
  return error ? [[], 0] : [data.result, data.total];
  // return commonList(`cores/bounties/me`, query);
}

/**
 * @description 获取主页bounty 列表
 * @param startupId: startup 的id,
 * OK
 */
export async function getHomeBounties(query) {
  const { error, data } = await services['cores@bounty-列表'](query);
  return error ? [[], 0] : [data.result, data.total];
  // return commonList(`cores/bounties`, query);
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
  const { error, data } = await services['cores@bounty-列表-用户']({ userId: hunterId }, query);
  return error ? [[], 0] : [data.result, data.total];
  // return commonList(`cores/bounties/users/${hunterId}`, query);
}

/**
 * @description 获取startup 下的bounty （我发的bounty）
 * @param startupId: startup 的id,
 * OK
 */
export async function getStartUpBounties(startupId, query) {
  if (startupId) {
    const { error, data } = await services['cores@startup-bounty-列表'](
      { startupId: startupId },
      query
    );
    return error ? [[], 0] : [data.result, data.total];
    // return commonList(`cores/startups/${startupId}/bounties`, query);
  }
}

/**
 * @description 创建bounty
 * @param id： bounty 的id
 * @param params: bounty 的表单参数
 * OK
 */
export async function createBounty(id, params) {
  const { error, data } = await services['cores@bounty-创建']({ id: id }, params);
  return error ? {} : data;
  // const { error, data } = await request('post', `/cores/startups/${id}/bounties`, params);
}

/**
 * @description 创建bounty 之前， 先获取一个id
 * @returns {Promise<*>}
 * OK
 */
export async function getPrepareBountyId() {
  const { error, data } = await services['cores@startup-获取prepareid']();
  return error ? {} : data;

  // const { error, data } = await request('get', '/cores/prepareId');
  // return error ? {} : data;
}

/**
 * @description 获取bounty详情
 * @author Ze Hui
 * @date 15/11/2020
 * @export
 * @param id
 * @returns {*}
 * OK
 */
export async function getBountyDetail(id) {
  const { error, data } = await services['cores@bounty-获取']({ id: id });
  return error ? {} : data;
  // const { error, data } = await request('get', `/cores/bounties/${id}`);
  // return error ? {} : data;
}

/**
 * @description startup work
 *
 * @export
 * @param startupId startup 的id
 * @param bountyId bounty 的id
 * @param params 转币后的txid
 * @returns
 * OK
 */
export async function startupWork(bountyId, params) {
  const { error } = await services['cores@bounty-startwork']({ bountyId: bountyId }, params);
  return !error;

  // const { error } = await request('post', `/cores/bounties/${bountyId}:startWork`, params);
  // return !error;
}

/**
 * 获取某个用户的bounty列表
 * @param {object} query 查询条件
 * @param {string} userId 用户id
 * OK
 */
export async function getUserBounties(query, userId) {
  const { error, data } = await services['cores@bounty-列表-用户']({ userId: userId }, query);
  return error ? [[], 0] : [data.result, data.total];
  // return commonList(`cores/bounties/users/${userId}`, query);
}

/**
 * @description  获取 bounty 的 token 下拉选项
 *
 * @export
 * @param startupId
 * @returns
 * OK
 */
export async function getBountyToken(startupId) {
  const { error, data } = await services['cores@startup-获取支付Token列表']({ startupId });
  return error ? {} : data.payTokens;
  // const url = `/cores/startups/${startupId}/payTokens`;
  // const { error, data } = await request('get', url);
}

/**
 * @description 提交 bounty
 * @author Ze Hui
 * @date 08/10/2020
 * @export
 * @param bountyId
 * @returns {*}
 * OK
 */
export async function submittedBounty(bountyId) {
  const res = await services['cores@bounty-submitted']({ bountyId });
  return res;
  // let res = await request('put', `/cores/bounties/${bountyId}:submitted`);
  // return res;
}

/**
 * @description 退出bounty
 * @author Ze Hui
 * @date 08/10/2020
 * @export
 * @param bountyId
 * @returns {*}
 * OK
 */
export async function quitedBounty(bountyId) {
  const res = await services['cores@bounty-quited']({ bountyId });
  return res;
  // const res = await request('put', `/cores/bounties/${bountyId}:quited`);
  // return res;
}

/**
 * @description 支付bounty
 * @author Ze Hui
 * @date 08/10/2020
 * @export
 * @param bountyId
 * @returns {*}
 * OK
 */
export async function paidBounty(bountyId, data) {
  const { error } = await services['cores@bounty-paid']({ bountyId }, data);
  return !error;
  // const { error } = await request('put', `/cores/bounties/${bountyId}:paid`, data);
  // return !error;
}

/**
 * @description bounty 创建者拒绝 hunter
 * @author Ze Hui
 * @date 08/10/2020
 * @export
 * @param bountyId
 * @returns {*}
 * OK
 */
export async function rejectedBounty(bountyId, data) {
  const { error } = await services['cores@bounty-rejected']({ bountyId }, data);
  return !error;
  // const { error } = await request('put', `/cores/bounties/${bountyId}:rejected`, data);
  // return !error;
}

/**
 * @description 关闭bounty
 * @author Ze Hui
 * @date 13/10/2020
 * @export
 * @param bountyId
 * @param data
 * @returns {*}
 * OK
 */
export async function closeBounty(bountyId, data) {
  const { error } = await services['cores@bounty-closed']({ bountyId }, data);
  return !error;
  // const { error } = await request('put', `/cores/bounties/${bountyId}:closed`, data);
  // return !error;
}
