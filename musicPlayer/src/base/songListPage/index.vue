<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:33:42
 * @Update: 2019-09-07 20:45:47
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper" @scroll="scrollList">
  <div class="container-top">
    <global-nav class="fixed pd23">
        <span class="text" v-show="listFixed">{{title}}</span>
    </global-nav>
    <div class="date pd23">
      <span class="day">{{day}}</span><span class="month">{{month}}</span>
    </div>
  <div class="info pd23">查收属于您的今日推荐</div>
  </div>
  <div class="title pd23" :class="{listFixed}">
    <span>
      <i class="date-song cbofang"></i>
      播放全部
    </span>
    <span>
      <i class="date-song caidan"></i>
      多选
    </span>
  </div>
  <div class="list-info" v-show="!load" :style="{ marginTop: top}">
    <slot></slot>
   </div>
  <page-loading v-show="load"></page-loading>
 </div>
</template>

<script>
import globalNav from 'base/generalNav'
import pageLoading from 'base/pageLoading'

export default {
  name: '',
  components: {
    globalNav,
    pageLoading
  },
  props: {
    title: {
      type: String
    },
    load: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      listFixed: false,
      top: '0.5rem'
    }
  },
  computed: {
    day: function () {
      const day = new Date().getDate() < 10
        ? '0' + new Date().getDate()
        : new Date().getDate()
      return day
    },
    month: function () {
      const month = new Date().getMonth() + 1 < 10
        ? '0' + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
      return month
    }
  },
  methods: {
    /**
     * 定义页面滚动事件，
     * 当页面滚动时，首先是顶部背景区域的透明度发生变化
     * 通过改变下边列表区域的 transform:translate3d(x, y, z) 中的y值
     */
    scrollList (e) {
      let top = this.$el.scrollTop
      if (top >= 148) {
        this.listFixed = true
        this.top = '1.3rem'
      } else {
        this.listFixed = false
        this.top = '0.5rem'
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1394963_omc45g2g2se.css');
@import url('~styles/global.less');
.fixed{
  position:fixed;
  width: 100%;
  height: 0.8rem;
  background-color:#ee5253;
  top:0;
  z-index:999;
}
.listFixed{
  position:fixed;
  width: 100%;
  height: 0.8rem;
  background-color:#ee5253;
  top:0.8rem;
  z-index:999;
}
.title{
  font-size: 0.3rem;
  height: 0.8rem;
  line-height: 0.8rem;
  .flex-between();
  background-color: #fff;
}
.wrapper{
  height: 100vh;
  position: relative;
  overflow: scroll;
  .container-top{
    width: 100%;
    height: 3.6rem;
    color: #fff;
    background-color: #ee5253;
    .date{
      padding-top: 1.5rem;
      .day{
        font-size: 0.7rem;
      }
      .month{
        font-size: 0.4rem;
        color: #c8d6e5;
        &::before{
          content: "/"
        }
      }
    }
    .info{
      margin-top: 0.7rem;
    }
    .text{
      font-size: 0.4rem;
      vertical-align: 5px;
    }
  }
  .list-info{
    width: 100%;
    box-sizing: border-box;
    padding: 0.1rem 0.23rem;
    background-color: #fff;
    transform: translate3d(0, -0.5rem, 0);
  }
}
</style>
