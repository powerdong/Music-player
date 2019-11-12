<!--
 * @Author: Lambda
 * @Begin: 2019-10-27 07:48:55
 * @Update: 2019-11-12 19:35:25
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
    <comments
      v-show="!load && hotComments.length"
      title="精彩评论"
      :comments="hotComments"
      class="pd23"
      @showMenu="showMenu"
      @likeComment="likeComment"
    ></comments>
    <comments
      v-show="!load && comments.length"
      title="最新评论"
      :comments="comments"
      :total="total"
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
</template>

<script>
import { Toast } from 'vant'
import generalNav from 'base/generalNav'
import pageLoading from 'base/pageLoading'
import albumList from './components/albumListInfo'
import comments from 'base/comments'
import centerMenu from './components/centerMenu'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      total: 0,
      isShow: false,
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
      return
    }
    if (params.djId) {
      // 专辑
      this.type = 4
      this.id = params.djId
      this._getDjComments(this.id)
    }
  },
  methods: {
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
      const id = params.playlistId || params.albumId || params.djId
      const type = params.playlistId ? 2 : params.albumId ? 3 : params.djId ? 4 : ''
      api.pushComFn(type, id, content)
        .then(res => {
          const { data } = res
          console.log(data)
          if (data.code === 200) {
            this.input = ''
            loadingToast.clear()
            Toast({
              position: 'bottom',
              message: '发表成功'
            })
            this.pushComInCon(params)
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
      const id = params.playlistId || params.albumId || params.djId
      const type = params.playlistId ? 2 : params.albumId ? 3 : params.djId ? 4 : ''
      api.delComFn(type, id, comId)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            // 删除成功
            this.hideMenu()
            this.pushComInCon(params)
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
            this.getOver(data)
          }
        })
    },
    /**
      获取电台节目评论
     */
    _getDjComments (id) {
      api.commentDjFn(id)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.getOver(data)
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
            this.getOver(data)
          }
        })
    },
    /**
     * 通过传入的params判断应该使用哪个方法进行再请求
     */
    pushComInCon (params) {
      if (params.playlistId) {
        this._getPlaylistComments(this.id)
      } else if (params.albumId) {
        this._getAlbumComments(this.id)
      } else if (params.djId) {
        this._getDjComments(this.id)
      }
    },
    /**
     * 获取评论结束后
     * 存下total信息
     * 存下热门评论和最新评论信息
     * loading 关闭
     */
    getOver (data) {
      this.total = data.total
      this.hotComments = data.hotComments
      this.comments = data.comments
      this.load = false
    },
    /**
     * 喜欢，点赞该评论
     */
    likeComment (cid, like) {
      const params = this.params
      const id = params.playlistId || params.albumId || params.djId
      const type = params.playlistId ? 2 : params.albumId ? 3 : params.djId ? 4 : ''
      api.commentLikeFn(id, cid, like, type)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.pushComInCon(params)
          }
        })
    },
    /**
     * 显示回复评论，
     * 如果是自己的评论显示删除评论
     */
    showMenu () {
      this.isShow = true
    },
    /**
     * 隐藏
     */
    hideMenu () {
      this.isShow = false
    },
    updateShow (val) {
      this.isShow = val
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    generalNav,
    albumList,
    comments,
    pageLoading,
    centerMenu
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
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
