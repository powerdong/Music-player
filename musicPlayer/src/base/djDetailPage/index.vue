<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-13 12:03:28
 * @Update: 2019-10-13 12:07:33
 * @Update log: 更新日志
 -->
<template>
  <div>
    <dj-detail-nav @returnPage="returnPage">
      <span class="text">电台</span>
    </dj-detail-nav>这是电台详情页面
  </div>
</template>

<script>
import djDetailNav from 'base/generalNav'
export default {
  name: '',
  methods: {
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    djDetailNav
  }
}
</script>

<style lang='less' scoped>
</style>
