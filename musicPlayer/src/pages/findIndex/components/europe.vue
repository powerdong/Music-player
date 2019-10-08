<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-08 11:29:02
 * @Update: 2019-10-08 11:29:02
 * @Update log: 更新日志
 -->
<template>
  <div>
    <div class="load" v-show="loading">
      <page-loading></page-loading>
    </div>
    <div v-show="!loading">
      <audio-all-title @beginAudioAll="beginAudioAll" :trackCount="trackCount" class="titleMt"></audio-all-title>
      <song-list
        v-for="(item, index) in chineseList"
        :key="index"
        :songName="item.name"
        :artists="item.artists"
        :albumName="item.album.name"
        :imgUrl="item.album.picUrl"
        @beginSong="setAudioList(item, index)"
        :nowSong="item.id === audioSong.id"
      ></song-list>
    </div>
  </div>
</template>

<script>
import api from 'api'
import audioAllTitle from 'base/audioAllTitle'
import pageLoading from 'base/pageLoading'
import songList from 'base/song'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {
      trackCount: 0,
      chineseList: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  created () {
    this._getChineseInfo(96)
  },
  methods: {
    /**
     * 获取相关数据
     * @param {Number} type 接口参数
     */
    _getChineseInfo (type) {
      api.newSongsFn(type)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.chineseList = data.data
            this.trackCount = data.data.length
            this.loading = false
          }
        })
    },
    beginAudioAll () {
      this.startPlayAll({
        list: this.chineseList
      })
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.chineseList,
        index
      })
    },
    ...mapActions(['selectPlay', 'startPlayAll'])
  },
  components: {
    audioAllTitle,
    songList,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
.titleMt {
  margin-top: 0.2rem;
}
</style>
