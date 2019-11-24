/*
 * @Author: 李浩栋
 * @Begin: 2019-09-21 15:14:40
 * @Update: 2019-11-24 12:59:18
 * @Update log: 更新日志
 */

import {
  mapGetters
} from 'vuex'
import api from 'api'
import isInSport from 'utils/scrollStopVideo'

/**
 * 这里包含对于不同模式下的icon展示
 * 对于更改mode
 * 对播放列表的展示隐藏
 */
export const audio = {
  props: {
    mode: {
      type: Number
    }
  },
  computed: {
    modeClass: function () {
      switch (this.mode) {
        case 0: // 列表循环
          return 'audioxunhuan'
        case 1: // 单曲循环
          return 'audiosingle-loop'
        case 2: // 随机播放
          return 'audiosuiji'
      }
    }
  },
  methods: {
    changeMode () {
      this.$emit('changeMode')
    },
    showAudioList () {
      this.$emit('showAudioList')
    }
  }
}

let timer = null

export const videoPage = {
  data () {
    return {
      data: [],
      load: true,
      isLogin: +localStorage.getItem('loginState') || 0
    }
  },
  created () {
    this._getVideoDetail(this.$route.params.id)
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
    },
    getIndex (index) {
      this.index = index
    }
  }
}

/**
 * 当页面显示了播放组件，页面整体需要设置paddingBottom
 * 大小为迷你播放器的高度
 */

export const paddingBottom = {
  computed: {
    ...mapGetters({
      miniAudio: 'FULL_SCREEN'
    })
  },
  mounted () {
    console.log(this.miniAudio)
    if (!this.miniAudio) {
      this.setPagePb()
    }
  },
  watch: {
    /**
     * 监听当前是否播放
     */
    miniAudio: function (val) {
      if (!val) {
        this.setPagePb()
      }
    }
  },
  methods: {
    setPagePb () {
      this.$refs.wrapper.style.paddingBottom = '1.3rem'
    }
  }
}
