export const removeScript = function (libName) {
  const scriptEl = document.getElementById(`vis-lib-${libName}`);
  scriptEl && scriptEl.parentNode?.removeChild(scriptEl);
};

export const destoryPreview = function () {
  const styles = document.getElementsByClassName(
    'VIS_STYLE_CLASSNAME',
  ) 
  const scripts = document.getElementsByClassName(
    'VIS_LIB_SCRIPT_CLASSNAME',
  )
  Array.from(styles).forEach((element) => {
    element.parentNode?.removeChild(element);
  });
  Array.from(scripts).forEach((element) => {
    element.parentNode?.removeChild(element);
  });
};
export const addStyles = function (
  content,
  scopedId,
  options,
) {
  const { path, shadowEl } = options;
  // css 样式热更新和首次加载
  const elId = scopedId || path;
  const elTarget = document.getElementById(`${elId}-vis-style`);
  if (elTarget) {
    // 热更新
    elTarget.textContent = content;
  } else {
    const style = document.createElement('style');
    style.classList.add('VIS_STYLE_CLASSNAME');
    style.id = `${scopedId}-vis-style`;
    style.textContent = content;
    // const ref = document.head.getElementsByTagName('style')[0] || null;
    (shadowEl || document.head).appendChild(style);
  }
};
export const loadScript = function (url) {
  return new Promise ((resolve) => {
    const el = document.createElement('script')
    el.src = url
    document.head.appendChild(el)
    el.onload = function () {
      resolve(true)  
    }
  }) 
}
export const loadLib = function (content) {
  const scriptEl = document.createElement('script');
  scriptEl.className = 'VIS_LIB_SCRIPT_CLASSNAME';
  scriptEl.type = 'text/javascript';
  scriptEl.textContent = `
    ${content}
  `;
  document.head.appendChild(scriptEl);
}
export const makeShadowRaw = function (el) {
  const childNodes = el.childNodes;
  try {
    const tempEl = document.createDocumentFragment();
    // tempEl.classList.add('sand-box-wrap')
    for (const node of childNodes) {
      tempEl.appendChild(node);
    }
    const oldRootShadowRoot = el.shadowRoot;
    if (oldRootShadowRoot) {
      console.log(`its already open shadow, attach shadow mutiple times`);
      return;
    } else {
      const shadowRoot = el.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tempEl);
      return shadowRoot;
    }
  } catch (e) {
    console.error('[shadow] make shadow-root failed', el, childNodes);
  }
};