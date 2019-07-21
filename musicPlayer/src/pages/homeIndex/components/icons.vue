<template>
  <div class="wrapper border-bottom">
    <div class="container ">
      <ul class="icons-group">
        <li class="icon-list" v-for="(item, index) in homeIcons" :key="index">
          <div class="icon">
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span class="icon-text">{{item.text}}</span>
        </li>
        <li class="icon-list">
          <div class="icon exit-icon" style="background-color:#ccc">
            <i class="iconfont iconnav"></i>
          </div>
          <span class="icon-text">编辑</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { swiper } from "vue-awesome-swiper"

export default {
  name: "homeIcons",
  data () {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    }
  },
  computed: {
    ...mapState(["homeIcons"])
  },
  components: {
    swiper
  }
}
</script>

<style lang="less" scoped>
@import url("https://at.alicdn.com/t/font_1301440_eoa9vxvejgq.css");

.wrapper {
  box-sizing: border-box;
  padding: 0.2rem 0 0;
  overflow: hidden;
  height: 1.8rem;
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
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .icon {
          width: 0.72rem;
          height: 0.72rem;
          border-radius: 50%;
          background: linear-gradient(to right, #ff5a4c, #ff1d11);
          text-align: center;
          line-height: 0.72rem;
          position: relative;
          color: #fff;
          .iconfont {
            font-size: 0.4rem;
          }
        }
        .exit-icon {
          background: #ccc;
        }
        .icon-text {
          font-size: 0.24rem;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
