<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-12 14:24:51
 * @Update: 2019-10-17 13:21:14
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="title border-bottom" :class="{center: type ==='class'}">{{title}}</div>
    <ul class="list-wrap">
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <div class="img-info">
          <img :src="item.imgUrl" alt />
        </div>
        <span class="name">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    data: {
      type: Array
    },
    type: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  margin-top: 0.5rem;
  .title {
    font-weight: 700;
    padding-bottom: 0.3rem;
    margin: 0.3rem;
    &.center {
      text-align: center;
    }
  }
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: left;
      box-sizing: border-box;
      padding: 0.2rem;
      .img-info {
        width: 0.5rem;
        height: 0;
        padding-bottom: 0.5rem;
        margin-right: 0.2rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
}
</style>
