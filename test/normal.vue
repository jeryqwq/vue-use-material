<template>
  <div>
    <button @click="changeSrc" style="cursor: pointer">点我切换物料源</button>
    <h1 @click="add" style="cursor: pointer">我是外层项目， 点我props+1 {{test}}</h1>
    <div style="display: flex">
      <UseMaterial :src="src" :test="test" ref="useMaterial" />
      <!-- <UseMaterial :src="src" :test="test" ref="useMaterial" /> -->
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
      src: "./test.zip",
    }
  },
  mounted() {

  },
  methods: {
    changeSrc() {
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
