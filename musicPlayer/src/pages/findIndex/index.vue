<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-29 13:26:39
 * @Update log: 更新日志
 -->
<template>
  <div class="container">
    <swiper></swiper>
    <icon></icon>
    <song-list></song-list>
    <new-dish></new-dish>
  </div>
</template>

<script>
import swiper from './components/swiper'
import icon from './components/icons'
import songList from './components/personalizedSongList'
import newDish from './components/newDish'

export default {
  name: 'findIndex',
  components: {
    swiper,
    icon,
    songList,
    newDish
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1295705_v7ick88icjn.css');
</style>
