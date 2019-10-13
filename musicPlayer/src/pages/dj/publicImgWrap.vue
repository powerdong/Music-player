<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-12 18:39:19
 * @Update: 2019-10-13 11:59:19
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="title">
      <h1 class="text">
        {{ title }}
        <i class="dj dj-arrow-right"></i>
      </h1>
    </div>
    <div class="img-col">
      <img-card
        v-for="(item, index) in data"
        :key="index"
        type="dj"
        :name="item.name"
        :imgUrl="item.picUrl"
        :dec="item.desc || item.rcmdtext"
        :ridId="item.id"
      ></img-card>
    </div>
  </div>
</template>

<script>
import imgCard from 'base/imgCard'
export default {
  name: '',
  props: {
    data: {
      type: Array
    },
    title: {
      type: String
    }
  },
  components: {
    imgCard
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  margin-top: 0.5rem;
  .title {
    .flex-between();
    .text {
      font-weight: 700;
    }
  }
  .img-col {
    .flex-between();
    flex-wrap: wrap;
  }
}
</style>
