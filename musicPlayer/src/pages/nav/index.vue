<template>
  <!-- 顶部导航条 -->
  <div class="nav-wrapper">
    <div class="nav-left">
      <i class="iconfont iconnav" @click="showLogin"></i>
    </div>
    <ul class="nav-center">
      <router-link tag="li" to="/home">我的</router-link>
      <router-link tag="li" to="/find">发现</router-link>
      <router-link tag="li" to="/friend">朋友</router-link>
      <router-link tag="li" to="/video">视频</router-link>
    </ul>
    <div class="nav-right">
      <i class="iconfont iconsousuo"></i>
    </div>
    <transition name="mask-show">
      <div class="mask" v-show="loginPage" @click="hideLogin" @touchmove.prevent></div>
    </transition>
    <transition name="login-show">
      <login v-if="loginPage" @touchmove.prevent></login>
    </transition>
  </div>
</template>

<script>
import login from './components/login'
export default {
  name: 'defaultNav',
  components: {
    login
  },
  data () {
    return {
      loginPage: false
    }
  },
  methods: {
    showLogin: function () {
      this.loginPage = !this.loginPage
      this.$modalHelper.afterOpen() // 打开禁用
    },
    hideLogin: function () {
      this.loginPage = !this.loginPage
      this.$modalHelper.beforeClose() // 关闭禁用
    }
  }
}
</script>

<style lang="less" scoped>
@import url("https://at.alicdn.com/t/font_1298894_btl1q00lfth.css");
.mask-show-enter,
.mask-show-leave-to {
  opacity: 0;
}

.mask-show-enter-active,
.mask-show-leave-active {
  transition: opacity linear 0.2s;
}

.login-show-enter,
.login-show-leave-to {
  transform: translateX(-6rem);
}

.login-show-enter-active,
.login-show-leave-active {
  transition: transform ease-out 0.2s;
}
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
