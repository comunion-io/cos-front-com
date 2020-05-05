import Vue from 'vue';

const components = {
  HelpCenter: () => import('./HelpCenter')
};

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});
