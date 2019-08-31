<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:19:23
 * @Update: 2019-08-31 11:06:53
 * @Update log: 更新日志
 -->
<template>
<div class="container">
  <div class="page-loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
  努力加载中...
</div>
</template>

<script>
export default {
  name: 'pageLoading'
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.container{
  display: flex;
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
}
.page-loading {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 0.5rem;
  span {
    width: 0.05rem;
    height: 0.2rem;
    background-color: @bgcolor;
  }

  span:nth-of-type(1) {
    animation: grow 1s -0.45s ease-in-out infinite;
  }

  span:nth-of-type(2) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  span:nth-of-type(3) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  span:nth-of-type(4) {
    animation: grow 1s ease-in-out infinite;
  }

  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(2);
    }
  }
}
</style>
