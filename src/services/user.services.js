import { request } from './request';

/**
 * @description 登录, 后端会把token 写入浏览器cookis中
 *
 * @export
 * @param params
 * @returns
 */
export async function login(params) {
  try {
    const data = await request('post', '/account/login/', params);
    return data;
  } catch (e) {
    return e;
  }
}
