import Vue from 'vue';

const components = {
  HelpCenter: () => import('./help/HelpCenter')
};

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});
