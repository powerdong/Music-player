<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-09 13:31:02
 * @Update: 2019-09-09 14:03:03
 * @Update log: 更新日志
 -->
<template>
 <div>
   <div class="list">
     <div class="img-info">
      <img :src="imgUrl" alt="">
      <span class="time">{{ updateTime }}</span>
     </div>
     <div class="list-con">
       <div class="info" v-for="(item, index) in tracks" :key="index">
         {{index + 1 + '.'}}<span>{{item.first}}</span> - <span>{{item.second}}</span>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: '',
  props: {
    imgUrl: {
      type: String
    },
    tracks: {
      type: Array
    },
    updateTime: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

.list{
  height: 2rem;
  display: flex;
  align-items: center;
  .img-info{
    position: relative;
    width: 1.7rem;
    height: 0;
    padding-bottom: 1.7rem;
    border-radius: 0.13rem;
    overflow: hidden;
    img{
      width: 1.7rem;
      height: 1.7rem;
    }
    .time{
      position: absolute;
      bottom: 3px;
      left: 3px;
      font-size: 12px;
      color: #fff;
    }
  }
  .list-con{
    margin-left: 0.2rem;
    .info{
      height: 0.5rem;
      line-height: 0.5rem;
      width: 4.5rem;
      .ellipsis();
    }
  }
}
</style>
