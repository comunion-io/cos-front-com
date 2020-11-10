import { apis } from './yapi.apis'

export function createServices(createFunc) {
  const ret = {}
  let key
  
  for (key in apis) {
    const api = apis[key]
    ret[key] = (payload, extraParams) => {
      let url = api.u
      const body = { ...payload }
      // params
      if (api.p?.length) {
        api.p.forEach(paramKey => {
          delete body[paramKey]
          url = url.replace(new RegExp(`:${paramKey}|{${paramKey}}`, 'g'), payload[paramKey])
        })
      }
      // query
      const query = {}
      if (api.q?.length) {
        api.q.forEach(queryKey => {
          if (queryKey in payload) {
            delete body[queryKey]
            query[queryKey] = payload[queryKey]
          }
        })
      }
      return createFunc(url, api.m, query, body, extraParams)
    }
  }
  return ret
}
