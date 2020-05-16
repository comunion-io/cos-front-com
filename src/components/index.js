import Vue from 'vue';
import './ant';

const components = {
  HelpCenter: () => import('./help/HelpCenter'),
  SinglePicUpload: () => import('./upload/SinglePicUploader.vue'),
  Creating: () => import('./setup/Creating'),
  Success: () => import('./setup/Success.vue')
};

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});
