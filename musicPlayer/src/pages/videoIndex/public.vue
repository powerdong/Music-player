<!--
 * @Author: Lambda
 * @Begin: 2019-10-26 08:48:50
 * @Update: 2019-10-26 10:17:00
 * @Update log: 更新日志
 -->
<template>
  <div>
    <div v-for="(item, index) in data" :key="index">
      <div class="videoInfo pd23">
        <img :src="item.data.coverUrl + '?param=360y170'" alt />
        <span class="tag">{{ item.data.videoGroup ? item.data.videoGroup[0].name : ''}}</span>
        <span class="center-bofang">
          <i class="video video-bofang1"></i>
        </span>
        <span class="go-count">
          <i class="video video-bofang"></i>
          {{item.data.playTime | setCount}}
        </span>
        <span class="go-time">
          <i class="video video-yinlebofangxuanlvjiezou"></i>
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
            <i class="video video-zan"></i>
            <i class="praised-num">{{item.data.praisedCount | setCount}}</i>
          </span>
          <!-- 评论 -->
          <span class="comment">
            <i class="video video-pinglun"></i>
            <i class="comment-num">{{item.data.commentCount | setCount}}</i>
          </span>
          <!-- 分享 -->
          <span class="share">
            <i class="video video-diandiandian"></i>
          </span>
        </div>
      </div>
      <div class="split"></div>
    </div>
  </div>
</template>

<script>
import { filterSetPlayCount, filterSetTime } from 'utils/filters'
export default {
  name: '',
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
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1477601_h2g17vdatlt.css");
@imgWidth: 6.6rem;
@imgHeight: 3.3rem;

.video-tag {
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
  .center-bofang {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .video-bofang1 {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  .go-count {
    position: absolute;
    bottom: 0.1rem;
    left: 0.1rem;
    .video-tag();
    .video-bofang {
      font-size: 0.24rem;
      margin-right: 3px;
    }
  }
  .go-time {
    position: absolute;
    bottom: 0.1rem;
    right: 0.1rem;
    .video-tag();
    .video-yinlebofangxuanlvjiezou {
      font-size: 0.2rem;
      margin-right: 3px;
    }
  }
  .tag {
    position: absolute;
    top: 0.2rem;
    right: 0.13rem;
    .video-tag();
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
