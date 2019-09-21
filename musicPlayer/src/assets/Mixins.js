/*
 * @Author: 李浩栋
 * @Begin: 2019-09-21 15:14:40
 * @Update: 2019-09-21 15:14:40
 * @Update log: 更新日志
 */
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
