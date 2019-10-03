<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:33:42
 * @Update: 2019-09-22 17:40:12
 * @Update log: 更新日志
 -->
<template>
  <song-list-page
    title="每日推荐"
    :load="load"
    :isAlbum="false"
    height="3.6rem"
    @startPlayAll="startPlay"
  >
    <song-list
      v-for="(item, index) in songLists"
      :key="index"
      :songName="item.name"
      :artists="item.artists"
      :albumName="item.album.name"
      :imgUrl="item.album.blurPicUrl"
      @beginSong="setAudioList(item, index)"
      :nowSong="item.id === audioSong.id"
    ></song-list>
  </song-list-page>
</template>

<script>
import api from 'api'
import songList from 'base/song'
import songListPage from 'base/songListPage'
import { mapActions, mapGetters } from 'vuex'
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
    this._getRecSongs()
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  methods: {
    _getRecSongs () {
      api.recSongsFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.songLists = data.recommend
            this.load = false
          }
        })
    },
    startPlay () {
      this.startPlayAll({
        list: this.songLists
      })
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.songLists,
        index
      })
    },
    ...mapActions(['selectPlay', 'startPlayAll'])
  }
}
</script>

<style lang='less' scoped>
</style>
