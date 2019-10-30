<!--
 * @Author: Lambda
 * @Begin: 2019-10-27 08:29:46
 * @Update: 2019-10-29 21:38:43
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div class="left-img">
      <img :src="info.imgUrl + '?param=100y100'" alt />
    </div>
    <div class="right-info">
      <div class="title">{{info.title}}</div>
      <div class="author">
        by
        <span class="name">{{info.author}}</span>
      </div>
    </div>
    <span class="arrow">
      <i class="comment commenticon-copy"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    info: {
      type: Object
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  height: 1.8rem;
  display: flex;
  align-items: center;
  .left-img {
    width: 1.5rem;
    height: 0;
    padding-bottom: 1.5rem;
    margin-right: 0.3rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.1rem;
    }
  }
  .right-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .title {
      .twoLinesEllipsis();
      font-size: 0.3rem;
      line-height: 1.5;
    }
    .author {
      font-size: 0.24rem;
      line-height: 1.5;
      .name {
        color: #328ffe;
      }
    }
  }
  .arrow {
    margin-left: 0.3rem;
  }
}
</style>
