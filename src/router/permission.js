import store from '@/store';

export default {
  before: (to, from, next) => {
    // 未设置跳过认证且无token
    if (!to.meta.skipAuth && !store.getters.isMetaMaskConnected) {
      next({ name: 'square', replace: true });
    }
  }
};
