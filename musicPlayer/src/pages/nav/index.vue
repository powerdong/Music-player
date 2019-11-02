<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-11-02 12:49:39
 * @Update log: 更新日志
 -->
<template>
  <div>
    <!-- 顶部导航条 -->
    <nav class="nav-wrapper">
      <div class="nav-left">
        <i class="nav iconnav ripple" @click="SHOW_LOGIN"></i>
      </div>
      <ul class="nav-center">
        <router-link tag="li" class="nav-title ripple" replace to="/home">我的</router-link>
        <router-link tag="li" class="nav-title ripple" replace to="/find">发现</router-link>
        <router-link tag="li" class="nav-title ripple" replace to="/friend">朋友</router-link>
        <router-link tag="li" class="nav-title ripple" replace to="/videoPage">视频</router-link>
      </ul>
      <div class="nav-right">
        <!-- 注意link时要加上/ 要不然会出现异常情况 -->
        <router-link to="/search" tag="i" class="nav iconsousuo ripple"></router-link>
      </div>
      <login-page-is-show></login-page-is-show>
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import loginPageIsShow from 'base/loginPageIsShow'
import { mapMutations } from 'vuex'
export default {
  name: 'defaultNav',
  methods: {
    ...mapMutations(['SHOW_LOGIN'])
  },
  components: {
    loginPageIsShow
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1298894_8b2aso7zegl.css");
@height: 1rem;
.navIcon {
  width: @height;
  height: @height;
  border-radius: 50%;
  text-align: center;
}
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
// 顶部的导航条
.nav-wrapper {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: @height;
  padding: 0 0.23rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  line-height: @height;
  .nav-left {
    flex: 2;
    display: flex;
    justify-content: left;
    align-items: center;
    .iconnav {
      .navIcon();
    }
  }
  .nav-center {
    flex: 6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #999;
    font-size: 0.24rem;
    .nav-title {
      .navIcon();
    }
  }
  .nav-right {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .iconsousuo {
      .navIcon();
    }
  }
}
</style>
