<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-13 13:33:12
 * @Update: 2019-09-15 10:31:01
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper">
   <i class="audio" :class="[modeClass]" @click.self="changeMode"></i>
   <i class="audio audioxiayishou1" @click.self="prev"></i>
   <i class="audio" @click="play" :class="{audiobofang1: isPlay, audiobofang: !isPlay}"></i>
   <i class="audio audioxiayishou" @click.self="next"></i>
   <i class="audio audioliebiao"></i>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  computed: {
    ...mapGetters({isPlay: 'PLAY_STATE'}),
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
  props: {
    mode: {
      type: Number
    }
  },
  methods: {
    play () {
      this.$emit('play')
    },
    prev () {
      this.$emit('prev')
    },
    next () {
      this.$emit('next')
    },
    changeMode () {
      this.$emit('changeMode')
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .pinglun{
    position: relative;
    .com-num{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0.24rem;
      padding: 0.03rem;
      box-sizing: border-box;
      background-color: #7f8c8d;
      color: #bdc3c7;
    }
  }
  .audio{
    font-size: 0.5rem;
    color: #bdc3c7;
    &:nth-of-type(3){
      font-size: 1rem;
    }
  }
}
</style>
