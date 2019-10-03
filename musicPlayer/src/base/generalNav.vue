<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-14 15:44:26
 * @Update: 2019-09-23 17:38:03
 * @Update log: 登录页通用顶部导航
 -->
<template>
  <nav class="phone-nav">
    <i class="phone iconzuojiantou" @click="returnPage"></i>
    <!-- slot 插槽将不同页面的标题信息显示 -->
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'loginNav',
  props: {
    nav: {
      type: String,
      default: ''
    }
  },
  methods: {
    returnPage () {
      // 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步
      // 类似 window.history.go(n)。
      this.$emit('returnPage')
    }
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1351323_oxqdjg3rufq.css");

.phone-nav {
  display: flex;
  align-items: center;
  .phone {
    font-size: 0.7rem;
    margin-right: 5px;
  }
}
</style>
