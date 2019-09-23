<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-14 17:51:26
 * @Update: 2019-09-22 17:18:10
 * @Update log: 更新日志
 -->
<template>
 <div class="bottom-audio  border-top pd23" @click="returnFull">
   <div class="img-info" ref="circle">
      <img :src="imgUrl" alt="">
   </div>
   <div class="con-info">
     <p class="name">{{name}}</p>
     <p class="lrc">{{ lyric }}</p>
   </div>
   <div class="button">
      <span class="circle"><i class="audio" @click.stop="play" :class="{audiozantingtingzhi: isPlay, audiobofang2: !isPlay}"></i></span>
      <i class="audio audioliebiao" @click.stop="showAudioList"></i>
   </div>
 </div>
</template>

<script>
import {audio} from 'mixins/Mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [audio],
  name: '',
  props: {
    imgUrl: {
      type: String
    },
    name: {
      type: String
    },
    lyric: {
      type: String
    },
    artist: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({isPlay: 'PLAY_STATE'})
  },
  methods: {
    play () {
      this.$emit('play')
    },
    returnFull () {
      this.$emit('returnFull')
    }
  },
  watch: {
    isPlay: function (val) {
      if (val) {
        this.$refs.circle.style.animationPlayState = 'running'
      } else {
        this.$refs.circle.style.animationPlayState = 'paused'
      }
    },
    lyric: function (val) {
      let artistName
      if (!val) {
        this.artist.forEach(element => {
          artistName += element.name
        })
        val = artistName

        console.log(val)
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

.bottom-audio{
  display: flex;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 1rem;
  bottom: 0;
  z-index: 9;
  background-color: #fff;
  .img-info{
    width: 0.7rem;
    height: 0;
    padding-bottom: 0.7rem;
    border-radius: 50%;
    overflow: hidden;
    animation: rotating 24s linear infinite;
    transform-origin: center;
    img{
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  .con-info{
    margin-left: 0.16rem;
    width: 4.6rem;
    .name{
      font-size: 0.26rem;
      line-height: 1.5;
      .ellipsis();
    }
    .lrc{
      font-size: 0.2rem;
      line-height: 1.5;
      .ellipsis();
    }
  }
  .button{
    .audio{
      box-sizing: border-box;
      margin-left: 0.12rem;
      font-size: 0.4rem;
    }
    .circle{
      display: inline-block;
      text-align: center;
      line-height: 0.4rem;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      margin-left: 0.1rem;
      .audio{
        margin-left: 0;
        font-size: 0.3rem;
      }
    }
  }
}
@keyframes rotating {
  0% {
    transform:  rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
