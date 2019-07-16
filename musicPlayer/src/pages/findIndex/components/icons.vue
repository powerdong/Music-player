<template>
  <div class="container border-bottom">
    <div class="icon-wrapper">
      <div class="icon">
        <span class="today">11</span>
        <i class="iconfont rili"></i>
      </div>
      <span class="icon-text">每日推荐</span>
    </div>
    <div class="icon-wrapper">
      <div class="icon">
        <i class="iconfont gedan"></i>
      </div>
      <span class="icon-text">歌单</span>
    </div>
    <div class="icon-wrapper">
      <div class="icon">
        <i class="iconfont paixingbang"></i>
      </div>
      <span class="icon-text">排行榜</span>
    </div>
    <div class="icon-wrapper">
      <div class="icon">
        <i class="iconfont diantai"></i>
      </div>
      <span class="icon-text">电台</span>
    </div>
    <div class="icon-wrapper">
      <div class="icon">
        <i class="iconfont zhibo"></i>
      </div>
      <span class="icon-text">直播</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "findIcon"
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
@import url("http://at.alicdn.com/t/font_1295705_hdzk2gocoyo.css");
.container {
  display: flex;
  width: 100%;
  height: 1.4rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0 0.3rem;
  .icon-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
      background: linear-gradient(to right, #ff5a4c, #ff1d11);
      text-align: center;
      line-height: 0.9rem;
      position: relative;
      color: #fff;
      .iconfont{
        font-size: 0.5rem;
      }
      .today{
        position: absolute;
        top: 0.1rem;
        left: 0.34rem;
        font-size: 0.1rem;
      }
    }
    .icon-text {
      font-size: 0.24rem;
    }
  }
}
</style>
