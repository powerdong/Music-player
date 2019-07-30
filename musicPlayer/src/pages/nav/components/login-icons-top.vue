<template>
  <div class="wrapper pd23 border-bottom">
    <ul>
      <li class="list" v-for="(item, index) in loginIconsTop" :key="index">
        <i class="login" :class="item.icon"></i>
        <span class="list-text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { loginIconsTop } from 'getInfos/getData'

export default {
  name: 'loginIconsTop',
  data () {
    return {
      loginIconsTop
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      this.loginIconsTop = loginIconsTop()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');
@fontSize:0.31rem;
@height:0.87rem;
.wrapper{
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  .list{
    box-sizing: border-box;
    padding: 0.2rem 0;
    font-size: @fontSize;
    height: @height;
    .login{
      font-size: @fontSize * 1.3;
      margin-right: @fontSize / 2;
    }
  }
}
</style>
