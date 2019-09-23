/*
 * @Author: 李浩栋
 * @Begin: 2019-09-21 15:14:40
 * @Update: 2019-09-22 17:39:22
 * @Update log: 更新日志
 */

import {
  mapGetters
} from 'vuex'
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
