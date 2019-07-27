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
import axios from 'axios'

export default {
  name: 'findSwiper',
  data () {
    return {
      swiperList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: {
          // 3000毫秒自动播放
          delay: 5000,
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
    getFindInfo () {
      axios
        .get('http://140.143.128.100:3000/banner?type=1')
        .then(this.getFindInfoSuc)
    },
    getFindInfoSuc (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.banners
        this.swiperList = res
      }
    }
  },
  mounted () {
    this.getFindInfo()
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
