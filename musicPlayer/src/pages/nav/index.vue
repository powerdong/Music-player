<template>
  <!-- 顶部导航条 -->
  <div class="nav-wrapper">
    <div class="nav-left">菜单</div>
    <ul class="nav-center">
      <router-link tag="li" to="/home">我的</router-link>
      <router-link tag="li" to="/find">发现</router-link>
      <router-link tag="li" to="/friend">朋友</router-link>
      <router-link tag="li" to="/video">视频</router-link>
    </ul>
    <div class="nav-right">搜索</div>
  </div>
</template>

<script>
export default {
  name: "defaultNav"
}
</script>

<style lang="less" scoped>
.nav-wrapper {
  width: 100%;
  height: 0.8rem;
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
