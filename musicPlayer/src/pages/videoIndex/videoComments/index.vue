<!--
 * @Author: Lambda
 * @Begin: 2019-11-11 11:49:45
 * @Update: 2019-11-12 22:07:06
 * @Update log: 更新日志
 -->
<template>
  <div class="video-com">
    <div class="titleFixed">
      <general-nav @returnPage="returnPage" ref="nav" class="fixed nav-color">
        <span class="text">{{title}}</span>
      </general-nav>
      <video-card :videoId="videoId" :allTime="allTime" @blockNav="blockNav" @hideNav="hideNav"></video-card>
    </div>
    <div v-show="!load" class="bottom-wra" ref="wra" @scroll="scroll">
      <video-info
        class="pd23"
        :title="title"
        :playTime="playTime"
        :praisedCount="praisedCount"
        :commentCount="commentCount"
        :shareCount="shareCount"
        :subscribeCount="subscribeCount"
        :videoGroup="videoGroup.slice(0,3)"
      ></video-info>
      <video-creator :class="{creatorFixed}" :avatarUrl="avatarUrl" :nickname="nickname"></video-creator>
      <div class="split" :style="{marginTop: top}"></div>
      <h1 class="pd23 title">相关视频</h1>
      <video-list
        class="pd23"
        v-for="(item, index) in allVideoList"
        :key="index"
        :videoList="true"
        line="two"
        :ImgUrl="item.coverUrl"
        :name="item.title"
        :durationms="item.durationms"
        :nicknames="item.creator"
        :playTime="item.playTime"
      ></video-list>
      <div class="split"></div>
      <comments
        v-show="hotComments.length"
        title="精彩评论"
        :comments="hotComments"
        class="pd23"
        @showMenu="showMenu"
        @likeComment="likeComment"
      ></comments>
      <comments
        v-show="comments.length"
        title="最新评论"
        :total="total"
        :comments="comments"
        class="pd23"
        @showMenu="showMenu"
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
      <center-menu @update:show="updateShow" @delCom="delCom" :isShow="isShow"></center-menu>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import pageLoading from 'base/pageLoading'
import comments from 'base/comments'
import videoCard from './components/video'
import videoCreator from './components/videoCreator'
import videoInfo from './components/videoInfo'
import videoList from 'base/interchangeable'
import generalNav from 'base/generalNav'
import centerMenu from '../../commentsIndex/components/centerMenu'
import api from 'api'
import { Toast } from 'vant'

export default {
  name: '',
  data () {
    return {
      load: true,
      allLoad: { detail: false, comments: false, videoRelated: false },
      videoId: '',
      allTime: 0,
      title: '',
      total: 0,
      playTime: 0,
      praisedCount: 0,
      commentCount: 0,
      shareCount: 0,
      subscribeCount: 0,
      avatarUrl: '',
      nickname: '',
      videoComments: [],
      hotComments: [],
      comments: [],
      isShow: false,
      input: '',
      top: '',
      placeholder: '',
      creatorFixed: false,
      allVideoList: [],
      videoGroup: []
    }
  },
  activated () {
    this.load = true
    this.title = ''
    this.videoId = ''
    this.params = this.$route.params
    const params = this.params
    if (Object.keys(params).length === 0) {
      this.$router.back()
    }
    this.videoId = params.id
    this.getAllInfo(params.id)
  },
  methods: {
    /**
     * 通过 async/await 使得等待函数请求，当全部函数正确请求成功后
     * 改变页面的 loading 状态
     */
    async getAllInfo (id) {
      const detail = await this._getVideoDetail(id)
      const related = await this._getVideoRelated(id)
      const comments = await this._getVideoComments(id)
      if (detail && related && comments) {
        this.load = false
      }
    },
    /**
     * 获取视频详情
     */
    async _getVideoDetail (id) {
      const res = await api.getVideoDetailFn(id)
      const { data } = res
      if (data.code === 200) {
        const { durationms, title, videoGroup, playTime, praisedCount, commentCount, shareCount, subscribeCount } = data.data
        const { avatarUrl, nickname } = data.data.creator
        this.allTime = durationms
        this.title = title
        this.playTime = playTime
        this.praisedCount = praisedCount
        this.commentCount = commentCount
        this.shareCount = shareCount
        this.subscribeCount = subscribeCount
        this.avatarUrl = avatarUrl
        this.nickname = nickname
        this.videoGroup = videoGroup
        return true
      }
      return false
    },
    /**
     * 获取相关视频列表信息
     */
    async _getVideoRelated (id) {
      const res = await api.getVideoRelatedFn(id)
      const { data } = res
      if (data.code === 200) {
        this.allVideoList = data.data
        return true
      }
      return false
    },
    /**
     * 获取视频评论
     */
    async _getVideoComments (id) {
      const res = await api.getVideoCommentsFn(id)
      const { data } = res
      if (data.code === 200) {
        this.total = data.total
        this.hotComments = data.hotComments
        this.comments = data.comments
        return true
      }
      return false
    },
    /**
     * 显示回复评论，
     * 如果是自己的评论显示删除评论
     */
    showMenu () {
      this.isShow = true
    },
    scroll (e) {
      let top = this.$refs.wra.scrollTop
      if (top >= 148) {
        this.creatorFixed = true
        this.top = '1.2rem'
      } else {
        this.creatorFixed = false
        this.top = '0'
      }
    },
    /**
     * 评论内容
     */
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
      const params = this.params
      const id = params.id
      const type = 5
      api.pushComFn(type, id, content)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.input = ''
            loadingToast.clear()
            Toast({
              position: 'bottom',
              message: '发表成功'
            })
            this._getVideoComments(id)
          }
        })
        .catch(err => {
          if (err) {
            loadingToast.clear()
            Toast('当前未登录')
          }
        })
    },
    delCom (comId) {
      const params = this.params
      const id = params.id
      const type = 5
      api.delComFn(type, id, comId)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            // 删除成功
            this.hideMenu()
            this._getVideoComments(id)
          }
        })
    },
    updateShow (val) {
      this.isShow = val
    },
    /**
     * 隐藏标题行
     */
    hideNav () {
      this.$refs.nav.hidden()
    },
    /**
     * 喜欢，点赞该评论
     */
    likeComment (cid, like) {
      const params = this.params
      const id = params.id
      const type = 5
      api.commentLikeFn(id, cid, like, type)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this._getVideoComments(id)
          }
        })
    },
    /**
     * 显示标题行
     */
    blockNav () {
      this.$refs.nav.visible()
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    pageLoading,
    videoCard,
    videoInfo,
    videoCreator,
    generalNav,
    comments,
    videoList,
    centerMenu
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");

@import url("//at.alicdn.com/t/font_1477601_lo5yxiay04f.css");
.topFixed {
  position: fixed;
  width: 100%;
  height: 0.8rem;
  z-index: 9;
}
.fixed {
  .topFixed();
  top: 0;
}
.creatorFixed {
  position: fixed;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  top: 3.8rem;
}
.video-com {
  .nav-color {
    color: #fff;
  }
  .text {
    font-size: 0.4rem;
    .ellipsis();
  }
}
.title {
  font-weight: 700;
  margin: 0.3rem 0;
}
.bottom-wra {
  height: 8rem;
  overflow: scroll;
}
.commentInp {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
