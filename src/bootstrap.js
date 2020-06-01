import store from './store';
import lazyStore from './store/lazy';

export default () => {
  lazyStore(store);
  store.dispatch('initUser');
};
