<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:25:20
 * @Update: 2019-09-05 09:29:50
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <song-list
        v-for="(item, index) in allSongListList"
        :key="index"
        :songList="true"
        :ImgUrl="item.coverImgUrl"
        :name="item.name"
        :trackCount="item.trackCount"
        :nickname="item.creator.nickname"
        :playCount="item.playCount"
      ></song-list>
      <info :info="info" :keywords="keywords"></info>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import api from 'api'
import songList from 'base/interchangeable'
import pageLoading from 'base/pageLoading'
import info from 'base/pageErrorInfo'

export default {
  name: '',
  data () {
    return {
      allSongListList: [],
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
  created () {
    this._getAllSongListList(this.keywords)
  },
  methods: {
    _getAllSongListList (key) {
      api.searchFn(key, undefined, undefined, 1000)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (data.result.playlistCount === 0) {
              // 没有内容，展示提示信息
              this.info = true
            }
            if (this.allSongListList.length) {
              // 这里的歌单获取有问题
              this.allSongListList = [this.allSongListList, ...data.result.playlists]
            } else {
              this.allSongListList = data.result.playlists
            }
            this.load = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    songList,
    info,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
