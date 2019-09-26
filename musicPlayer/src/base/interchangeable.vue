<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-02 13:36:42
 * @Update: 2019-09-23 17:37:31
 * @Update log: 这是一个公共的组件，用来展示搜索展示页面除单曲以外的项目
 * 通过props接收对应的结果，渲染。
 * 组件调用是通过 for 循环组件，来循环组件渲染的
 -->
<template>
  <div class="list-item">
    <!-- 左边的图片展示区域，用不同的类名展示不同的效果 -->
    <!-- 在歌单 视频 用户 等三种的图片展示样式不同 -->
    <div
      class="img-info"
      :class="{ bigImg: videoList,
                smallImg: songList,
                circle,
                album,
                dj
                }"
    >
      <!-- 视频的播放量 -->
      <span class="count" v-if="playTime">
        <i class="result bofang1"></i>
        {{playTime | numRule}}
      </span>
      <!-- 图片链接 -->
      <img :src="ImgUrl" alt />
    </div>
    <!-- 右侧的相关文字信息 -->
    <div class="info-content">
      <!-- 标题文字 -->
      <div class="play-name">
        {{name}}
        <!-- 在用户区域用类名显示不同的用户性别图标 -->
        <i
          class="result"
          :class="{
                  nan: gender === 1,
                  nv: gender === 2
                  }"
          v-if="gender"
        ></i>
      </div>
      <!-- 右侧信息说明文字 由于各项的展示方式不同，所以分开编写 -->
      <div class="play-tag">
        <!-- 作者 -->
        <p class="user">{{nickname}}</p>
        <!-- 电台展示 -->
        <p class="dj" v-if="dj">
          <span class="dj-art">{{nicknames.nickname}}</span>
        </p>
        <!-- 专辑展示 -->
        <p class="album" v-if="artists">
          <span>
            <span class="album-art" v-for="(item, index) in artists" :key="index">{{item.name}}</span>
          </span>
          <span class="time">{{durationms | setYear}}</span>
        </p>
        <!-- 视频展示 -->
        <p class="video" v-if="videoList">
          <span class="time">
            {{durationms | setTime}}
            <span>
              by
              <span
                class="video-art"
                v-for="(item, index) in nicknames"
                :key="index"
              >{{item.userName}}</span>
            </span>
          </span>
        </p>
        <!-- 歌单列表展示 -->
        <p class="song-list" v-if="songList">
          <span class="song-num">{{trackCount}}首</span>
          <span class="song-art">by {{nickname}},</span>
          <span class="play-count">播放{{playCount | numRule}}次</span>
        </p>
      </div>
    </div>
    <!-- 展示歌手是否已入驻 -->
    <span class="artist-is-in" v-if="isIn">
      <i class="result yonghufangkeshu"></i> 已入驻
    </span>
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
    gender: {
      type: Number,
      default: 0
    },
    artists: {
      type: Array
    },
    dj: {
      type: Boolean,
      default: false
    },
    album: {
      type: Boolean,
      default: false
    },
    isIn: {
      type: Number
    },
    circle: {
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
      type: [Array, Object]
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
    /**
     * 将播放次数进行格式转换
     */
    numRule: function (value) {
      if (!value) return ''
      if (value > 10000) {
        value = parseInt(value / 10000) + '万'
      } else if (value > 100000000) {
        value = (value / 100000000).toFixed(1) + '亿'
      }
      return value
    },
    /**
     * 将毫秒数转换为正常的时间
     *  212245 ==> 03:32
    */
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
    /**
     * 将毫秒转换为 年月日
     */
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
@import url("~styles/global.less");
.list-item {
  margin-top: 0.26rem;
  width: 100%;
  height: 1.6rem;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  .img-info {
    position: relative;
    box-sizing: border-box;
    height: 0;
    background-color: #ccc;
    border-radius: 0.1rem;
    img {
      overflow: hidden;
      border-radius: 0.1rem;
    }
    &.bigImg {
      width: 2.8rem;
      padding-bottom: 1.4rem;
      img {
        width: 2.8rem;
        height: 1.4rem;
      }
    }
    &.smallImg {
      width: 1.6rem;
      padding-bottom: 1.6rem;
      img {
        width: 100%;
      }
    }
    &.circle {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    &.album {
      width: 1.6rem;
      padding-bottom: 1.6rem;
      img {
        width: 100%;
      }
    }
    &.dj {
      width: 1.6rem;
      padding-bottom: 1.6rem;
      img {
        width: 100%;
      }
    }
    .count {
      position: absolute;
      color: #fff;
      right: 5px;
      top: 5px;
      font-size: 0.13rem;
      .bofang1 {
        font-size: 0.13rem;
      }
    }
  }
  .info-content {
    margin-left: 0.23rem;
    .play-name {
      line-height: 0.4rem;
      .twoLinesEllipsis();
      .nan {
        color: #00cec9;
      }
      .nv {
        color: #fd79a8;
      }
    }
    .play-tag {
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      color: #666;
      .album-art {
        &::after {
          content: "/";
        }
        &:last-child::after {
          content: "";
        }
      }
      .time {
        margin-left: 0.13rem;
      }
      .song-num {
        margin-right: 0.13rem;
      }
      .song-art {
        margin-right: 0.13rem;
      }
    }
  }
  .artist-is-in {
    margin-left: auto;
    .yonghufangkeshu {
      color: @bgcolor;
    }
  }
}
</style>
