<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:17:07
 * @Update: 2019-09-05 17:26:59
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper">
   <div v-if="!info">
    <song-list :songList="songList"
                :keyword="keywords"
                v-if="orderList.includes('song')">
      </song-list>
    <play-list :playList="playListList"
                :keyword="keywords"
                v-if="orderList.includes('playList')">
      </play-list>
    <video-list :videoList="videoList"
                  :keyword="keywords"
                  v-if="orderList.includes('video')"
      ></video-list>
    <sim-query :simQuery="sim_queryList"
                :keyword="keywords"
                v-if="orderList.includes('sim_query')">
      </sim-query>
    <artist :artist="artistList"
                :keyword="keywords"
                v-if="orderList.includes('artist')">
      </artist>
    <album :album="albumList"
                :keyword="keywords"
                v-if="orderList.includes('album')">
      </album>
    <dj-radio  :djRadio="djRadioList"
                :keyword="keywords"
                v-if="orderList.includes('djRadio')">
      </dj-radio>
    <user :user="userList"
            :keyword="keywords"
            v-if="orderList.includes('user')">
      </user>
  </div>
  <info :info="info" :keywords="keywords"></info>
 </div>
</template>

<script>
import songList from './components/song'
import playList from './components/playList'
import videoList from './components/video'
import simQuery from './components/simQuery'
import artist from './components/artist'
import album from './components/album'
import djRadio from './components/djRadio'
import user from './components/user'
import info from 'base/pageErrorInfo'
import api from 'api'

export default {
  name: '',
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  watch: {
    keywords: function (val) {
      if (val) {
        this.searchShow(val)
      }
    }
  },
  data () {
    return {
      // 这个搜索结果都包含哪些部分
      orderList: [],
      // 查看同名歌曲
      songList: {},
      // 查看全部歌单
      playListList: {},
      // 查看全部视频
      videoList: {},
      // 相关搜索
      sim_queryList: {},
      // 查看全部歌手
      artistList: {},
      // 查看全部专辑
      albumList: {},
      // 查看全部电台
      djRadioList: {},
      // 查看全部用户
      userList: {},
      info: false
    }
  },
  created () {
    this.searchShow(this.keywords)
  },
  methods: {
    /**
     * 通过获取到的 动态的搜索关键字
     * 来获取数据，返回到页面
     */
    searchShow (key) {
      api.searchFn(key)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            let { album,
              order,
              song,
              playList,
              video,
              artist,
              djRadio,
              user
            } = data.result
            let simQuery = data.result.sim_query
            this.orderList = order
            this.songList = song
            this.playListList = playList
            this.videoList = video
            this.sim_queryList = simQuery
            this.artistList = artist
            this.albumList = album
            this.djRadioList = djRadio
            this.userList = user
            this.$store.commit('SET_LOAD')
            // 没有信息展示
            if (this.orderList.length === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.$store.commit('SET_LOAD')
          this.info = true
          console.log(error)
        })
    }
  },
  components: {
    songList,
    playList,
    videoList,
    simQuery,
    artist,
    album,
    djRadio,
    user,
    info
  }
}
</script>

<style lang='less' scoped>
.wrapper{
  box-sizing: border-box;
  padding: 0 0.23rem;
  height: 87vh;
  overflow-y: scroll;
}
</style>
