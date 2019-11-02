<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-08 11:12:45
 * @Update: 2019-11-02 12:30:05
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div class="titleFixed">
      <general-nav @returnPage="returnPage">
        <span class="text">最新音乐</span>
      </general-nav>
      <slider-nav :list="list"></slider-nav>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import sliderNav from 'base/sliderNav'

export default {
  name: '',
  computed: {
    list: function () {
      let arr = [{
        path: `/chinese`,
        text: `华语`
      }, {
        path: `/europe`,
        text: `欧美`
      }, {
        path: `/korea`,
        text: `韩国`
      }, {
        path: `/japan`,
        text: `日本`
      }]
      return arr
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    generalNav,
    sliderNav
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
  .fixed {
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #fff;
  }
}
</style>
