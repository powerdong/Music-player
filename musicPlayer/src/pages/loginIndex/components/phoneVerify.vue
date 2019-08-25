<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-18 13:45:09
 * @Update: 2019-08-25 13:37:57
 * @Update log: 手机号验证
 -->
<template>
  <div class="wrapper">
    <verify-info></verify-info>
    <verify-code></verify-code>
  </div>
</template>

<script>
import verifyInfo from './verifyInfo'
import verifyCode from './verifyCode'
export default {
  name: 'phoneVerify',
  components: {
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
