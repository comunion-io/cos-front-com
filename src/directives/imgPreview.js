import Vue from 'vue';
import { Modal } from 'ant-design-vue';

const HANDLER = '_img_preview_handler';

export function showPic(picUrl) {
  if (picUrl) {
    Modal.info({
      maskClosable: true,
      title: 'Preview',
      width: 800,
      scrollable: false,
      closable: true,
      okText: 'Close',
      content: h => (
        <div class="flex ai-center jc-center scroll-y" style="max-width:80vw;max-height:80vh">
          <img src={picUrl} style="max-width:100%;" />
        </div>
      )
    });
  }
}

function previewHandler(el, targetSrc) {
  const imageSrc = (typeof targetSrc === 'string' && targetSrc) || el.getAttribute('src');
  showPic(imageSrc);
}

function unbind(el) {
  if (el[HANDLER]) {
    el.removeEventListener('click', previewHandler);
  }
  delete el[HANDLER];
}

function bind(el, binding) {
  unbind(el);
  el.style.cursor = 'pointer';
  el[HANDLER] = e => {
    e.stopPropagation();
    previewHandler(el, binding.value);
  };
  el.addEventListener('click', el[HANDLER], true);
}

Vue.directive('preview', {
  bind,
  unbind
});
