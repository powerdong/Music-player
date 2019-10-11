<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:39:29
 * @Update: 2019-10-11 13:42:30
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <dj-nav @returnPage="returnPage">
      <span class="text">电台</span>
    </dj-nav>
    <swiper></swiper>
    <icons></icons>
    <radio-recom></radio-recom>
    <boutique-recom></boutique-recom>
  </div>
</template>

<script>
import djNav from 'base/generalNav'
import swiper from './components/swiper'
import icons from './components/icons'
import radioRecom from './components/radioRecom'
import boutiqueRecom from './components/boutiqueRecom'
export default {
  name: '',
  methods: {
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    djNav,
    swiper,
    icons,
    radioRecom,
    boutiqueRecom
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
  }
}
</style>
