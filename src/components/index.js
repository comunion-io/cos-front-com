import Vue from 'vue';
import './ant';

const components = {
  HelpCenter: () => import('./help/HelpCenter'),
  SinglePicUpload: () => import('./upload/SinglePicUploader.vue'),
  ComPagination: () => import('./list/Pagination'),
  Creating: () => import('./setup/Creating'),
  Success: () => import('./setup/Success.vue'),
  CopyableAddress: () => import('./helper/CopyableAddress')
};

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});
