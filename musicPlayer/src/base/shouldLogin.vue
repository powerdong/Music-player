<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-11 07:51:34
 * @Update: 2019-10-11 08:12:58
 * @Update log: 更新日志
 -->
<template>
  <div class="center">
    <p class="m3">当前未登录，请您跳转登陆页面进行登陆</p>
    <router-link to="/login">点我去登陆</router-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: '',
  methods: {
    ...mapMutations(['SHOW_LOGIN'])
  }
}
</script>

<style lang='less' scoped>
.center {
  text-align: center;
  .m3 {
    margin: 0.3rem 0;
  }
}
</style>
