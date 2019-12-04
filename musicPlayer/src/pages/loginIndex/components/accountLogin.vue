<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-25 13:23:44
 * @Update: 2019-12-04 18:37:14
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <login-nav @returnPage="returnPage">
      <span class="text">{{text}}</span>
    </login-nav>
    <slot></slot>
  </div>
</template>

<script>
import loginNav from 'base/generalNav'

export default {
  name: 'loginIndex',
  components: {
    loginNav
  },
  data () {
    return {
      text: '手机号登录'
    }
  },
  methods: {
    returnPage () {
      console.log('111')

      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 0.23rem;
}
.text {
  font-size: 0.4rem;
  vertical-align: 5px;
}
</style>
