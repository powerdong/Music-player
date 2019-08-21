<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-08-19 18:52:07
 * @Update log: 更新日志
 -->
<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less">
#app {
  background-color: #fff;
}
</style>
