import axios from 'axios';
import { request } from './request';
import { Method, RequestBody, RequestQuery } from './yapi.api';
import { createServices } from './yapi.services';

export const services = createServices(
  async (
    url: string,
    method: Method,
    query: RequestQuery,
    body: RequestBody,
    extraParams,
    done = true
  ) => {
    const ret = await request(
      method.toLocaleLowerCase(),
      url,
      { ...query, ...body },
      extraParams,
      done ? null : 'https://yapi.comunion.io/mock/19'
    );
    return ret;
  }
);
