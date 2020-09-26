import { request } from './request';

/**
 * @description hunter-创建
 */
export async function transformToHunter(body) {
  const { error } = await request('put', '/account/users/me/hunters', body);
  return !error;
}
