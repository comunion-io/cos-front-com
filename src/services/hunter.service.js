import { request } from './request';

/**
 * @description hunter-创建
 */
export async function transformToHunter(body) {
  const { error } = await request('post', '/cores/hunters', body);
  return !error;
}

/**
 * @description hunter-我的
 */
export async function getMyHunterInfo() {
  const { error, data } = await request('get', '/cores/hunters/me');
  return error ? null : data;
}
