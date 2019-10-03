<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-10-03 19:52:18
 * @Update log: 我的页面图标展示
 *              可左右滑动
 -->
<template>
  <div class="wrapper border-bottom">
    <div class="container">
      <ul class="icons-group">
        <!-- <li class="icon-list" v-for="(item, index) in homeIcons" :key="index">
          <div class="icon">
            <el-button type="danger" :class="item.icon" class="home" size="small" circle></el-button>
          </div>
          <span class="icon-text">{{item.text}}</span>
        </li>-->
        <li
          v-for="(item, index) in homeIcons"
          :icons="item"
          :key="index"
          is="icon"
          :width="true"
          :bgcolor="true"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { homeIcons } from 'getInfos/getData'
import { swiper } from 'vue-awesome-swiper'
import icon from 'base/icon'
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
    swiper,
    icon
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
.wrapper {
  box-sizing: border-box;
  padding: 0.2rem 0 0;
  overflow: hidden;
  height: 1.8rem;
  // 定义可左右滑动的图标组
  .container {
    // 横向滚动条
    overflow-x: scroll;
    .icons-group {
      // flex布局 溢出不换行
      height: 1.5rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      width: auto;
      min-width: 100%;
      // .icon-list {
      //   // 每项 icon 样式
      //   min-width: 1.6rem;
      //   height: 100%;
      //   .flex-around();
      //   flex-direction: column;
      //   align-items: center;
      //   .icon {
      //     width: @iconWidth * 0.72;
      //     height: @iconWidth * 0.72;
      //     line-height: @iconWidth * 0.72;
      //     .icons();
      //     .home {
      //       font-size: 0.4rem;
      //     }
      //   }
      //   .exit-icon {
      //     background: #ccc;
      //   }
      //   .icon-text {
      //     font-size: @iconText;
      //   }
      // }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
