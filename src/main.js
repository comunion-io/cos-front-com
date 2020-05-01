import Vue from 'vue'
import './plugins/vuetify'
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.component('default-layout', Default);
// 在根组件下加载 default-layout 组件
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
