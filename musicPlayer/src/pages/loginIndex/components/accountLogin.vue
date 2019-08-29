<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-25 13:23:44
 * @Update: 2019-08-29 10:43:02
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <login-nav>
      <template slot-scope="props">
        <span class="text">{{props.text}}</span>
      </template>
    </login-nav>
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
  .text{
    font-size: 0.4rem;
    vertical-align: 5px;
  }
}
</style>
