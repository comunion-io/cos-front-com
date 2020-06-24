import { request } from './request';

/**
 * 更新startup setting
 * @param {String} startupId startup id
 * @param {Object} newSetting new startup setting
 */
export async function updateStartupSetting(startupId, body) {
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
