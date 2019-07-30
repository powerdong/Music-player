<template>
  <div class="login-menu">
    <login-top></login-top>
    <login-icons></login-icons>
    <login-icons-top></login-icons-top>
    <login-icons-bottom></login-icons-bottom>
    <login-bottom></login-bottom>
  </div>
</template>

<script>
import loginTop from './login-top'
import loginIcons from './login-icons'
import loginIconsTop from './login-icons-top'
import loginIconsBottom from './login-icons-bottom'
import loginBottom from './login-bottom'

export default {
  name: 'login',
  components: {
    loginTop,
    loginIcons,
    loginIconsTop,
    loginIconsBottom,
    loginBottom
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1322263_qmujtttwdn.css');
.login-menu {
    // 左侧侧边栏 宽度设置为6rem
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
