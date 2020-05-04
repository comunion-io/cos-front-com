import { cancelAllRequest } from '@/services';

export default {
  before: () => {
    // 路由跳转时取消所有请求，特殊请求不会取消
    cancelAllRequest();
  }
};
