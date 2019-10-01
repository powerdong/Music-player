<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 14:23:14
 * @Update: 2019-10-01 14:58:01
 * @Update log: 更新日志
 -->
<template>
  <div class="my_favorite pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">我的收藏</span>
    </general-nav>
    <slider-nav :list="list"></slider-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import sliderNav from 'base/sliderNav'

export default {
  name: '',
  data () {
    return {
      list: [
        {
          path: `/albums`,
          text: '专辑'
        }, {
          path: `/artists`,
          text: '歌手'
        }, {
          path: `/videos`,
          text: '视频'
        }, {
          path: `/column`,
          text: '专栏'
        }, {
          path: `/mlog`,
          text: 'Mlog'
        }
      ]
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
.my_favorite {
  background-color: #fff;
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
}
</style>
