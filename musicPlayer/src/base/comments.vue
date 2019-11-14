<!--
 * @Author: Lambda
 * @Begin: 2019-10-27 09:14:42
 * @Update: 2019-11-12 19:11:06
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <h1 class="title">
      {{title}}
      <span class="num">{{total}}</span>
    </h1>
    <div
      class="item border-bottom"
      @click="showMenu(item)"
      v-for="(item, index) in comments"
      :key="index"
    >
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
            @click.stop="likeThisComment(item.commentId, item.liked)"
          >
            <span v-show="item.likedCount > 0">{{item.likedCount}}</span>
            <i class="comment" :class="{ commentzan: !item.liked, commentzan1:item.liked}"></i>
          </div>
        </div>
        <!-- 这里使用 v-html 用来解析 当出现 \n 换行的时候插入 <br />标签 -->
        <div class="content" v-html="setCon(item.content)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { filterSetMonth } from 'utils/filters'
import Bus from '@/assets/Bus'
export default {
  name: '',
  props: {
    total: {
      type: Number
    },
    comments: {
      type: Array
    },
    title: {
      type: String
    }
  },
  filters: {
    setTime: function (val) {
      return filterSetMonth(val, '月', '日')
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
    },
    showMenu (item) {
      console.log(item)
      const localUserId = +localStorage.getItem('accountUid')
      const userId = item.user.userId
      if (localUserId === userId) {
        // 当前评论是自己的，可以删除，不能举报
        Bus.$emit('user', true)
      }
      Bus.$emit('comId', item.commentId)
      this.$emit('showMenu')
    },
    /**
     * 将返回来的数据进行格式化处理
     * 将 换行符\n 替换成 <br /> 实现换行
     * 将 回车符\r\n 替换成 <br /> 实现换行
     */
    setCon (val) {
      val = val.replace(/(\n)|(\r\n)/g, '<br />')
      return val
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1478463_b9awmkqysf8.css");

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
  height: auto;
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
      line-height: 1.5;
    }
  }
}
</style>
