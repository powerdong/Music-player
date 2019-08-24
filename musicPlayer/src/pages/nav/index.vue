<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-24 15:43:13
 * @Update log: 更新日志
 -->
<template>
  <!-- 顶部导航条 -->
  <nav class="nav-wrapper">
    <div class="nav-left">
      <i class="nav iconnav" @click="SHOW_LOGIN"></i>
    </div>
    <ul class="nav-center">
      <router-link tag="li" to="/home">我的</router-link>
      <router-link tag="li" to="/find">发现</router-link>
      <router-link tag="li" to="/friend">朋友</router-link>
      <router-link tag="li" to="/video">视频</router-link>
    </ul>
    <div class="nav-right">
      <i class="nav iconsousuo"></i>
    </div>
    <transition name="mask-show">
      <div class="mask" v-show="loginPage" @click="HIDE_LOGIN" @touchmove.prevent></div>
    </transition>
    <transition name="login-show" mode="out-in">
      <login v-if="loginPage" @touchmove.prevent></login>
    </transition>
  </nav>
</template>

<script>
import login from './components/login'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'defaultNav',
  components: {
    login
  },
  computed: {
    ...mapGetters({loginPage: 'LOGIN_PAGE'})
  },
  methods: {
    ...mapMutations(['SHOW_LOGIN']),
    ...mapMutations(['HIDE_LOGIN'])
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1298894_8b2aso7zegl.css");
// 遮罩层动画
.mask-show-enter,
.mask-show-leave-to {
  opacity: 0;
}

.mask-show-enter-active,
.mask-show-leave-active {
  transition: opacity linear 0.2s;
}
// 左侧侧边栏显示隐藏动画
.login-show-enter,
.login-show-leave-to {
  transform: translateX(-6rem);
}

.login-show-enter-active,
.login-show-leave-active {
  transition: transform ease-out 0.2s;
}
// 顶部的导航条
.nav-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 0.8rem;
  padding: 0 0.23rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  display: flex;
  .nav-left {
    flex: 2;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .nav-center {
    flex: 6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #999;
    font-size: 0.24rem;
  }
  .nav-right {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  // 遮罩层
  .mask {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
