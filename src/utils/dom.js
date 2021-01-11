// 设置标题
export const setDocumentTitle = function(title) {
  document.title = title;
  const ua = navigator.userAgent;
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/;
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function() {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

// 加载脚本
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    // script.async = true
    script.type = 'text/javascript';
    script.src = src;
    script.onerror = reject;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

/**
 *
 * @param {Element} ref 绑定的dom元素
 * @param {Function} cb 绑定的dom元素发生resize后执行（包含300ms的防抖处理）
 */
export function addDOMResizeObserver(ref, cb) {
  if (typeof ResizeObserver !== 'function') {
    console.error('The current browser does not support ResizeObserver');
    return;
  }

  const resizeObserver = new ResizeObserver(cb);
  resizeObserver.observe(ref);

  return () => {
    resizeObserver.disconnect(ref);
  };
}
