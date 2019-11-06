<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-11-05 18:46:36
 * @Update log: 更新日志
 -->
<template>
  <div class="login-menu">
    <login-top :loginState="loginState"></login-top>
    <login-icons></login-icons>
    <login-icons-top></login-icons-top>
    <login-icons-bottom></login-icons-bottom>
    <login-bottom @logout="logout"></login-bottom>
  </div>
</template>

<script>
import loginTop from './login-top'
import loginIcons from './login-icons'
import loginIconsTop from './login-icons-top'
import loginIconsBottom from './login-icons-bottom'
import loginBottom from './login-bottom'
import { mapGetters, mapMutations } from 'vuex'
import api from 'api'
export default {
  name: 'login',
  data () {
    return {
      // 显式的将获取到的登陆标签设置为Number类型
      loginState: +localStorage.getItem('loginState')
    }
  },
  computed: {
    ...mapGetters(['LEVEL'])
  },
  methods: {
    /**
     * 退出登录
     * 将本地标签设置为 0 意为 false 未登录【但是localStorage获取的是字符串，需要转换为数字】
     * 页面刷新使得信息可以重新获取
     */
    logout () {
      api.logoutFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            console.log(data)
            localStorage.setItem('loginState', 0)
            this.LOGIN_STATE(0)
            location.reload()
          }
        })
    },
    ...mapMutations(['LOGIN_STATE'])
  },
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
@import url("//at.alicdn.com/t/font_1322263_rqiqhmq0u9o.css");
.login-menu {
  // 左侧侧边栏 宽度设置为6rem
  position: absolute;
  z-index: 99;
  height: 100vh;
  overflow-y: auto;
  top: 0;
  left: 0;
  width: 6rem;
  background: #fff;
}
</style>
