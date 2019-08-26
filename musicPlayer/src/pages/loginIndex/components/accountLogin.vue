<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-25 13:23:44
 * @Update: 2019-08-26 13:49:20
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <login-nav></login-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import loginNav from 'base/generalNav'

export default {
  name: 'loginIndex',
  components: {
    loginNav
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  box-sizing: border-box;
  padding: 0.23rem;
}
</style>
