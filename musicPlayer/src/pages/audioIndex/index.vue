<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-12 13:02:20
 * @Update: 2019-09-13 16:38:44
 * @Update log: 点击歌单中的某一项，将歌单列表信息传入vuex，用来展示歌曲列表，
 *              点击的index 用列表[index]来设置当前要播放的歌曲
 -->
<template>
  <div class="audioPage pd23">
    <audio-nav class="color" @returnPage="returnPage">
      <div>
        <p class="title">{{audioSong.name}}</p>
        <p class="text">
          <span class="art"
                v-for="(item, index) in audioSong.album.artists"
                :key="index"
                >{{item.name}}</span>
        </p>
      </div>
    </audio-nav>
    <playing :imgUrl="audioSong.album.picUrl"></playing>
    <play-icons></play-icons>
    <bar :allTime="allTime" :time="playTime" :width="progressWidth"></bar>
    <function-button @play="toggle"></function-button>
    <audio :src="url" ref="audio" autoplay></audio>
  </div>
</template>

<script>
import api from 'api'
import audioNav from 'base/generalNav'
import playing from './components/playing'
import playIcons from './components/playIcons'
import bar from './components/bar'
import functionButton from './components/functionButton'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: '',
  components: {
    audioNav,
    playing,
    playIcons,
    bar,
    functionButton
  },
  data () {
    return {
      url: '',
      playTime: '00:00',
      allTime: '',
      progressWidth: 0
    }
  },
  computed: {
    ...mapGetters({audioSong: 'AUDIO_ING_SONG', state: 'PLAY_STATE'})
  },
  watch: {
    audioSong: function (val) {
      this.getSongUrl(val.id)
      this.allTime = val.duration
    }
  },
  methods: {
    getSongUrl (id) {
      api.songUrlFn(id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.url = data.data[0].url
            this.audioTimeUpdate()
            this.toPlay()
          }
        })
    },
    ...mapMutations({setState: 'SET_PLAY_SATE'}),
    toggle () {
      if (this.state) {
        this.toPause()
      } else {
        this.toPlay()
      }
    },
    /**
     * 播放歌曲
     */
    toPlay () {
      this.$refs.audio.play()
      this.setState(true)
    },
    /**
     * 暂停
     */
    toPause () {
      this.$refs.audio.pause()
      this.setState(false)
    },
    /**
     * 添加歌曲时间更新事件
     */
    audioTimeUpdate () {
      this.$refs.audio.addEventListener('timeupdate', this.setTime)
    },
    /**
     * 设置当前播放时长
     */
    setTime () {
      // 首先我们计算到当前的播放时间
      const audio = this.$refs.audio
      let minutes = Math.floor(audio.currentTime / 60)
      let seconds = Math.floor(audio.currentTime - minutes * 60)
      let minuteValue
      let secondValue
      // 进行格式转换，当分钟小于10的时候，在前面加0
      if (minutes < 10) {
        minuteValue = '0' + minutes
      } else {
        minuteValue = minutes
      }
      // 秒数的格式设置
      if (seconds < 10) {
        secondValue = '0' + seconds
      } else {
        secondValue = seconds
      }
      // 进行时间值拼接，展示到页面
      let audioTime = minuteValue + ':' + secondValue
      this.playTime = audioTime
      // // 进度条的长度计算
      let barLength = audio.currentTime / audio.duration * 100
      this.setProgress(barLength)
    },
    /**
     * 设置进度条长度
     */
    setProgress (val) {
      if (val < 0 || val > 100) {
        return
      }
      this.progressWidth = val
    },
    returnPage () {
      console.log(111)
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1410851_5avwhgnvef.css');
@import url('~styles/global.less');
.audioPage{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: #7f8c8d;
  .color{
    color: #fff;
  }
  .title{
    color: #fff;
    line-height: 1.5;
  }
  .text{
    font-size: 0.24rem;
    color: #bdc3c7;
    .art{
      &::after{
        content: "/";
      }
      &:last-child::after{
        content:''
      }
    }
  }
}
</style>
