<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-02 13:36:42
 * @Update: 2019-09-02 21:46:07
 * @Update log: 这是一个公共的组件，用来展示搜索展示页面除单曲以外的项目
 * 通过props接收对应的结果，渲染。
 * 组件调用是通过 for 循环组件，来循环组件渲染的
 -->
<template>
  <div class="list-item">
    <div class="img-info"
        :class="{ bigImg: videoList,
                  smallImg: songList,
                  circle: artist,
                  album
                }">
      <span class="count" v-if="playTime">
        <i class="result bofang1" ></i>
        {{playTime | numRule}}
      </span>
      <img :src="ImgUrl" alt="">
    </div>
    <div class="info-content">
      <div class="play-name">{{name}}</div>
      <div class="play-tag">
        <p class="album" v-if="artists">
          <span class="album-art"
                v-for="(item, index) in artists"
                :key="index">{{item.name}}
          </span>
          <span class="time">
            {{durationms | setYear}}
          </span>
        </p>
        <p class="video" v-if="videoList">
            <span class="time">
            {{durationms | setTime}}
            <span>by
              <span class="video-art"
                    v-for="(item, index) in nicknames"
                    :key="index">{{item.userName}}
              </span>
            </span>
          </span>
        </p>
        <p class="song-list" v-if="songList" >
          <span class="song-num">{{trackCount}}首</span>
          <span class="song-art">by {{nickname}},</span>
          <span class="play-count">播放{{playCount | numRule}}次</span>
        </p>
      </div>
    </div>
    <span class="artist-is-in" v-if="isIn" ><i class="result yonghufangkeshu"></i> 已入驻</span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    videoList: {
      type: Boolean,
      default: false
    },
    artists: {
      type: Array
    },
    album: {
      type: Boolean,
      default: false
    },
    isIn: {
      type: Number
    },
    artist: {
      type: Boolean,
      default: false
    },
    playTime: {
      type: Number
    },
    durationms: {
      type: Number
    },
    nicknames: {
      type: Array
    },
    songList: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    trackCount: {
      type: Number
    },
    nickname: {
      type: String
    },
    playCount: {
      type: Number
    },
    title: {
      type: String
    },
    ImgUrl: {
      type: String
    },
    more: {
      type: Boolean
    },
    moreText: {
      type: String
    }
  },
  filters: {
    // 将播放次数进行格式转换
    numRule: function (value) {
      if (!value) return ''
      if (value > 10000) {
        value = parseInt(value / 10000) + '万'
      } else if (value > 100000000) {
        value = (value / 100000000).toFixed(1) + '亿'
      }
      return value
    },
    // 将毫秒数转换为正常的时间
    // 212245 ==> 03:32
    setTime: function (value) {
      if (!value) return ''
      let min = parseInt(value / (1000 * 60))
      if (min < 10) {
        min = '0' + min
      }
      let sec = parseInt(value % (1000 * 60) / 1000)
      if (sec < 10) {
        sec = '0' + sec
      }
      value = `${min}:${sec}`
      return value
    },
    setYear: function (value) {
      const oDate = new Date(value)
      const oYear = oDate.getFullYear()
      const oMonth = oDate.getMonth() + 1
      const oDay = oDate.getDate()
      value = `${oYear}.${oMonth}.${oDay}`
      return value
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.list-item{
  margin-top: 0.26rem;
  width: 100%;
  height: 1.6rem;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  .img-info{
    position: relative;
    box-sizing: border-box;
    height: 0;
    background-color: #ccc;
    &.bigImg{
      width: 2.8rem;
      padding-bottom: 1.4rem;
      img{
        width: 2.8rem;
        height: 1.4rem;
        border-radius: 0.1rem;
      }
    }
    &.smallImg{
      width: 1.6rem;
      padding-bottom: 1.6rem;
      img{
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    &.circle{
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    &.album{
      width: 1.6rem;
      padding-bottom: 1.6rem;
      img{
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    .count{
      position: absolute;
      color: #fff;
      right: 5px;
      top: 5px;
      font-size: 0.13rem;
      .bofang1{
        font-size: 0.13rem;
      }
    }
  }
  .info-content{
    margin-left: 0.23rem;
    .play-name{
      line-height: 0.4rem;
      .twoLinesEllipsis();
    }
    .play-tag{
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      color: #666;
      .album-art{
        &::after{
          content: "/";
        }
        &:last-child::after{
          content: "";
        }
      }
      .song-num{
        margin-right: 0.13rem;
      }
      .song-art{
        margin-right: 0.13rem;
      }
    }
  }
  .artist-is-in{
    margin-left: auto;
    .yonghufangkeshu{
      color:@bgcolor;
    }
  }
}
</style>
