<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
<<<<<<< HEAD
 * @Update: 2019-08-30 19:46:03
=======
 * @Update: 2019-08-30 13:53:21
>>>>>>> dbd82aa17a7bbff8840169203285e303f9822e36
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

</style>
