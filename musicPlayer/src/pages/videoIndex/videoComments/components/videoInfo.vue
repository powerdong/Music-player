<!--
 * @Author: Lambda
 * @Begin: 2019-11-12 13:28:45
 * @Update: 2019-11-12 19:57:30
 * @Update log: 更新日志
 -->
<template>
  <div class="video-info-wra">
    <h1 class="video-title twoLinesEllipsis">{{title}}</h1>
    <div class="video-info-top">
      <span class="num">{{playTime | setNum}}次观看</span>
      <span
        class="tag-group"
        v-for="(item, index) in videoGroup"
        :key="index"
      >#{{item.name | setName}}#</span>
    </div>
    <div class="video-btn">
      <span class="icon-btn">
        <i class="video-info zan"></i>
        <i class="num">{{praisedCount | setNum}}</i>
      </span>
      <span class="icon-btn">
        <i class="video-info tianjiawenjian"></i>
        <i class="num">{{subscribeCount | setNum}}</i>
      </span>
      <span class="icon-btn">
        <i class="video-info videopinglun"></i>
        <i class="num">{{commentCount | setNum}}</i>
      </span>
      <span class="icon-btn">
        <i class="video-info videofenxiang"></i>
        <i class="num">{{shareCount | setNum}}</i>
      </span>
    </div>
  </div>
</template>

<script>
import { filterSetPlayCount } from 'utils/filters'
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    playTime: {
      type: Number
    },
    praisedCount: {
      type: Number
    },
    commentCount: {
      type: Number
    },
    shareCount: {
      type: Number
    },
    subscribeCount: {
      type: Number
    },
    videoGroup: {
      type: Array
    }
  },
  filters: {
    setNum: function (val) {
      return filterSetPlayCount(val)
    },
    setName: function (val) {
      val = val.replace(/#/g, '')
      return val
    }
  }
}
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1506186_kz71sqzq2o.css");
@import url("~styles/global.less");
.video-info-wra {
  margin: 0.2rem 0;
  .video-title {
    font-size: 0.3rem;
    line-height: 1.5;
    font-weight: 600;
  }
  .video-info-top {
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .video-btn {
    .flex-between();
    .icon-btn {
      display: flex;
      align-items: center;
      flex-direction: column;
      .video-info {
        margin: 0.1rem;
        font-size: 0.4rem;
      }
    }
  }
}
</style>
