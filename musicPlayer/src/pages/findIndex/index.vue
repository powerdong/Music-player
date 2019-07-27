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

<style lang="less" scoped></style>
