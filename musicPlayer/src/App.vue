<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-09-07 09:19:43
 * @Update log: 更新日志
 -->
<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
        <!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
      </keep-alive>
      <!-- </transition>
      <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </transition>
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
