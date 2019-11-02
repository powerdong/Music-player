<!--
 * @Author: Lambda
 * @Begin: 2019-10-27 07:48:55
 * @Update: 2019-11-02 14:20:24
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
    <van-search
      class="border-top commentInp"
      v-model="input"
      :placeholder="placeholder"
      show-action
      :clearable="false"
      background="#fff"
      left-icon
      @search="pushCom(input)"
    >
      <div slot="action" :class="{disable: !input}" @click="pushCom(input)">发送</div>
    </van-search>
  </div>
</template>

<script>
import { Toast } from 'vant'
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
      },
      input: '',
      placeholder: ''
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
      // 歌单
      this.type = 2
      this.id = params.playlistId
      this._getPlaylistComments(this.id)
      return
    }
    if (params.albumId) {
      // 专辑
      this.type = 3
      this.id = params.albumId
      this._getAlbumComments(this.id)
    }
  },
  methods: {
    pushCom (content) {
      if (!content) {
        Toast({
          position: 'bottom',
          message: '评论为空'
        })
        return
      }
      Toast.allowMultiple()
      let loadingToast = Toast.loading({
        forbidClick: true,
        duration: 1000
      })
      api.pushComFn(this.type, this.id, content)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.input = ''
            loadingToast.clear()
            Toast({
              position: 'bottom',
              message: '发表成功'
            })
          }
        })
    },
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
  .commentInp {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .disable {
      color: #ccc;
    }
  }
}
</style>
