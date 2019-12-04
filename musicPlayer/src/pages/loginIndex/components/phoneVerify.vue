<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-18 13:45:09
 * @Update: 2019-12-04 18:35:37
 * @Update log: 手机号验证
 -->
<template>
  <account-login>
    <div class="wrapper">
      <verify-info></verify-info>
      <verify-code></verify-code>
    </div>
  </account-login>
</template>

<script>
import verifyInfo from './verifyInfo'
import verifyCode from './verifyCode'
import accountLogin from './accountLogin'
export default {
  name: 'phoneVerify',
  components: {
    verifyInfo,
    verifyCode,
    accountLogin
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 0.23rem;
}
</style>
