<template>
  <div class="container border-bottom">
    <div class="icon-wrapper" v-for="(item, index) in findIcons" :key="index">
      <div class="icon">
        <span class="today" v-if="item.text === '每日推荐'" >{{today}}</span>
        <i :class="item.icon" class="iconfont"></i>
      </div>
      <span class="icon-text">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'findIcon',
  computed: {
    today: function () {
      return new Date().getDate()
    },
    ...mapState(['findIcons'])
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@import url("http://at.alicdn.com/t/font_1295705_hdzk2gocoyo.css");
.container {
  .flex-around();
  width: 100%;
  height: 1.6rem;
  align-items: center;
  padding: 0.2rem 0 0.3rem;
  .icon-wrapper {
    .flex-around();
    box-sizing: border-box;
    height: 100%;
    flex-direction: column;
    align-items: center;
    .icon {
      width: @iconWidth*0.9;
      height: @iconWidth*0.9;
      line-height: @iconWidth*0.9;
      .icons();
      .iconfont{
        font-size: 0.5rem;
      }
      .today{
        position: absolute;
        top: 0.1rem;
        left: 0.34rem;
        font-size: 0.2rem;
      }
    }
    .icon-text {
      font-size: @iconText;
    }
  }
}
</style>
