<template>
  <div>
    <button @click="changeSrc" style="cursor: pointer">点我切换物料源</button>
    <h1 @click="add" style="cursor: pointer">我是外层项目， 点我props+1 {{test}}</h1>
    <UseMaterial :src="src" :test="test" ref="useMaterial" />
    <UseMaterial :src="'http://10.28.184.222:8981/static/material/components/1539525839491223554/1.0.0'" :test="test" ref="useMaterial2" />
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
      src: "http://10.28.184.222:8981/static/material/components/1539416291669495809/1.1.2"
    }
  },
  mounted() {

  },
  methods: {
    changeSrc() {
      this.src = this.src === "http://10.28.185.162:8000/static/material/1/1496685669328662529/1" ? "http://10.28.185.162:8000/static/material/undefined/1496685669328662529/1.0.1" : "http://10.28.185.162:8000/static/material/1/1496685669328662529/1" 
    },
    add() {
      this.test+=1
      this.$refs.useMaterial.reload && this.$refs.useMaterial.reload()
    }
  }
}
</script>

<style>

</style>
