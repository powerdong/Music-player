<!--
 * @Author: Lambda
 * @Begin: 2019-10-17 12:44:36
 * @Update: 2019-10-17 13:35:10
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <dj-ranking class="pd23" @returnPage="returnPage">
      <span class="text">主播电台排行榜</span>
    </dj-ranking>
    <slider-nav :list="list" minWidth="1.7rem"></slider-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import djRanking from 'base/generalNav'
import sliderNav from 'base/sliderNav'

export default {
  name: '',
  data () {
    return {
      list: [{
        path: `/anchor`,
        text: `主播榜`
      }, {
        path: `/program`,
        text: `节目榜`
      }, {
        path: `/radio`,
        text: `电台榜`
      }]
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    djRanking,
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
  }
}
</style>
