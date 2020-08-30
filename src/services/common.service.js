import { request } from './request';

/**
 * @description 获取所有的标签
 * @param source 类型
 */
export async function getTags(source) {
  const { error, data } = await request('get', '/cores/tags', { source });
  return error ? [] : data;
}
