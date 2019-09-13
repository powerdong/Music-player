<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:38:30
 * @Update: 2019-09-13 14:52:55
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <general-nav class="pd23" @returnPage="returnPage">
      <span class="text">歌单广场</span>
    </general-nav>
    <nav-list></nav-list>
    <keep-alive>
      <router-view style="height: 87vh; overflow-y: scroll;"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import navList from './navIndex/navList'
import generalNav from 'base/generalNav'
export default {
  name: '',
  components: {
    navList,
    generalNav
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1396524_tr1owjj5u5.css');
@import url('~styles/global.less');
.wrapper{
  .text{
    font-size: 0.4rem;
    vertical-align: 5px;
  }
}
</style>
