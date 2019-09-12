<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 10:40:39
 * @Update: 2019-08-17 15:40:10
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <router-link to="phone" tag="button" class="phoneLogin">手机号登陆</router-link>
  </div>
</template>

<script>
export default {
  name: 'loginPage'
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');

.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @bgcolor;
  display: flex;
  justify-content: center;
  align-items: center;
  .phoneLogin{
    width: 5.3rem;
    height: 0.8rem;
    border-radius: 0.4rem;
    background-color: #fff;
    color: @bgcolor;
    font-weight: 600;
    letter-spacing: 3px;
  }
}
</style>
