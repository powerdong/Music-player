<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-30 20:21:12
 * @Update: 2019-10-05 13:15:14
 * @Update log: 公共图标组件
 -->
<template>
  <router-link class="icon-list" :class="{width}" :to="linkTo">
    <div class="icon" :class="{bgcolor}">
      <i :class="icons.icon"></i>
      <slot></slot>
    </div>
    <span class="icon-text">{{icons.text}}</span>
  </router-link>
</template>

<script>
export default {
  name: '',
  props: {
    icons: {
      type: [Object, Array]
    },
    width: {
      type: Boolean
    },
    bgcolor: {
      type: Boolean
    },
    linkTo: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='less' scoped>
// 这部分样式是对于 我的页面设置的
.width {
  min-width: 1.6rem;
  &:last-of-type > .icon {
    background: #ccc;
  }
}
.icon-list {
  // 每项 icon 样式
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  color: #000;
  .bgcolor {
    background: linear-gradient(to right, #ff5a4c, #ff1d11);
  }
  .icon {
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 50%;
    text-align: center;
    position: relative;
    color: #fff;
    .home {
      font-size: 0.4rem;
    }
    .find {
      font-size: 0.5rem;
    }
    .login {
      font-size: 0.4rem;
      background-color: transparent;
      color: #ff1d11;
    }
  }
  .icon-text {
    font-size: 0.24rem;
  }
}
</style>
