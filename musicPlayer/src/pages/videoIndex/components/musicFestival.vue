<!--
 * @Author: Lambda
 * @Begin: 2019-10-25 13:31:37
 * @Update: 2019-11-23 11:47:13
 * @Update log: 更新日志
 -->
<template>
  <div class="container-wra" @scroll="hideVideo">
    <page-loading v-show="load"></page-loading>
    <public-img-card :data="data" @index="getIndex" v-show="!load" ref="public"></public-img-card>
    <should-login v-show="isLogin === 0"></should-login>
  </div>
</template>

<script>
import api from 'api'
import publicImgCard from '../public'
import pageLoading from 'base/pageLoading'
import isInSport from 'utils/scrollStopVideo'
import shouldLogin from 'base/shouldLogin'

let timer = null
export default {
  name: '',
  data () {
    return {
      data: [],
      load: true,
      index: 0,
      isLogin: +localStorage.getItem('loginState') || 0
    }
  },
  created () {
    this._getVideoDetail(58104)
  },
  methods: {
    _getVideoDetail (id) {
      api.getVideoGroupFn(id)
        .then(res => {
          const {
            data
          } = res
          if (data.code === 200) {
            this.data = data.datas
            this.load = false
          }
        })
        .catch(err => {
          if (err) {
            this.load = false
          }
        })
    },
    hideVideo () {
      const self = this
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        this.stopVideo(self)
      }, 300)
    },
    /**
     * 这里或得到子组件传过来的当前播放的video索引
     */
    getIndex (index) {
      this.index = index
    },
    stopVideo (self) {
      // 父容器
      const wra = self.$el
      // video集合
      const videos = [...wra.querySelectorAll('.video-item')]
      // 获取到当前正在播放的video
      const ele = videos[this.index]
      // 查看当前播放的video是否已经出去！！！
      if (!isInSport(ele, wra)) {
        // 出去的话调用方法，停止视频播放
        self.$refs.public.stopVideoTag()
      }
    }
  },
  components: {
    publicImgCard,
    pageLoading,
    shouldLogin
  }
}
</script>

<style lang='less' scoped>
</style>
