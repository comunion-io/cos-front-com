import { request } from './request';

// 列表形式的通用返回
export async function commonList(url, query) {
  const { error, data } = await request('get', url, query);
  return error ? [[], 0] : [data.result, data.total];
}
