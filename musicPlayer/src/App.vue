<template>
  <div id="app">
    <default-nav></default-nav>
    <router-view />
  </div>
</template>

<script>
import defaultNav from "./pages/nav/index"

export default {
  name: "App",
  components: { defaultNav }
}
</script>

<style lang="less">
#app {
  box-sizing: border-box;
  padding: 0.13rem;
}
</style>
