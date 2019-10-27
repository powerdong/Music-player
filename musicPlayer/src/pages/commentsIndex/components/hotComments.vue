<!--
 * @Author: Lambda
 * @Begin: 2019-10-27 09:13:12
 * @Update: 2019-10-27 10:21:21
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <h1 class="title">精彩评论</h1>
    <div class="item border-bottom" v-for="(item, index) in hotComments" :key="index">
      <div class="left-img">
        <img :src="item.user.avatarUrl + '?param=50y50'" alt />
      </div>
      <div class="right-info">
        <div class="top-info">
          <div class="data">
            <div class="nickname">{{item.user.nickname}}</div>
            <div class="time">{{ item.time | setTime}}</div>
          </div>
          <div
            class="like"
            :class="{liked: item.liked}"
            @click="likeThisComment(item.commentId, item.liked)"
          >
            {{item.likedCount}}
            <i
              class="comment"
              :class="{ commentzan: !item.liked, commentzan1:item.liked}"
            ></i>
          </div>
        </div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { filterSetYear } from 'utils/filters'
export default {
  name: '',
  props: {
    hotComments: {
      type: Array
    }
  },
  filters: {
    setTime: function (val) {
      return filterSetYear(val, '年', '月', '日')
    }
  },
  methods: {
    likeThisComment (cid, isLike) {
      let like = 1
      // 默认为点赞
      if (isLike) {
        // 如果当前歌曲已经赞了，则取消点赞
        like = 0
      }
      this.$emit('likeComment', cid, like)
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  margin-top: 0.3rem;
}
.title {
  font-weight: 700;
}
.item {
  display: flex;
  box-sizing: border-box;
  margin: 0.3rem 0;
  padding-bottom: 0.3rem;
  .left-img {
    width: 0.6rem;
    height: 0;
    padding-bottom: 0.6rem;
    margin-right: 0.2rem;
    img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
    }
  }
  .right-info {
    width: 100%;
    .top-info {
      color: #999;
      line-height: 1.3;
      font-size: 0.24rem;
      .flex-between();
      margin-bottom: 0.13rem;
      .data {
        .time {
          font-size: 0.21rem;
        }
      }
      .liked {
        color: @bgcolor;
      }
    }
    .content {
      line-height: 1.3;
    }
  }
}
</style>
