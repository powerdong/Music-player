<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:33:42
 * @Update: 2019-09-07 20:44:33
 * @Update log: 更新日志
 -->
<template>
<song-list-page title="每日推荐" :load="load">
    <song-list v-for="(item, index) in songLists"
              :key="index"
              :songName="item.name"
              :artists="item.artists"
              :albumName="item.album.name"
              :imgUrl="item.album.blurPicUrl">
  </song-list>
 </song-list-page>
</template>

<script>
import api from 'api'
import songList from 'base/song'
import songListPage from 'base/songListPage'

export default {
  name: '',
  components: {
    songList,
    songListPage
  },
  data () {
    return {
      songLists: [],
      load: ''
    }
  },
  created () {
    this.getRecSongs()
  },
  methods: {
    getRecSongs () {
      api.recSongsFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.songLists = data.recommend
            this.load = false
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
