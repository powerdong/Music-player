<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-10-16 19:43:34
 * @Update log: 更新日志
 -->
<template>
  <div class="banner-container">
    <swiper :options="swiperOption">
      <!-- slides a标签跳转 url携带歌曲id信息 -->
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <img class="banner-img" :src="item.pic" alt />
        <span class="title">{{item.typeTitle}}</span>
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
          disableOnInteraction: true
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
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

    this._getDjBanner()
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
    background-color: @bgcolor;
  }
}
</style>
