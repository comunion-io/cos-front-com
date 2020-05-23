import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import transactionModule from './modules/web3';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    transactionModule
  }
});
