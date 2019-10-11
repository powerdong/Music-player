<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-11 07:56:48
 * @Update: 2019-10-11 08:10:27
 * @Update log: 更新日志
 -->
<template>
  <div>
    <transition name="mask-show">
      <div class="mask" v-show="loginPage" @click="HIDE_LOGIN" @touchmove.prevent></div>
    </transition>
    <transition name="login-show" mode="out-in">
      <login v-show="loginPage" @touchmove.prevent></login>
    </transition>
  </div>
</template>

<script>
import login from '../pages/nav/components/login'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: '',
  components: {
    login
  },
  computed: {
    ...mapGetters({ loginPage: 'LOGIN_PAGE' })
  },
  methods: {
    ...mapMutations(['HIDE_LOGIN'])
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");

// 遮罩层动画
.mask-show-enter,
.mask-show-leave-to {
  opacity: 0;
}

.mask-show-enter-active,
.mask-show-leave-active {
  transition: opacity linear 0.3s;
}
// 左侧侧边栏显示隐藏动画
.login-show-enter,
.login-show-leave-to {
  transform: translateX(-6rem);
}

.login-show-enter-active,
.login-show-leave-active {
  transition: transform linear 0.3s;
}
</style>
