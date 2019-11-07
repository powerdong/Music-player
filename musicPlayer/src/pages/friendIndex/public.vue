<!--
 * @Author: Lambda
 * @Begin: 2019-10-26 10:49:45
 * @Update: 2019-11-07 13:42:18
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div class="wrapper border-bottom" v-for="(item, index) in data" :key="index">
      <div class="img-info">
        <img :src="item.video.creator.avatarUrl" alt />
      </div>
      <div class="author">
        <h1 class="nickname">
          {{item.video.creator.nickname}}
          <span class="category">发布</span>
        </h1>
        <span class="fans">{{item.userReason}}</span>
        <h1 class="title">{{item.msg}}</h1>
        <div class="videoInfo">
          <img ref="videoImg" :src="item.video.coverUrl + '?param=360y170'" alt />
          <circle-loading type="absolute" class="none" ref="load"></circle-loading>
          <div class="play-video" ref="playVideo" @touchstart="hideFnBtn(index)">
            <video
              @canplay="startPlay(index)"
              @timeupdate="setBarTime(index)"
              class="video_tag"
              ref="video"
              src="localhost"
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
                :allTime="item.video.durationms"
                :time="playTime"
                :width="progressWidth"
              ></bar>
              <!-- @time="changeTime" -->
            </div>
          </div>
          <span class="center-bofang">
            <i class="video videobofang1" @click="playVideo(index, item.data.vid)"></i>
          </span>
          <span class="go-count">
            <i class="video videobofang"></i>
            {{item.video.playTime | setCount}}
          </span>
          <span class="go-time">
            <i class="video videoyinlebofangxuanlvjiezou"></i>
            {{item.video.durationms | setTime}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filterSetPlayCount, filterSetTime } from 'utils/filters'
import circleLoading from 'base/circleLoading'
import bar from '../audioIndex/components/bar'
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
  components: {
    circleLoading,
    bar
  }
}
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1477601_lo5yxiay04f.css");

@import url("~styles/global.less");

@imgWidth: 5.4rem;
@imgHeight: 2.8rem;

.none {
  display: none;
}

.videotag {
  box-sizing: border-box;
  font-size: 0.2rem;
  color: #ccc;
  padding: 0.04rem 0.13rem;
}
.wrapper {
  display: flex;
  padding-bottom: 0.3rem;
  margin: 0.3rem 0;
  .img-info {
    width: 1rem;
    height: 0;
    padding-bottom: 1rem;
    margin-right: 0.2rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .author {
    flex: 1;
    line-height: 1.5;
    .nickname {
      color: #3399ea;
      .category {
        color: #7b7c7d;
      }
    }
    .fans {
      font-size: 0.2rem;
      color: #7b7c7d;
    }
    .img-content {
      width: 5.4rem;
      height: 0;
      padding-bottom: 2rem;
      img {
        width: 100%;
        border-radius: 0.2rem;
      }
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
            bottom: -0.3rem;
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
  }
}
</style>
