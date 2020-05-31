import Vue from 'vue';
import './components';
import App from './App';
import router from './router';
import store from './store';
import bootstrap from './bootstrap';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app');
