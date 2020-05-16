import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import transactionModule from './modules/web3';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    transactionModule
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
