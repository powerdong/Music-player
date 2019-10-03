<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-06 10:16:48
 * @Update log: 更新日志
 -->
<template>
  <div class="banner-container">
    <swiper :options="swiperOption">
      <!-- slides a标签跳转 url携带歌曲id信息 -->
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <router-link :to="'/song/?id='+ item.targetId">
          <img class="banner-img" :src="item.pic" alt />
          <span class="title" :style="{background:item.titleColor}">{{item.typeTitle}}</span>
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from 'api'

export default {
  name: 'findSwiper',
  data () {
    return {
      // //存放图片组信息
      swiperList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        // 自动轮播
        loop: true,
        autoplay: {
          // 5000毫秒自动播放
          delay: 5000,
          // 用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
          disableOnInteraction: false
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    _getFindInfo () {
      api.bannerSwiperFn()
        .then(this.getFindInfoSuc)
    },
    getFindInfoSuc (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.banners
        this.swiperList = res
      }
    }
  },
  /*
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  */
  mounted () {
    // 可以使用swiper这个对象去使用swiper官网中的那些方法
    // console.log('this is current swiper instance object', this.swiper)

    this._getFindInfo()
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

.banner-container /deep/ .swiper-pagination-bullet-active {
  background: @bgcolor;
}
.swiper-container {
  border-radius: @imgBorderRadius;
}
.banner-container {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.2rem;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
  .banner-img {
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
  }
}
</style>
