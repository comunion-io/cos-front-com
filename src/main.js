import Vue from 'vue'
import router from './router'
import BootstrapVue from "bootstrap-vue"
import App from './App';
import store from './store/index';
import Default from './Layout/Wrappers/baseLayout.vue';
import './plugins/vuetify'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.prototype.$store = store

Vue.component('default-layout', Default);
// 在根组件下加载 default-layout 组件
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
