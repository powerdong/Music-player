<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-10-26 08:05:08
 * @Update log: 更新日志
 -->
<template>
  <div class="container" ref="wrapper">
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
import { paddingBottom } from 'mixins/Mixins'

export default {
  mixins: [paddingBottom],
  name: 'findIndex',
  beforeRouteEnter (to, from, next) {
    console.log(from, to)
    next()
    if (from.path === '/pwd') {
      location.reload()
    }
  },
  components: {
    swiper,
    icon,
    songList,
    newDish
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1295705_yfxum6q2gip.css");
</style>
