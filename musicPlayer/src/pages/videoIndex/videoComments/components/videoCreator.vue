<!--
 * @Author: Lambda
 * @Begin: 2019-11-12 13:30:45
 * @Update: 2019-11-12 20:59:21
 * @Update log: 更新日志
 -->
<template>
  <div class="video-creator border-top">
    <div class="left">
      <div class="img-info">
        <img :src="avatarUrl + '?param=50y50'" alt />
      </div>
      <span class="author">{{nickname}}</span>
    </div>
    <div class="concern tag-group">+ 关注</div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    avatarUrl: {
      type: String
    },
    nickname: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.video-creator {
  height: 0.8rem;
  .flex-between();
  align-items: center;
  padding: 0.2rem 0.23rem;
  .left {
    display: flex;
    align-items: center;
    .img-info {
      width: 0.5rem;
      height: 0;
      padding-bottom: 0.5rem;
      margin-right: 0.2rem;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .concern {
    background-color: @bgcolor;
    color: #fff;
  }
}
</style>
