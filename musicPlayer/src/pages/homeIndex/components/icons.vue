<template>
  <div class="wrapper border-bottom">
    <div class="container ">
      <ul class="icons-group">
        <li class="icon-list" v-for="(item, index) in homeIcons" :key="index">
          <div class="icon">
            <i class="home" :class="item.icon"></i>
          </div>
          <span class="icon-text">{{item.text}}</span>
        </li>
        <li class="icon-list">
          <div class="icon exit-icon" style="background-color:#ccc">
            <i class="home icontoggle"></i>
          </div>
          <span class="icon-text">编辑</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {homeIcons} from 'getInfos/getData'
import { swiper } from 'vue-awesome-swiper'

export default {
  name: 'homeIcons',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      homeIcons
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.homeIcons = homeIcons()
    }
  },
  components: {
    swiper
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');
.wrapper {
  box-sizing: border-box;
  padding: 0.2rem 0 0;
  overflow: hidden;
  height: 1.8rem;
  // 定义可左右滑动的图标组
  .container {
    overflow-x: scroll;
    .icons-group {
      height: 1.5rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      width: auto;
      min-width: 100%;
      .icon-list {
        min-width: 1.6rem;
        height: 100%;
        .flex-around();
        flex-direction: column;
        align-items: center;
        .icon {
          width: @iconWidth * 0.72;
          height: @iconWidth * 0.72;
          line-height: @iconWidth * 0.72;
          .icons();
          .home {
            font-size: 0.4rem;
          }
        }
        .exit-icon {
          background: #ccc;
        }
        .icon-text {
          font-size: @iconText;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
