<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-11-03 12:07:07
 * @Update log: 更新日志
 -->
<template>
  <div class="banner-container">
    <van-swipe :autoplay="5000" indicator-color="#dd001b">
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <img class="banner-img" :src="item.pic" alt />
        <span class="title">{{item.typeTitle}}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import api from 'api'

export default {
  name: 'findSwiper',
  data () {
    return {
      // //存放图片组信息
      swiperList: []
    }
  },
  methods: {
    _getDjBanner () {
      api.djBannerFn()
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.swiperList = data.data
          }
        })
    }
  },
  mounted () {
    this._getDjBanner()
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

.banner-container {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.2rem;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
  .banner-img {
    border-radius: @imgBorderRadius;
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
    font-size: smaller;
    padding: 3px 6px;
    opacity: 0.8;
    border-top-left-radius: @imgBorderRadius;
    background-color: @bgcolor;
  }
}
</style>
