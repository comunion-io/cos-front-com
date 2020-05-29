import axios, { CancelToken } from 'axios';
import { message as antMessage } from 'ant-design-vue';
import store from '@/store';
import router from '@/router';

// 测试环境
// const dev = 'https://dev.comunion.io/api/';

export const baseURL = `/api`;
axios.defaults.withCredentials = true; // 让ajax携带cookie
const instance = axios.create({
  baseURL,
  timeout: 30000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

// 请求拦截器
instance.interceptors.request.use(config => {
  // do something
  if (localStorage.getItem('token')) {
    // 添加token
    instance.defaults.headers.common['Authorization'] = document.cookie
      .split(';')
      .find(ele => ele.includes('COMUNION_SESSION'))
      .split('=')[1];
  }
  return config;
});

// 相应拦截器
instance.interceptors.response.use(
  async res => {
    // 下载类型
    if (res.data instanceof Blob) {
      return {
        error: false,
        data: res.data,
        detail: res.request.response
      };
    }
    return {
      error: false,
      data: res.data
    };
  },
  res => {
    if (res.response.status === 401) {
      store.dispatch('logout');
      router.replace({ name: 'login', query: { from: router.currentRoute.fullPath } });
    }
    const message = res.response.data?.message;
    if (message) {
      antMessage.error(message);
    }
    return {
      error: true,
      data: message || res.response.statusText,
      detail: res.response
    };
  }
);

// 取消请求列表
const cancelSourceList = [];

// 默认一页20条数据
export const ITEMS_PER_PAGE = 20;

// 取消所有请求
export function cancelAllRequest(reason) {
  for (const _cancelSource of cancelSourceList) {
    // 特权请求不取消，例如获取用户信息等
    if (!_cancelSource.keepWhenNavigate) {
      _cancelSource.cancel(reason);
    }
  }
}

// 添加请求取消
function pushCancelSource(_cancelSource) {
  cancelSourceList.push(_cancelSource);
}

// 移除请求取消
function removeCancelSource(_cancelSource) {
  if (_cancelSource) {
    const index = cancelSourceList.indexOf(_cancelSource);
    cancelSourceList.splice(index, 1);
  }
}

// 统一封装请求接口
// keepWhenNavigate 路由跳转时是否保留而不取消
export async function request(method, url, paramsOrData, ext = {}) {
  const source = CancelToken.source();
  const { keepWhenNavigate, bodyParams } = Object.assign(
    {
      keepWhenNavigate: false,
      bodyParams: {}
    },
    ext
  );
  source.keepWhenNavigate = keepWhenNavigate;
  pushCancelSource(source);
  let ret;
  if (['post', 'put', 'patch'].includes(method)) {
    ret = await instance[method](url, paramsOrData, {
      cancelToken: source.token,
      params: bodyParams,
      responseType: ext.responseType || 'json'
    });
    console.log('%c 🍢 ret: ', 'font-size:20px;background-color: #465975;color:#fff;', ret);
  } else {
    ret = await instance[method](url, {
      cancelToken: source.token,
      params: paramsOrData,
      responseType: ext.responseType || 'json'
    });
    console.log('%c 🍡 ret: ', 'font-size:20px;background-color: #FCA650;color:#fff;', ret);
  }
  removeCancelSource(source);
  return ret;
}

// api upload
export async function uploadFile(file, ext = {}, onProgress = () => {}) {
  const form = new FormData();
  form.append('image', file);
  for (const key in ext) {
    form.append(key, ext[key]);
  }
  const { error, data } = await instance.post('/image', form, {
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress(percentCompleted);
    }
  });
  return error ? {} : data;
}
