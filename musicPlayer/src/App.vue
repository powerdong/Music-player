<template>
  <div id="app">
    <default-nav></default-nav>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import defaultNav from './pages/nav/index'

export default {
  name: 'App',
  data () {
    return {
      show: false
    }
  },
  components: { defaultNav }
}
</script>

<style lang="less">
#app {
  background-color: #fff;
}
</style>
