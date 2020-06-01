import { request } from './request';

/**
 * @description 登录, 后端会把token 写入浏览器cookis中
 *
 * @export
 * @param params
 * @returns
 */
export async function login(params) {
  const { error } = await request('post', '/account/login/', params);
  return !error;
}

/**
 * @description 获取nonce
 * @export
 * @param publicKey 钱包地址
 * @returns nonce
 */
export async function getNonce(publicKey) {
  const { error, data } = await request('post', '/account/nonce/', { publicKey: publicKey });
  return error ? false : data.nonce;
}
