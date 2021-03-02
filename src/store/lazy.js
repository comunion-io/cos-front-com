import services from '@/services';

/**
 * 按需请求数据
 * @param {Vuex.store} store Vuex实例
 * @param {String} name 状态名称
 * @param {any} initialState 初始值
 * @param {Function} fetchState 获取数据的函数
 */
function createLazyState(store, name, initialState, fetchState) {
  const commitName = `SET_LAZY_${name.toUpperCase()}`;
  const fetchedCommitName = `${commitName}_FETCHED`;
  store.registerModule(name, {
    state: {
      [name]: {
        fetched: false,
        v: initialState
      }
    },
    mutations: {
      [commitName](state, payload) {
        state[name].v = payload;
      },
      [fetchedCommitName](state, fetched) {
        state[name].fetched = fetched;
      }
    },
    getters: {
      [name]: state => {
        if (!state[name].fetched) {
          fetchState().then(res => {
            store.commit(fetchedCommitName, true);
            store.commit(commitName, res);
          });
        }
        return state[name].v;
      }
    }
  });
}

export default function(store) {
  // startup类型
  createLazyState(store, 'categories', [], async () => {
    const { error, data } = await services['cores@分类-列表']({ limit: -1 });
    return error ? [] : data.result;
  });
  // 技能标签
  createLazyState(store, 'skills', [], async () => {
    const { error, data } = await services['cores@startup-tags']({ source: 'skills' });
    return error ? [] : data;
  });
}
