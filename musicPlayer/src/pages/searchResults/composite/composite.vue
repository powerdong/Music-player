<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:17:07
 * @Update: 2019-09-02 13:45:41
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper">
   <song-list :songList="songList"></song-list>
   <play-list :playList="playListList"></play-list>
   <video-list :videoList="videoList"></video-list>
 </div>
</template>

<script>
import songList from './components/song'
import playList from './components/playList'
import videoList from './components/video'
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
      orderList: {},
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
      userList: {}
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
            console.log(this.songList)
          }
        })
    }
  },
  components: {
    songList,
    playList,
    videoList
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1380711_rfnnbzvm09i.css');
.wrapper{
  box-sizing: border-box;
  padding: 0 0.23rem;
}
</style>
