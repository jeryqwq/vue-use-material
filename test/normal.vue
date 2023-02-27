<template>
  <div>
    <button @click="changeSrc" style="cursor: pointer">点我切换物料源</button>
    <h1 @click="add" style="cursor: pointer">我是外层项目， 点我props+1 {{test}}</h1>
    <div style="display: flex">
      <UseMaterial :src="src" :test="test" ref="useMaterial" />
      <!-- <UseMaterial :src="'http://10.28.184.222:8981/static/material/components/1539525839491223554/1.0.0'" :test="test" ref="useMaterial2" />
      <UseMaterial :src="src" :test="test" ref="useMaterial" />
      <use-material :src="src2" :test="test" ref="useMaterial" /> -->
    </div>
  </div>
</template>

<script>
// import UseMaterial from './../dist/vue-use-material.umd.min'
import UseMaterial from './../src/index.vue'

export default {
  components: {
    UseMaterial
  },
  data () {
    return {
      test: 0,
      src: "http://10.28.184.222:8981/static/material/blocks/1630018384402415618/1.0.0",
      src2: "http://10.28.184.222:8981/static/material/components/1539166635282714626/1.1.1"
    }
  },
  mounted() {

  },
  methods: {
    changeSrc() {
      this.src = this.src === "http://10.28.184.222:8981/static/material/components/1539416291669495809/1.1.2" ? "http://10.28.184.222:8981/static/material/components/1543783561338400770/1.0.0" : "http://10.28.184.222:8981/static/material/components/1539416291669495809/1.1.2" 
      console.log(this.src)
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
