<template>
  <div class="container border-bottom">
    <ul class="icons-wrapper">
      <li class="icon-list" v-for="(item, index) in loginIcons" :key="index">
        <div class="icon">
          <i class="iconfont" :class="item.icon"></i>
        </div>
        <span class="icon-text">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'loginIcons',
  computed: {
    ...mapState(['loginIcons'])
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@import url("https://at.alicdn.com/t/font_1310719_61p4mqsq7ea.css");

.icons-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 0.13rem 0.5rem;
  .flex-around();
  .icon-list {
    min-width: 1.6rem;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: @iconWidth * 0.72;
      height: @iconWidth * 0.72;
      line-height: @iconWidth * 0.72;
      .iconfont {
        font-size: 0.4rem;
        color: @bgcolor;
      }
    }
    .icon-text {
      font-size: @iconText - 0.04;
    }
  }
}
</style>
