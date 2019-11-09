<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-07 12:09:22
 * @Update: 2019-11-08 13:45:23
 * @Update log: 更新日志
 -->
<template>
  <div class="list-item" @click="startSong">
    <div class="img-info" v-if="imgUrl">
      <img v-lazy="imgUrl + '?param=50y50'" :key="imgUrl" v-show="!nowSong" />
      <i class="result yinliang" v-show="nowSong"></i>
    </div>
    <div class="index" v-if="num">
      <span v-show="!nowSong">{{ num }}</span>
      <i class="result yinliang" v-show="nowSong"></i>
    </div>
    <div class="song-info">
      <p class="song-name" :class="{twoLine}">
        <!-- {{songName | setKeyWords}} -->
        <!-- 注意 如果使用 v-html 显示内容可能会把子节点内容覆盖 -->
        <span v-html="songName"></span>
        <span class="alia" v-show="alia">({{alia}})</span>
      </p>
      <p class="song-art" v-if="type==='songList'">
        <span>
          <span class="artist" v-for="(item, index) in artists" :key="index">{{ item.name }}</span>
        </span>
        <span class="album-name">{{ albumName }}</span>
      </p>
      <p class="dj-info" v-if="type==='djList'">
        <span class="data">{{createTime | setMonth}}</span>
        <span class="count">
          <i class="result bofang1"></i>
          {{listenerCount | setNum}}
        </span>
        <span class="time">
          <i class="result shijian"></i>
          {{duration | setTime}}
        </span>
      </p>
    </div>
    <div class="icon" @click.stop="showSlider(itemId)">
      <i class="result diandiandian"></i>
    </div>
  </div>
</template>

<script>
import { filterSetMonth, filterSetPlayCount, filterSetTime } from 'utils/filters'

export default {
  name: '',
  props: {
    songName: {
      type: String
    },
    artists: {
      type: Array
    },
    albumName: {
      type: String
    },
    alia: {
      type: String
    },
    imgUrl: {
      type: String
    },
    num: {
      type: Number
    },
    type: {
      type: String,
      default: 'songList'
    },
    itemId: {
      type: Number
    },
    createTime: {
      type: Number
    },
    listenerCount: {
      type: Number
    },
    duration: {
      type: Number
    },
    nowSong: {
      type: Boolean,
      default: false
    },
    twoLine: {
      type: Boolean
    },
    keywords: {
      type: String
    }
  },
  filters: {
    setMonth: function (value) {
      return filterSetMonth(value)
    },
    setNum: function (value) {
      return filterSetPlayCount(value)
    },
    setTime: function (value) {
      return filterSetTime(value)
    }
  },
  methods: {
    startSong () {
      this.$emit('beginSong')
    },
    showSlider (id) {
      this.$emit('showSlider', id)
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1380711_cftenqb5flc.css");

.list-item {
  .flex-between();
  align-items: center;
  height: 1.2rem;
  .index {
    color: #999;
  }
  .yinliang {
    color: @bgcolor;
  }
  .img-info {
    width: 0.7rem;
    height: 0;
    padding-bottom: 0.7rem;
    margin-right: 0.2rem;
    position: relative;
    img {
      border-radius: 0.1rem;
      width: 0.7rem;
      height: 0.7rem;
    }
    .yinliang {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .song-info {
    display: flex;
    flex-direction: column;
    .song-name {
      width: 75vw;
      max-height: 0.4rem;
      line-height: 0.4rem;
      .ellipsis();
      .alia {
        color: #7c7b7d;
      }
      &.twoLine {
        max-height: 0.8rem;
        white-space: normal;
        .twoLinesEllipsis();
      }
    }
    .song-art {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.23rem;
      color: #dacdcd;
      width: 75vw;
      .ellipsis();
      .artist {
        &::after {
          content: "/";
        }
        &:last-child::after {
          content: "";
        }
      }
      .album-name {
        &::before {
          content: "-";
        }
      }
    }
    .dj-info {
      font-size: 0.2rem;
      line-height: 1.5;
      color: #ccc;
      .result {
        font-size: 0.2rem;
      }
      .data,
      .count {
        margin-right: 0.2rem;
      }
    }
  }
  .icon {
    color: #ccc;
  }
}
</style>
