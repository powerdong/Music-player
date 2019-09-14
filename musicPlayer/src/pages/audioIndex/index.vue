<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-12 13:02:20
 * @Update: 2019-09-14 14:20:57
 * @Update log: 点击歌单中的某一项，将歌单列表信息传入vuex，用来展示歌曲列表，
 *              点击的index 用列表[index]来设置当前要播放的歌曲
 -->
<template>
  <div class="audioPage pd23">
    <audio-nav class="color" @returnPage="returnPage">
      <div>
        <p class="title">{{audioSong ? audioSong.name : ''}}</p>
        <p class="text">
          <span class="art"
                v-for="(item, index) in artist"
                :key="index"
                >{{item.name}}</span>
        </p>
      </div>
    </audio-nav>
    <playing :imgUrl="imgUrl"></playing>
    <play-icons></play-icons>
    <bar :allTime="allTime" :time="playTime" :width="progressWidth" @time="changeTime"></bar>
    <function-button @play="toggle" @prev="prevSong" @next="nextSong"></function-button>
    <audio :src="url" ref="audio" autoplay @canplay="ready" @error="error"></audio>
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
      allTime: 0,
      progressWidth: 0,
      artist: [],
      imgUrl: '',
      readySong: false,
      canSong: true
    }
  },
  computed: {
    ...mapGetters({audioSong: 'AUDIO_ING_SONG',
      state: 'PLAY_STATE',
      index: 'AUDIO_ING_INDEX',
      list: 'AUDIO_LIST'})
  },
  watch: {
    /**
     * 当前歌曲变化，首先查看能不能播放
     * 将一些歌曲信息设置
     */
    audioSong: function (val) {
      this.checkSong(val.id)
      this.allTime = val.duration
      this.artist = val.album.artists
      this.imgUrl = val.album.picUrl
    }
  },
  methods: {
    /**
     * 获取音乐url
     */
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
    /**
     * 查看歌曲是否可以播放
     */
    checkSong (id) {
      api.checkSongFn(id)
        .then(res => {
          const data = res.data
          // 当可以播放的时候请求歌曲url
          if (data.success) {
            this.canSong = true
            this.getSongUrl(id)
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
            // 不能播放的时候选择下一首进行播放
            this.canSong = false
            this.readySong = true
            this.nextSong()
            this.readySong = true
          }
        })
    },
    ...mapMutations({setState: 'SET_PLAY_SATE',
      setIndex: 'SET_AUDIO_INDEX'}),
    /**
     * 播放暂停事件
     */
    toggle () {
      if (this.state) {
        this.toPause()
      } else {
        this.toPlay()
      }
    },
    changeTime (time) {
      const audio = this.$refs.audio
      const current = time * audio.duration / 100
      audio.currentTime = current
    },
    /**
     * 上一首歌曲切换
     */
    prevSong () {
      if (!this.readySong) {
        return
      }
      let nowIndex = this.index - 1
      if (nowIndex === -1) {
        nowIndex = this.list.length - 1
      }
      this.setIndex(nowIndex)
      this.readySong = false
    },
    /**
     * 下一首歌曲切换
     */
    nextSong () {
      if (!this.readySong) {
        return
      }
      console.log(this.index)
      let nowIndex = this.index + 1
      if (nowIndex === this.list.length) {
        nowIndex = 0
      }
      console.log(nowIndex)
      this.setIndex(nowIndex)
      this.readySong = false
    },
    /**
     * 播放歌曲
     */
    toPlay () {
      this.$refs.audio.play()
      this.setState(true)
    },
    /**
     * 暂停歌曲
     */
    toPause () {
      this.$refs.audio.pause()
      this.setState(false)
    },
    /**
     *  当浏览器可以播放资源时
     */
    ready () {
      this.readySong = true
    },
    /**
     * 当在资源加载期间发生错误时
     */
    error () {
      this.readySong = true
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
