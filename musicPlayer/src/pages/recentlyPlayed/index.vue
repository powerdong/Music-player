<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-27 21:51:00
 * @Update: 2019-09-28 13:37:45
 * @Update log: 更新日志
 -->
<template>
  <div class="recentlyPlayed pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">最近播放</span>
    </general-nav>
    <audio-all-title @beginAudioAll="beginAudioAll" :trackCount="trackCount" class="titleMt"></audio-all-title>
    <song-list
      v-for="(item, index) in recordList"
      :key="index"
      :songName="item.name"
      :artists="item.ar"
      :albumName="item.al.name"
      :num="index + 1"
      @beginSong="setAudioList(item, index)"
      :nowSong="item.id === audioSong.id"
    ></song-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import generalNav from 'base/generalNav'
import audioAllTitle from 'base/audioAllTitle'
import songList from 'base/song'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      trackCount: 0,
      recordList: []
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  created () {
    this._getRecord()
  },
  methods: {
    setRuleArr (data) {
      let songArr = []
      data.forEach(element => {
        songArr.push(element.song)
      })
      return songArr
    },
    _getRecord () {
      // 当用户刷新页面时 vuex 状态失效，采用本地存储
      let uid = localStorage.getItem('accountUid')
      api.userRecordFn(uid)
        .then(res => {
          this.recordList = this.setRuleArr(res.data.weekData)
          this.trackCount = this.recordList.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    returnPage () {
      this.$router.go(-1)
    },
    beginAudioAll () {
      this.startPlayAll({
        list: this.recordList
      })
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.recordList,
        index
      })
    },
    ...mapActions(['selectPlay', 'startPlayAll'])
  },
  components: {
    generalNav,
    audioAllTitle,
    songList
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.recentlyPlayed {
  background-color: #fff;
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
  .titleMt {
    margin-top: 0.2rem;
  }
}
</style>
