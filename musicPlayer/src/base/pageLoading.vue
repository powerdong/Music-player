<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:19:23
 * @Update: 2019-09-17 10:29:10
 * @Update log: 展示页面加载动画
 -->
<template>
  <div class="container">
    <div class="page-loading">
      <span class="span"></span>
      <span class="span"></span>
      <span class="span"></span>
      <span class="span"></span>
    </div>努力加载中...
  </div>
</template>

<script>
export default {
  name: 'pageLoading'
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.container {
  display: flex;
  justify-content: center;
  height: 1rem;
  line-height: 1rem;
  z-index: 999;
}
.page-loading {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 0.5rem;
  margin-right: 0.2rem;
  .span {
    width: 0.05rem;
    height: 0.2rem;
    background-color: @bgcolor;
  }

  .span:nth-of-type(1) {
    animation: grow 1s -0.45s ease-in-out infinite;
  }

  .span:nth-of-type(2) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  .span:nth-of-type(3) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  .span:nth-of-type(4) {
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
