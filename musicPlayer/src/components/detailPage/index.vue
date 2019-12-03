<!--
 * @Author: Lambda
 * @Begin: 2019-10-13 12:03:28
 * @Update: 2019-11-30 13:27:53
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper" @scroll="scrollList">
    <detail-nav @returnPage="returnPage" class="fixed pd23" style="color:#fff;">
      <span class="text">{{$title}}</span>
    </detail-nav>
    <div
      class="container-top"
      :class="{coverFixed, position}"
      :style="{backgroundImage: 'url(' + coverImgUrl + ')'}"
    >
      <div class="cover" :style="{backgroundColor: `rgba(0, 0, 0, ${cover})`}"></div>
      <div class="data" v-show="!listFixed" :style="{opacity}">
        <slot name="data">上半部区域</slot>
      </div>
    </div>
    <div :class="{listFixed}">
      <slot name="nav-list">这里显示吸顶标签行</slot>
    </div>
    <div class="container-bottom" :style="{ marginTop: top}">
      <slot name="bottom">下边展示音乐列表</slot>
    </div>
    <slot name="slider">这里是显示下方滑块</slot>
  </div>
</template>

<script>
import detailNav from 'base/generalNav'

export default {
  name: '',
  data () {
    return {
      cover: '0.2',
      listFixed: false,
      coverFixed: false,
      position: true,
      top: '0rem',
      opacity: 1,
      $title: ''
    }
  },
  props: {
    title: {
      type: String
    },
    name: {
      type: String
    },
    coverImgUrl: {
      type: String
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    },
    /**
     * 定义页面滚动事件，
     * 这里需要添加在滚动过程中样式的变化
     */
    scrollList (e) {
      // 获取到 top 值
      let top = this.$el.scrollTop
      this.cover = top / 1000 + 0.3
      this.opacity = 1 - top / 500
      if (this.cover > 0.6) {
        this.cover = 0.6
        this.opacity = 0.4
      } else {
        this.cover = top / 1000 + 0.3
        this.opacity = 1 - top / 500
      }
      if (top >= 282) {
        this.$title = this.name
        this.listFixed = true
        this.coverFixed = true
        this.position = false
        this.top = '7.8rem'
      } else {
        this.$title = this.title
        this.listFixed = false
        this.coverFixed = false
        this.position = true
        this.top = '0'
      }
    }
  },
  components: {
    detailNav
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.topFixed {
  position: fixed;
  width: 100%;
  height: 0.8rem;
  z-index: 9;
}
.fixed {
  .topFixed();
  top: 0;
}
.listFixed {
  .topFixed();
  top: 1.6rem;
}
.coverFixed {
  position: fixed;
  width: 100%;
  z-index: 3;
  top: 0;
  transform: translateY(-5.4rem);
}
.wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
  }
  .container-top {
    width: 100%;
    height: 0;
    padding-bottom: 7rem;
    background-size: 100%;
    background-repeat: no-repeat;
    &.position {
      position: relative;
    }
    .cover {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    .data {
      position: absolute;
      bottom: 1rem;
      left: 0.3rem;
      .flex-between();
      width: 100%;
      box-sizing: border-box;
      padding-right: 0.8rem;
    }
  }
  .container-bottom {
    transform: translate3d(0, -0.8rem, 0);
  }
}
</style>
