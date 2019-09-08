<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-08 14:37:08
 * @Update: 2019-09-08 17:14:01
 * @Update log: 更新日志
 -->
<template>
 <div class="img-card" :style="{width, marginTop:top}">
   <span class="tag" v-if="playCount" ><i class="card cardbofang"></i>{{playCount | setPlayCount}}</span>
   <span class="swiper-tag" v-if="swiper"><i class="card cardbofang1"></i></span>
   <span class="fine-tag" v-if="fine"><i class="card cardhuangguan"></i></span>
   <div class="img-con" :style="{width,paddingBottom:width}">
    <img v-lazy="imgUrl" class="image">
    <!-- 跳转到专辑详情页 -->
        <router-link class="cover" :to="'/albumPage/'+albumId"></router-link>
   </div>
    <div class="dec">
      {{ dec }}
    </div>
 </div>
</template>

<script>
export default {
  name: '',
  props: {
    playCount: {
      type: Number
    },
    imgUrl: {
      type: String
    },
    dec: {
      type: String
    },
    width: {
      type: String,
      default: '2.1rem'
    },
    top: {
      type: String,
      default: '0.3rem'
    },
    // 如果是轮播图，则显示大播放按钮
    swiper: {
      type: Boolean,
      default: false
    },
    fine: {
      type: Boolean,
      default: false
    },
    albumId: {
      type: Number
    }
  },
  filters: {
    setPlayCount: function (val) {
      if (!val) {
        return ''
      }
      if (val > 100000000) {
        val = ((val / 100000000).toFixed(1)) + '亿'
      } else if (val > 10000) {
        val = Math.floor(val / 10000) + '万'
      }
      return val
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1396631_tp8pq8axas.css');
@import url('~styles/global.less');
.img-card{
  position: relative;
  background-color: #fff;
  .tag{
    position: absolute;
    top: 0.11rem;
    right: 0.11rem;
    font-size: 0.2rem;
    color: #fff;
    .cardbofang {
      font-size: 0.18rem;
    }
  }
  .swiper-tag{
    position: absolute;
    bottom: 1rem;
    right: 0.11rem;
    .cardbofang1{
      font-size: 1rem;
      color: #fff;
      opacity: 0.6;
    }
  }
  .fine-tag{
    position: absolute;
    transform: rotate(-45deg);
    top: 0;
    left: 0;
    .cardhuangguan{
      color: #f39c12;
      font-size: 0.5rem;
    }
  }
  .img-con{
    height: 0;
    background-color: #aaa;
    border-radius: 0.2rem;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .dec{
    margin-top: 0.2rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    letter-spacing: 1px;
    .twoLinesEllipsis()
  }
}
</style>
