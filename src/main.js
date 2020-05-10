import Vue from 'vue';
import router from './router';
import store from './store';
import './components';
import App from './App';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
