// 设置标题
export const setDocumentTitle = function(title) {
  document.title = title;
  const ua = navigator.userAgent;
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
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
