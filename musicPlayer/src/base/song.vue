<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-07 12:09:22
 * @Update: 2019-09-17 11:05:22
 * @Update log: 更新日志
 -->
<template>
  <div class="list-item" @click="startSong">
    <div class="img-info" v-if="imgUrl">
      <img :src="imgUrl" v-show="!nowSong">
      <i class="result yinliang" v-show="nowSong"></i>
    </div>
    <div class="index" v-if="num">
      <span v-show="!nowSong">{{ num }}</span>
      <i class="result yinliang" v-show="nowSong"></i>
    </div>
    <div class="song-info">
      <p class="song-name">{{songName}}</p>
      <p class="song-art">
        <span>
          <span class="artist" v-for="(item, index) in artists" :key="index">
            {{ item.name }}
          </span>
        </span>
        <span class="album-name">
          {{ albumName }}
        </span>
      </p>
    </div>
    <div class="icon">
        <i class="result diandiandian"></i>
    </div>
  </div>
</template>

<script>
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
    imgUrl: {
      type: String
    },
    num: {
      type: Number
    },
    nowSong: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    startSong () {
      this.$emit('beginSong')
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
@import url('//at.alicdn.com/t/font_1380711_qksi58kw6ae.css');

.list-item{
.flex-between();
align-items: center;
height: 1rem;
.index{
  color: #999;
}
.yinliang{
  color:@bgcolor;
}
.img-info{
  width: 0.7rem;
  height: 0;
  padding-bottom: 0.7rem;
  margin-right: 0.2rem;
  position: relative;
  img{
    border-radius: 0.1rem;
    width: 0.7rem;
    height: 0.7rem;
  }
  .yinliang{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
.song-info{
  display: flex;
  flex-direction: column;
  .song-name{
    width: 75vw;
    height: 0.4rem;
    line-height: 0.4rem;
    .ellipsis();
  }
  .song-art{
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.23rem;
    color: #dacdcd;
    width: 75vw;
    .ellipsis();
    .artist{
      &::after{
      content: "/";
      }
      &:last-child::after{
        content: "";
      }
    }
    .album-name{
      &::before{
        content: "-"
      }
    }
  }
}
.icon{
  color: #ccc;
}
}
</style>
