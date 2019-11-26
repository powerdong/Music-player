<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:33:42
 * @Update: 2019-11-25 15:43:52
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
      :imgUrl="item.album.picUrl"
      @beginSong="setAudioList(item, index)"
      :nowSong="item.id === audioSong.id"
    ></song-list>
    <should-login v-show="isLogin === 0"></should-login>
  </song-list-page>
</template>

<script>
import api from 'api'
import songList from 'base/song'
import songListPage from 'base/songListPage'
import shouldLogin from 'base/shouldLogin'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  data () {
    return {
      songLists: [],
      load: '',
      isLogin: +localStorage.getItem('loginState') || 0
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
      if (this.isLogin !== 0) {
        api.recSongsFn()
          .then(res => {
            const data = res.data
            if (data.code === 200) {
              this.songLists = data.recommend
              this.load = false
            }
          })
          .catch(err => {
            if (err) {
              this.load = false
            }
          })
      } else {
        this.load = false
      }
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
  },
  components: {
    songList,
    songListPage,
    shouldLogin
  }
}
</script>

<style lang='less' scoped>
</style>
