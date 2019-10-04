<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 14:30:50
 * @Update: 2019-10-04 12:41:11
 * @Update log: 可左右滑动的标签导航
 -->
<template>
  <div class="wrapper pd23" ref="navs">
    <!-- 使用 replace 它不会向 history 添加新记录 -->
    <router-link
      class="nav-list"
      :style="{minWidth}"
      v-for="(item, index) in list"
      :key="index"
      :to="item.path"
      replace
    >{{ item.text }}{{item.num | empty}}</router-link>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    list: {
      type: Array
    },
    minWidth: {
      type: String,
      default: '1.2rem'
    }
  },
  filters: {
    empty: function (val) {
      if (val) {
        return ' ' + val
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  display: flex;
  margin-top: 0.16rem;
  overflow-x: auto;
  flex-wrap: nowrap;
  border-bottom: 1px solid #ddd;
  .nav-list {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.7rem;
    box-sizing: border-box;
    padding: 0.03rem;
    margin: 0 0.2rem;
    color: #000;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: @bgcolor;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }
    &.ac {
      color: @bgcolor;
    }
    &.ac::before {
      transform-origin: bottom left;
      transform: scaleX(1);
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
