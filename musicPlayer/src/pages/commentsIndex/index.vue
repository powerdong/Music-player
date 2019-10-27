<!--
 * @Author: Lambda
 * @Begin: 2019-10-27 07:48:55
 * @Update: 2019-10-27 10:51:43
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <general-nav @returnPage="returnPage" class="titleFixed">
      <!-- 通过改变 listFixed 来控制 title 的显示与否-->
      <span class="text">评论({{total}})</span>
    </general-nav>
    <album-list :info="albumInfo"></album-list>
    <div class="split"></div>
    <page-loading v-show="load"></page-loading>
    <hot-comments
      v-show="!load && hotComments.length"
      :hotComments="hotComments"
      class="pd23"
      @likeComment="likeComment"
    ></hot-comments>
    <comments
      v-show="!load && comments.length"
      :comments="comments"
      :total="total"
      class="pd23"
      @likeComment="likeComment"
    ></comments>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import pageLoading from 'base/pageLoading'
import albumList from './components/albumListInfo'
import hotComments from './components/hotComments'
import comments from './components/comments'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      total: 0,
      hotComments: [],
      comments: [],
      load: true,
      albumInfo: {
        author: '',
        imgUrl: '',
        title: ''
      }
    }
  },
  activated () {
    this.load = true
    this.params = this.$route.params
    const params = this.params
    if (Object.keys(params).length === 0) {
      this.$router.back()
    }
    /**
     * 获取到歌单信息
     */
    this.albumInfo = { ...params }
    /**
     * 判断当前资源是歌单还是专辑
     */
    if (params.playlistId) {
      this._getPlaylistComments(params.playlistId)
      return
    }
    if (params.albumId) {
      this._getAlbumComments(params.albumId)
    }
  },
  methods: {
    /**
     * 获取歌单评论
     */
    _getPlaylistComments (id) {
      api.commentPlaylistFn(id)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.total = data.total
            this.hotComments = data.hotComments
            this.comments = data.comments
            this.load = false
          }
        })
    },
    /**
     * 获取专辑评论
     */
    _getAlbumComments (id) {
      api.commentAlbumFn(id)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.total = data.total
            this.hotComments = data.hotComments
            this.comments = data.comments
            this.load = false
          }
        })
    },
    likeComment (cid, like) {
      api.commentLikeFn(this.params.id, cid, like, 2)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            console.log(data)
          }
        })
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    generalNav,
    albumList,
    hotComments,
    comments,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1478463_b9awmkqysf8.css");
.wrapper {
  .text {
    font-size: 0.4rem;
  }
}
</style>
