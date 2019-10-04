<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 15:14:42
 * @Update: 2019-10-04 13:38:23
 * @Update log: 长卡片组件
 -->
<template>
  <div class="dj_sublist_card">
    <h1 class="title" v-if="title">
      {{title}}
      <span class="num">({{count}})</span>
    </h1>
    <!-- 要遍历的数组 -->
    <div class="card" v-for="(item, index) in djSublist" :key="index">
      <div class="img-info" :class="{circle,bigImg}">
        <!-- 列表项图片信息 -->
        <img :src="item.picUrl ? item.picUrl : item.coverUrl" alt />
        <span class="count" v-if="item.playTime">
          <i class="dj_sublist dj_sublist_bofang1"></i>
          {{item.playTime | numRule}}
        </span>
      </div>
      <div class="info" v-if="type === 'dj'">
        <!-- 列表项名字 -->
        <p class="name">{{ item.name }}</p>
        <!-- 作者名字 -->
        <p class="artist">by {{item.dj.nickname}}</p>
        <!-- 其他信息 -->
        <p class="text">{{item.lastProgramName}}</p>
      </div>
      <div class="info" v-if="type === 'albums'">
        <!-- 列表项名字 -->
        <p class="name">{{ item.name }}</p>
        <!-- 作者名字 -->
        <div>
          <span class="artist" v-for="(item, index) in item.artists" :key="index">{{item.name}}</span>
          <!-- 其他信息 -->
          <span class="text">{{item.size}}首</span>
        </div>
      </div>
      <div class="info" v-if="type === 'artists'">
        <!-- 列表项名字 -->
        <p class="name">{{ item.name }}</p>
        <!-- 作者名字 -->
        <div>
          <span class="artist">专辑：{{item.albumSize}}</span>
          <!-- 其他信息 -->
          <span class="text">MV：{{item.mvSize}}</span>
        </div>
      </div>
      <div class="info" v-if="type === 'video'">
        <!-- 列表项名字 -->
        <p class="name">{{ item.title }}</p>
        <!-- 作者名字 -->
        <div>
          <span class="artist">{{item.durationms | setTime}} by</span>
          <!-- 其他信息 -->
          <span class="text" v-for="(item, index) in item.creator" :key="index">{{item.userName}}</span>
        </div>
      </div>
      <!-- 右边的三个点按钮 -->
      <div class="icon">
        <i class="dj_sublist dj_sublist_diandian"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    djSublist: {
      type: Array
    },
    count: {
      type: Number
    },
    title: {
      type: String
    },
    type: {
      type: String
    },
    circle: {
      type: Boolean
    },
    bigImg: {
      type: Boolean
    }
  },
  filters: {
    numRule: function (value) {
      if (!value) return ''
      if (value > 10000) {
        value = parseInt(value / 10000) + '万'
      } else if (value > 100000000) {
        value = (value / 100000000).toFixed(1) + '亿'
      }
      return value
    },
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
    }
  }
}
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1443044_ba7y88tq60o.css");
@import url("~styles/global.less");
.dj_sublist_bofang1 {
  font-size: 0.13rem;
  color: #fff;
}

.dj_sublist_card {
  background-color: #fff;
  margin-top: 0.2rem;
  .title {
    font-weight: 700;
  }
  .card {
    margin-top: 0.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    .img-info {
      width: 1rem;
      height: 0;
      padding-bottom: 1rem;
      overflow: hidden;
      position: relative;
      &.circle {
        border-radius: 50%;
      }
      img {
        width: 1rem;
        height: 1rem;
      }
      &.bigImg {
        width: 2.8rem;
        padding-bottom: 1.4rem;
        img {
          width: 2.8rem;
          height: 1.4rem;
        }
      }
      .count {
        position: absolute;
        color: #fff;
        right: 5px;
        top: 5px;
        font-size: 0.13rem;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 0.2rem;
      .name {
        .twoLinesEllipsis();
      }
      .name,
      .artist,
      .text {
        line-height: 1.5;
      }
      .artist,
      .text {
        color: #999;
        font-size: 0.2rem;
      }
    }
    .icon {
      width: 0.4rem;
    }
  }
}
</style>
