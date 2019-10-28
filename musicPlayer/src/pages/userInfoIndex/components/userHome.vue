<!--
 * @Author: Lambda
 * @Begin: 2019-10-28 09:05:41
 * @Update: 2019-10-28 13:15:05
 * @Update log: 更新日志
 -->
<template>
  <div class="home">
    <h1 class="title">基本信息</h1>
    <p class="list-info">
      <span class="list-name">个人介绍：</span>
      <span class="list-con">{{signature}}</span>
    </p>
    <p class="list-info">
      <span class="list-name">村龄：</span>
      <span class="list-con">{{age}}年（{{year}}年{{month}}月注册）</span>
    </p>
    <p class="list-info">
      <span class="list-name">年龄：</span>
      <span class="list-con-age">{{ birthday | setAge }}后</span>
      <span class="list-con-astro">{{astro}}座</span>
    </p>
    <p class="list-info">
      <span class="list-name">累计听歌：</span>
      <span class="list-con-con">{{ listenSongs }}首</span>
    </p>
  </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang='less' scoped>
.home {
  .title {
    font-weight: 700;
    margin: 0.4rem 0;
  }
  .list-info {
    color: #7b7c7e;
    font-size: 0.23rem;
    line-height: 2;
  }
}
</style>
