<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-02 18:07:09
 * @Update: 2019-09-02 18:57:31
 * @Update log: 展示页面公共的标题和底部组件
 -->
<template>
 <div class="list-global">
   <div class="title">
     <span class="title-content">{{title}}</span>
     <span class="smallTag" v-if="songList">
       <i class="result bofang"></i>
       播放全部
     </span>
   </div>
    <slot></slot>
    <div class="more" v-if="more" >
    {{moreText}}<i class="result youjiantou"></i>
    </div>
 </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    more: {
      type: Boolean,
      default: false
    },
    moreText: {
      type: String
    },
    songList: {
      type: Boolean
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

.list-global{
  margin-top: 0.26rem;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-content{
      font-weight: 700;
      height: 0.3rem;
      line-height: 0.3rem;
    }
  }
  .more{
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.26rem;
    color: #ccc;
    .youjiantou{
      color: #aaa;
    }
  }
}
</style>
