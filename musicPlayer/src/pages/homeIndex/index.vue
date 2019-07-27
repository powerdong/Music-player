<template>
  <div class="container">
    <home-icons></home-icons>
    <home-list></home-list>
    <div class="split"></div>
    <song-list></song-list>
  </div>
</template>

<script>
import homeIcons from './components/icons'
import homeList from './components/homeList'
import songList from './components/songList'

export default {
  name: 'homeIndex',
  components: {
    homeIcons,
    homeList,
    songList
  }
}
</script>

<style lang="less" scoped></style>
