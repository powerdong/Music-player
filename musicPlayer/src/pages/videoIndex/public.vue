<!--
 * @Author: Lambda
 * @Begin: 2019-10-26 08:48:50
 * @Update: 2019-11-05 14:00:14
 * @Update log: 更新日志
 -->
<template>
  <div>
    <div v-for="(item, index) in data" :key="index">
      <div class="videoInfo pd23">
        <img ref="videoImg" :src="item.data.coverUrl + '?param=360y170'" alt />
        <circle-loading type="absolute" class="none" ref="load"></circle-loading>
        <div class="play-video" ref="playVideo" @touchstart="hideFnBtn(index)">
          <video
            @canplay="startPlay(index)"
            @timeupdate="setBarTime(index)"
            class="video_tag"
            ref="video"
            src
          ></video>
          <!-- 阻止工具条冒泡 -->
          <div class="fn-btn" ref="fnBtn" @click.stop>
            <!-- 这里是视频按钮集合 -->
            <span class="center-bofang" ref="button">
              <i
                class="video"
                :class="{videobofang1: pause === `pause${index}`, videozantingtingzhi: play === `play${index}`}"
                @click="playVideo(index)"
              ></i>
            </span>
            <bar
              class="bar"
              :index="index"
              :allTime="item.data.durationms"
              :time="playTime"
              :width="progressWidth"
              @time="changeTime"
            ></bar>
          </div>
        </div>
        <span class="tag">{{ item.data.videoGroup ? item.data.videoGroup[0].name : ''}}</span>
        <span class="center-bofang">
          <i class="video videobofang1" @click="playVideo(index, item.data.vid)"></i>
        </span>
        <span class="go-count">
          <i class="video videobofang"></i>
          {{item.data.playTime | setCount}}
        </span>
        <span class="go-time">
          <i class="video videoyinlebofangxuanlvjiezou"></i>
          {{item.data.durationms | setTime}}
        </span>
      </div>
      <h1 class="title pd23">{{item.data.title}}</h1>
      <div class="bottom border-top pd23">
        <div class="creator">
          <div class="img-info">
            <img :src="item.data.creator.avatarUrl + '?param=50y50'" alt />
          </div>
          <span class="name">{{item.data.creator.nickname}}</span>
        </div>
        <div class="button">
          <!-- 点赞 -->
          <span class="praised">
            <i class="video videozan"></i>
            <i class="praised-num">{{item.data.praisedCount | setCount}}</i>
          </span>
          <!-- 评论 -->
          <span class="comment">
            <i class="video videopinglun"></i>
            <i class="comment-num">{{item.data.commentCount | setCount}}</i>
          </span>
          <!-- 分享 -->
          <span class="share">
            <i class="video videodiandiandian"></i>
          </span>
        </div>
      </div>
      <div class="split"></div>
    </div>
  </div>
</template>

<script>
import { filterSetPlayCount, filterSetTime } from 'utils/filters'
import circleLoading from 'base/circleLoading'
import bar from '../audioIndex/components/bar'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      pause: '',
      play: '',
      timer: null,
      playTime: '00:00',
      allTime: 0,
      progressWidth: 0
    }
  },
  props: {
    data: {
      type: Array
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
  methods: {
    /**
    视频点击播放思路：
    首先视频标签使用 data-src 获取真正地址，src为空，video标签隐藏
    点击播放按钮，图片隐藏，video 获取到真正的 src 地址，显示，播放
    当播放时下方的数据隐藏显示
    */
    /**
    * 这里使用了 async/await处理异步
    */
    async playVideo (index, id) {
      const video = this.$refs.video[index]
      // 当没有值的时候，src默认为 http://localhost:8080/，通过判断是否包含localhost来判断当前src的值是否是真正的视频地址
      if (video.src.includes('localhost')) {
        // 显示loading样式
        this.$refs.load[index].block()
        // 这里会等待请求数据
        const res = await api.getVideoUrlFn(id)
        // 赋值给src开始加载
        video.src = res.data.urls[0].url
      }
      this.showFnBtn(index)
      if (video.paused) {
        // 暂停 -> 播放
        this.videoPlay(video, index)
      } else {
        // 播放 -> 暂停
        this.videoPause(video, index)
      }
    },
    /**
     * 显示相关按钮
     */
    showFnBtn (index) {
      this.$refs.fnBtn[index].style.zIndex = 2
      this.play = `play${index}`
    },
    /**
     * 设置当前播放时长
     */
    setBarTime (index) {
      // 首先我们计算到当前的播放时间
      const video = this.$refs.video[index]
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
    startPlay (index) {
      const videoBtn = this.$refs.playVideo[index]
      videoBtn.style.zIndex = 2
      this.$refs.load[index].none()
    },
    /**
     * 播放视频
     */
    videoPlay (video, index) {
      video.play()
      this.play = `play${index}`
      this.pause = ``
      this.hideFnBtn(index)
    },
    changeTime (time, index) {
      const video = this.$refs.video[index]
      const current = time * video.duration / 100
      video.currentTime = current
      this.videoPlay(video, index)
    },
    /**
     * 暂停视频
     */
    videoPause (video, index) {
      video.pause()
      this.hideFnBtn(index)
      this.pause = `pause${index}`
      this.play = ``
    },
    hideFnBtn (index) {
      const _self = this
      this.showFnBtn(index)
      _self.$refs.fnBtn[index].style.display = 'block'
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(function () {
        _self.$refs.fnBtn[index].style.display = 'none'
      }, 2000)
    }
  },
  components: {
    circleLoading,
    bar
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1477601_lo5yxiay04f.css");
@imgWidth: 6.7rem;
@imgHeight: 3.8rem;

.none {
  display: none;
}

.videotag {
  box-sizing: border-box;
  font-size: 0.2rem;
  color: #ccc;
  padding: 0.04rem 0.13rem;
}
.videoInfo {
  position: relative;
  width: @imgWidth;
  padding-bottom: @imgHeight;
  height: 0;
  margin-top: 0.23rem;
  .play-video {
    position: absolute;
    top: 0;
    width: @imgWidth;
    height: @imgHeight;
    background-color: #222;
    border-radius: 0.2rem;
    z-index: -1;
    .video_tag {
      position: absolute;
      width: @imgWidth;
      border-radius: 0.2rem;
      height: @imgHeight;
    }
    .fn-btn {
      width: @imgWidth;
      height: @imgHeight;
      .bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
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
.title {
  line-height: 1.5;
  margin: 0.2rem 0;
  .twoLinesEllipsis();
}
.bottom {
  height: 1rem;
  .flex-between();
  align-items: center;
  .creator {
    display: flex;
    align-items: center;
    .name {
      max-width: 3rem;
      .ellipsis();
    }
    .img-info {
      width: 0.5rem;
      height: 0;
      padding-bottom: 0.5rem;
      margin-right: 3px;
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
      }
    }
  }
  .button {
    .praised,
    .comment {
      position: relative;
      margin-right: 0.7rem;
      .praised-num,
      .comment-num {
        position: absolute;
        font-size: 0.1rem;
        top: -3px;
        right: 0;
        transform: translateX(60%);
        background-color: #fff;
      }
    }
  }
}
</style>
