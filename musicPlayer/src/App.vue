<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-08-31 10:15:49
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
#app{
  height: 100vh;
  width: 100vw;
}
</style>
