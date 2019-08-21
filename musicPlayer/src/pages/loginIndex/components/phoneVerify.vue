<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-18 13:45:09
 * @Update: 2019-08-18 14:12:28
 * @Update log: 手机号验证
 -->
<template>
  <div class="wrapper">
    <login-nav nav="手机号验证"></login-nav>
    <verify-info></verify-info>
    <verify-code></verify-code>
  </div>
</template>

<script>
import loginNav from 'base/generalNav'
import verifyInfo from './verifyInfo'
import verifyCode from './verifyCode'
export default {
  name: 'phoneVerify',
  components: {
    loginNav,
    verifyInfo,
    verifyCode
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  box-sizing: border-box;
  padding: 0.23rem
}
</style>
