<!--
 * @Author: Lambda
 * @Begin: 2019-11-11 11:49:45
 * @Update: 2019-11-11 13:18:04
 * @Update log: 更新日志
 -->
<template>
  <div class="video-com">
    <general-nav @returnPage="returnPage" ref="nav" class="fixed nav-color">
      <span class="text">最近被弄哭最近被弄哭最近被弄哭最近被弄哭最近被弄哭最近被弄哭</span>
    </general-nav>
    <div class="play-video" ref="playVideo" @touchstart="hideFnBtn">
      <video @canplay="startPlay" @timeupdate="setBarTime" class="video_tag" ref="video" src></video>
      <!-- 阻止工具条冒泡 -->
      <div class="fn-btn" ref="fnBtn" @click.stop>
        <!-- 这里是视频按钮集合 -->
        <span class="center-bofang" ref="button">
          <i
            class="video"
            :class="{videobofang1: pause === `pause`, videozantingtingzhi: play === `play`}"
            @click="playVideo"
          ></i>
        </span>
        <!-- :allTime="item.data.durationms" -->
        <bar class="bar" :time="playTime" :width="progressWidth" @time="changeTime"></bar>
      </div>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import { filterSetPlayCount, filterSetTime } from 'utils/filters'
import pageLoading from 'base/pageLoading'
import circleLoading from 'base/circleLoading'
import bar from '../../audioIndex/components/bar'
import generalNav from 'base/generalNav'
import api from 'api'

export default {
  name: '',
  data () {
    return {
      load: true,
      pause: 'pause',
      play: '',
      timer: null,
      playTime: '00:00',
      allTime: 0,
      progressWidth: 0
    }
  },
  filters: {
    setCount: function (val) {
      return filterSetPlayCount(val)
    },
    setTime: function (val) {
      return filterSetTime(val)
    }
  },
  activated () {
    this.load = true
    this.params = this.$route.params
    const params = this.params
    if (Object.keys(params).length === 0) {
      this.$router.back()
    }
  },
  methods: {
    /**
    * 这里使用了 async/await处理异步
    */
    playVideo (id) {
      this.$nextTick(async () => {
        const video = this.$refs.video
        // 显示loading样式
        this.$refs.load.block()
        // 这里会等待请求数据
        const res = await api.getVideoUrlFn(id)
        // 赋值给src开始加载
        video.src = res.data.urls[0].url
        // // 当没有值的时候，src默认为 http://localhost:8080/，通过判断是否包含localhost来判断当前src的值是否是真正的视频地址
        // 显示相关btn按钮
        if (video.paused) {
          // 暂停 -> 播放
          this.videoPlay(video)
        } else {
          // 播放 -> 暂停
          this.videoPause(video)
        }
      })
    },
    /**
     * 设置当前播放时长
     */
    setBarTime () {
      // 首先我们计算到当前的播放时间
      const video = this.$refs.video
      let minutes = Math.floor(video.currentTime / 60)
      let seconds = Math.floor(video.currentTime - minutes * 60)
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
      let barLength = video.currentTime / video.duration * 100
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
    /**
     * 当前可以播放了
     */
    startPlay () {
      this.$refs.load.none()
    },
    /**
     * 播放视频
     */
    videoPlay (video) {
      video.play()
      this.play = `play`
      this.pause = ``
      this.hideFnBtn()
    },
    /**
     * 当视频正在播放时的事件
     */
    changeTime (time) {
      const video = this.$refs.video
      const current = time * video.duration / 100
      video.currentTime = current
      this.videoPlay(video)
    },
    /**
     * 暂停视频
     */
    videoPause (video) {
      video.pause()
      this.hideFnBtn()
      this.pause = `pause`
      this.play = ``
    },
    /**
     * 在一段时间没有操作后隐藏工具按钮
     */
    hideFnBtn () {
      const _self = this
      _self.$refs.fnBtn.style.display = 'block'
      _self.$refs.nav.block()
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(function () {
        _self.$refs.fnBtn.style.display = 'none'
        _self.$refs.nav.none()
      }, 2000)
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    pageLoading,
    circleLoading,
    bar,
    generalNav
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1477601_lo5yxiay04f.css");
@imgWidth: 100vw;
@imgHeight: 3.8rem;

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

.none {
  display: none;
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
.videotag {
  box-sizing: border-box;
  font-size: 0.2rem;
  color: #ccc;
  padding: 0.04rem 0.13rem;
}
.play-video {
  position: relative;
  width: @imgWidth;
  height: @imgHeight;
  background-color: #222;
  .video_tag {
    position: absolute;
    width: @imgWidth;
    height: @imgHeight;
  }
  .fn-btn {
    width: @imgWidth;
    height: @imgHeight;
    .bar {
      position: absolute;
      bottom: -0.3rem;
      left: 0;
      right: 0;
    }
  }
  .center-bofang {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .videobofang1,
    .videozantingtingzhi {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  .go-count {
    position: absolute;
    bottom: 0.1rem;
    left: 0.1rem;
    .videotag();
    .videobofang {
      font-size: 0.24rem;
      margin-right: 3px;
    }
  }
  .go-time {
    position: absolute;
    bottom: 0.1rem;
    right: 0.1rem;
    .videotag();
    .videoyinlebofangxuanlvjiezou {
      font-size: 0.2rem;
      margin-right: 3px;
    }
  }
  .tag {
    position: absolute;
    top: 0.2rem;
    right: 0.13rem;
    .videotag();
    border-radius: 0.3rem;
    border: 1px solid #777;
  }
  img {
    width: @imgWidth;
    border-radius: 0.2rem;
    height: @imgHeight;
  }
}
</style>
