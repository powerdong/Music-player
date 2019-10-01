<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 15:14:42
 * @Update: 2019-10-01 15:31:17
 * @Update log: 更新日志
 -->
<template>
  <div class="dj_sublist_card pd23">
    <h1 class="title">
      我订阅的电台
      <span class="num">({{count}})</span>
    </h1>
    <div class="card" v-for="(item, index) in djSublist" :key="index">
      <div class="img-info">
        <img :src="item.picUrl" alt />
      </div>
      <div class="info">
        <p class="name">{{ item.name }}</p>
        <p class="artist">by {{item.dj.nickname}}</p>
        <p class="text">{{item.lastProgramName}}</p>
      </div>
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
    }
  }
}
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1443044_xzrxstmej2c.css");
@import url("~styles/global.less");

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
      img {
        width: 1rem;
        height: 1rem;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 0.2rem;
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
