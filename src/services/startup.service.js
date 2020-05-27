import { request } from './request';

/**
 * @description 创建startup
 */
export async function createStartup(params) {
  try {
    const data = await request('post', '/cores/startups/', params);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * @description 获取我的列表
 *
 * @export
 * @param params
 * @returns
 */
export async function getMyStartup(params) {
  try {
    const data = await request('get', '/cores/startups/me', params);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * @description 获取startup detail
 *
 * @export
 * @param startupId
 */
export async function getStartupDetail(startupId) {
  try {
    const data = await request('get', `/cores/startups/${startupId}`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
