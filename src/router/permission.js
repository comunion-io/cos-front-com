import store from '@/store';
import { message } from 'ant-design-vue';

export default {
  before: (to, from, next) => {
    // 未设置跳过认证且无token
    if (!to.meta.skipAuth && !store.getters.isLoggedIn) {
      // 防止重复调用
      if (to.name !== from.name) {
        message.info('Need login.');
        next({ name: 'square', replace: true });
      }
    }
  }
};
