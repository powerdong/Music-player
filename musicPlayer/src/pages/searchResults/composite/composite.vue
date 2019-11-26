<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:17:07
 * @Update: 2019-11-26 12:50:39
 * @Update log: 综合页面展示
 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <div v-if="!info">
        <song-list :songList="songList" :keyword="keywords" v-if="orderList.includes('song')"></song-list>
        <play-list
          :playList="playListList"
          :keyword="keywords"
          v-if="orderList.includes('playList')"
        ></play-list>
        <video-list :videoList="videoList" :keyword="keywords" v-if="orderList.includes('video')"></video-list>
        <sim-query
          :simQuery="sim_queryList"
          :keyword="keywords"
          v-if="orderList.includes('sim_query')"
        ></sim-query>
        <artist :artist="artistList" :keyword="keywords" v-if="orderList.includes('artist')"></artist>
        <album :album="albumList" :keyword="keywords" v-if="orderList.includes('album')"></album>
        <dj-radio :djRadio="djRadioList" :keyword="keywords" v-if="orderList.includes('djRadio')"></dj-radio>
        <user :user="userList" :keyword="keywords" v-if="orderList.includes('user')"></user>
      </div>
      <info :info="info" :keywords="keywords"></info>
    </div>
    <page-loading v-show="load"></page-loading>
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
import pageLoading from 'base/pageLoading'
import { filterSetKeyWords } from 'utils/setKeyWords'

import api from 'api'

export default {
  name: '',
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
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  watch: {
    keywords: function (val) {
      this.load = true
      if (val) {
        this._searchShow(val)
      }
    }
  },
  created () {
    this._searchShow(this.keywords)
  },
  methods: {
    /**
     * 通过获取到的 动态的搜索关键字
     * 来获取数据，返回到页面
     */
    _searchShow (key) {
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
            this.songList = song ? song.songs : []
            this.playListList = playList ? playList.playLists : []
            this.videoList = video ? video.videos : []
            this.sim_queryList = simQuery || {}
            this.artistList = artist ? artist.artists : []
            this.albumList = album ? album.albums : []
            this.djRadioList = djRadio ? djRadio.djRadios : []
            this.userList = user ? user.users : []
            this.songList = filterSetKeyWords(this.keywords, this.songList, 'name')
            this.videoList = filterSetKeyWords(this.keywords, this.videoList, 'title')
            this.playListList = filterSetKeyWords(this.keywords, this.playListList, 'name')
            this.albumList = filterSetKeyWords(this.keywords, this.albumList, 'name')
            this.djRadioList = filterSetKeyWords(this.keywords, this.djRadioList, 'name')
            this.userList = filterSetKeyWords(this.keywords, this.userList, 'nickname')
            this.artistList = filterSetKeyWords(this.keywords, this.artistList, 'name')
            this.load = false
            // 没有信息展示
            if (this.orderList.length === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.load = false
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
    info,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
