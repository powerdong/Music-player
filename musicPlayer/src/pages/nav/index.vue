<template>
  <!-- 顶部导航条 -->
  <div class="nav-wrapper">
    <div class="nav-left">
      <i class="iconfont iconnav" ></i>
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
  </div>
</template>

<script>
export default {
  name: "defaultNav"

}
</script>

<style lang="less" scoped>
@import url("https://at.alicdn.com/t/font_1298894_btl1q00lfth.css");
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
}
</style>
