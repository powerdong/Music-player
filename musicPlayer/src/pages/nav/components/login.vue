<template>
  <div class="login-menu">
    <login-top></login-top>
    <login-icons></login-icons>
    <login-list></login-list>
  </div>
</template>

<script>
import loginTop from './login-top'
import loginIcons from './login-icons'
import loginList from './login-list'

export default {
  name: 'login',
  components: {
    loginTop,
    loginIcons,
    loginList
  },
  props: {
    left: [String, Number]
  }
}
</script>

<style lang="less" scoped>
.login-menu {
    position: absolute;
    z-index: 11;
    height: 100vh;
    overflow-y:auto;
    top: 0;
    left: 0;
    width: 6rem;
    background: #fff;
}
</style>
