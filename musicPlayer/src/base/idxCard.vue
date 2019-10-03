<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-09 13:31:02
 * @Update: 2019-09-23 17:37:52
 * @Update log: 排行榜中官方榜展示组件
 -->
<template>
  <div>
    <div class="list" @click="searchIdx(idx)">
      <div class="img-info">
        <img :src="imgUrl" alt />
        <span class="time">{{ updateTime }}</span>
      </div>
      <div class="list-con">
        <div class="info" v-for="(item, index) in tracks" :key="index">
          {{index + 1 + '.'}}
          <span>{{item.first}}</span> -
          <span>{{item.second}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    imgUrl: {
      type: String
    },
    tracks: {
      type: Array
    },
    updateTime: {
      type: String
    },
    idx: {
      type: String
    }
  },
  methods: {
    searchIdx (idx) {
      switch (idx) {
        case '云音乐新歌榜':
          idx = 0
          break
        case '云音乐热歌榜':
          idx = 1
          break
        case '网易原创歌曲榜':
          idx = 2
          break
        case '云音乐飙升榜':
          idx = 3
          break
        case '云音乐说唱榜':
          idx = 23
          break
        case '云音乐ACG音乐榜':
          idx = 22
          break
        case 'KTV唛榜':
          idx = 7
          break
        case 'iTunes榜':
          idx = 8
          break
        case '日本Oricon周榜':
          idx = 10
          break
        case 'Hit FM Top榜':
          idx = 9
          break
        case '台湾Hito排行榜':
          idx = 20
          break
        case 'Beatport全球电子舞曲榜':
          idx = 21
          break
        case '法国 NRJ Vos Hits 周榜':
          idx = 20
          break
        case 'UK排行榜':
          idx = 5
          break
        case '美国Billboard周榜':
          idx = 6
          break
      }
      this.$emit('showIdxPage', idx)
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");

.list {
  height: 2rem;
  display: flex;
  align-items: center;
  .img-info {
    position: relative;
    width: 1.7rem;
    height: 0;
    padding-bottom: 1.7rem;
    border-radius: 0.13rem;
    overflow: hidden;
    img {
      width: 1.7rem;
      height: 1.7rem;
    }
    .time {
      position: absolute;
      bottom: 3px;
      left: 3px;
      font-size: 12px;
      color: #fff;
    }
  }
  .list-con {
    margin-left: 0.2rem;
    .info {
      height: 0.5rem;
      line-height: 0.5rem;
      width: 4.5rem;
      .ellipsis();
    }
  }
}
</style>
