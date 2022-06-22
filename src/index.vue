<template>
  <div ref="elWrap"></div>
</template>

<script>
import {loadScript, destoryPreview, addStyles, makeShadowRaw, cssUrlHandler}  from './utils/index'
import { loadZipFile } from './utils/zip'
import { fileTransform, isResource } from './utils/file'
import fs from './utils/fs'

let forceVue
let lastVue
let options
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    perfix: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  watch: {
    src() {
      this.init()
    }
  },
  async mounted() {
   this.init()
  },
  methods: {
    async init() {
      forceVue = window.Vue || window.vue
      if(!(forceVue && forceVue.version.startWith('3.2'))) { // vue 版本非3.2
        await loadScript(this.perfix + '/lib/vue.js')
      }
      lastVue = window.Vue || window.vue
      !window['vue3-sfc-loader'] && await loadScript(this.perfix + '/lib/vue3-sfc-loader.js')
      !window.stylus && await loadScript(this.perfix + '/lib/stylus-compile.js')
      !window.Sass && await loadScript(this.perfix + '/lib/sass/sass.js')
      const sass = new window.Sass();
      const loader = window['vue3-sfc-loader']
      destoryPreview();
      await loadZipFile(this.src, fs)
      const config = {
        files: fileTransform(fs),
      };
      const elWrap = this.$refs.elWrap
      options = {
        moduleCache: {
          vue: lastVue,
          stylus: (source) => {
            return Object.assign(window.stylus(source), { deps: () => [] });
          },
          sass: {
            async render(args) {
              const { data} = args;
              return new Promise((reslove) => {
                sass.compile(data, function (result) {
                  reslove({
                    css: result.text,
                    stats: {},
                  });
                });
              });
            },
          },
        },
        addStyle: (context, scopedId, path) => {
          const replaceUrlCss = cssUrlHandler(context, fs.files);
          addStyles(replaceUrlCss, scopedId, { shadowEl: elWrap?.shadowRoot, path });
        },
        handleModule: async function (
          type,
          getContentData,
          path,
          options,
        ) {
            switch (type) {
              case '.css':
                options.addStyle(await getContentData(false));
                return;
              case '.scss': // 处理单个scss文件
                return new Promise((reslove) => {
                  sass.compile(options.getFile(path), function (result) {
                    result.status !== 3 &&
                      options.addStyle(result.text, undefined, path);
                    reslove(result);
                  });
                });
              case '.png':
                return options.getFile(path);
              default:
                if (isResource(type)) {
                  return options.getFile(path);
                }
          }
        },
        getFile(url) {
          if (url === 'scss') return;
          return (config.files[url]);
        },
        log(type, err) {
          // compiler error
          console.log(type, err)
          // props.pushConsole({type: CONSOLE_TYPES.ERROR, text: [err]});
        },
        getResource(pathCx, options) {
          // const { refPath, relPath } = pathCx;
          // console.log(pathCx, refPath, relPath, options)
          const { pathResolve, getFile, log } = options;
          const path = pathResolve(pathCx);
          const pathStr = path.toString();
          return {
            id: pathStr,
            path: path,
            getContent: async () => {
              const res = await getFile(path);
              if (typeof res === 'string' || res instanceof ArrayBuffer) {
                return {
                  type: '.' + path.split('.').pop(),
                  getContentData: async (asBinary) => {
                    if (res instanceof ArrayBuffer !== asBinary)
                      log?.(
                        'warn',
                        `unexpected data type. ${
                          asBinary ? 'binary' : 'string'
                        } is expected for "${path}"`,
                      );
                    return res || 'default';
                  },
                };
              }
              return {
                type: '.' + path.split('.').pop(),
                getContentData: () => 'undefined',
              };
            },
          };
        },
      };
      makeShadowRaw(elWrap);
      this._vm = lastVue.createApp(
        lastVue.defineAsyncComponent( () => loader.loadModule('/index.vue', options)),
        this.$attrs,
      ).mount(elWrap?.shadowRoot);
      window.Vue = forceVue
    },
    reload() {
      setTimeout(() => {
        this._vm.$.attrs = this.$attrs // hack 修改组件数据源实现状态更新
        this._vm.$forceUpdate()
      }, 0);
    },
    getVm () {
      return this._vm
    },
    getVue () {
      return lastVue
    },
    getOptions () {
      return options
    }
  }
}
</script>

<style>

</style>
