import { request } from './request';
import { ServiceRequestAndResponseMap } from './yapi.api';

type DiscoList = ServiceRequestAndResponseMap['cores@disco-列表'];

/**
 * 获取disco列表数据
 * @param {ServiceRequestAndResponseMap} query
 */
export async function getDiscos(query: DiscoList['query']) {
  const { error, data } = await request('get', '/cores/discos', query);
  return (error ? {} : data) as DiscoList['response'];
}
