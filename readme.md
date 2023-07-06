## VueUseMaterial
该组件适用于vue2版本的组件库， 支持在任何vue2项目中使用物料平台对应的物料
### 安装
npm install vue-use-material

在node_module目录下找到vue-use-material, 在public下我们能看到一个lib目录， 该目录对应物料环境的资源，需要复制下来或者记下，后续接入到我们的项目中



第三方项目接入物料
需要准备一个物料的环境，在项目静态资源的目录下存放lib文件是物料需要用到的资源,方便后期做按需加载，资源路径前缀可通过代码配置，举例一些常用的项目或者脚手架接入方法
vue-cli2创建的项目
在src/static/目录下为资源目录，可通过webpack开启后的地址进入, http://localhost:8080/static/js/vue.js, 所以我们将上面的lib下的目录放到对应的静态目录中
vue-cli3 
放在public目录下即可 HTML 和静态资源 | Vue CLI
第三方cdn
直接把组件的perfix参数修改为服务器地址即可
使用
<template>
  <div>
    <UseMaterial src="xxxxx.zip" perfix="/static/vis/js"/>
  </div>
</template>

<script>
import UseMaterial from 'vue-use-material'
export default {
  components: {
    UseMaterial
  }
}
</script>

<style>

</style>

props参数
参数名
类型
说明
默认值
src
string
物料对应的压缩包资源路径
""
perfix
string
上述lib资源存放的路径前缀，可以是相对路径/,也可以是绝对路径http://cdn.com/assets
'/assets' 会解析为: '/assets/lib/vue3-sfc-loader.js'
""

....任意key， 如test
number
其他任何的参数都会被作为响应式数据传给物料渲染，在物料的/index.vue中的props属性定义后可以接收到下发的参数

需要在/index.vue中定义props类型和默认值



实例方法
通过ref获取到useMaterial组件上的方法
```html
<template>
  <div>
    <UseMaterial ref="material" src="1.0.1.zip" perfix="/static/vis/js"/>
  </div>
</template>

<script>
import UseMaterial from 'vue-use-material'
export default {
  components: {
    UseMaterial
  },
  mounted() {
      console.log(this.$refs.material)
  }
}
</script>

<style>

</style>
```

### 方法名
说明

getVm
返回物料的Vue实例
this.$refs.material.getVm()
getVue
返回物料Vue版本的注册在window下的Vue对象
this.$refs.material.getVue()
getOptions
获取vue3-sfc-loader的相关配置，可以拿到文件信息，各种配置等
this.$refs.material. getOptions()
reload
非src属性状态改变后手动刷新视图重新渲染组件
this.$refs.material. reolad()

状态共享
如下例子，考虑到不是所有的数据改变都要刷新视图以及监听数据的性能消耗（主要是懒），数据改变后组件需要响应时使用ref上的reload方法刷新当前视图，显示最新的状态
暂时无法在文档外展示此内容
```html

<template>
  <div>
    <button @click="changeSrc" style="cursor: pointer">点我动态切换物料源</button>
    <h1 @click="add" style="cursor: pointer">我是外层项目， 点我props+1 {{test}}</h1>
    <UseMaterial :src="src" :test="test" ref="useMaterial" />
  </div>
</template>

<script>
import UseMaterial from './../src/index.vue'
export default {
  components: {
    UseMaterial
  },
  data () {
    return {
      test: 0,
      src: "/static/material/undefined/1496685669328662529/1.0.1"
    }
  },
  mounted() {

  },
  methods: {
    changeSrc() {
      this.src = this.src === "/static/material/1/1496685669328662529/1" ? "/static/material/undefined/1496685669328662529/1.0.1" : "/static/material/1/1496685669328662529/1" 
    },
    add() {
      this.test+=1
      this.$refs.useMaterial.reload()
    }
  }
}
</script>

<style>

</style>

```
