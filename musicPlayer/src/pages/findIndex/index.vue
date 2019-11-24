<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-11-24 12:13:28
 * @Update log: 更新日志
 -->
<template>
  <van-pull-refresh class="container" ref="wrapper" v-model="isLoading" @refresh="onRefresh">
    <swiper></swiper>
    <icon></icon>
    <song-list ref="songList"></song-list>
    <new-dish></new-dish>
    <top-tip ref="tip">
      <span class="tips">{{tips}}</span>
    </top-tip>
  </van-pull-refresh>
</template>

<script>
import swiper from './components/swiper'
import icon from './components/icons'
import songList from './components/personalizedSongList'
import newDish from './components/newDish'

export default {
  name: 'findIndex',
  mounted () {
    this.$refs.tip.showTip()
  },
  data () {
    return {
      isLoading: false,
      tips: '为你推荐更多有趣的内容'
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
    if (from.path === '/pwd') {
      location.reload()
    }
  },
  methods: {
    onRefresh () {
      this.$refs.songList._getImgCard()
      if (this.isGetOver()) {
        setTimeout(() => {
          this.isLoading = false
          this.tips = '已为你推荐新的个性化内容'
          this.$refs.tip.showTip()
        }, 500)
      }
    },
    /**
     * 子组件传过来是否获取数据成功
     */
    isGetOver () {
      return this.$refs.songList.isGetOver
    }
  },
  components: {
    swiper,
    icon,
    songList,
    newDish
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1295705_yfxum6q2gip.css");
.tips {
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.23rem;
  border-radius: 0.3rem;
}
</style>
