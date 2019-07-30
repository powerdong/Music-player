<template>
  <div class="wrapper">
    <div class="content">
      <p>登陆网易云音乐</p>
      <p>手机电脑多端同步，尽享海量高品质音乐</p>
    </div>
    <!-- 在一个组件的根元素上直接监听一个原生事件 使用native修饰-->
    <router-link to="login" tag="button" class="to-login" @click.native="HIDE_LOGIN">立即登录</router-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'loginTop',
  methods: {
    ...mapMutations(['HIDE_LOGIN'])
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');
@color: rgba(0, 0, 0, 0.4);
@fontSize : 0.2rem;
.wrapper {
  // 左侧上部大背景
  box-sizing: border-box;
  padding: 0.6rem 0 0.9rem;
  width: 100%;
  height: 3.5rem;
  background-color: rgba(204, 204, 204, 0.3);
  .flex-around();
  flex-direction: column;
  align-items: center;
  .content{
    text-align: center;
    p{
      // 两句话
      font-size: @fontSize;
      line-height: @fontSize*1.5;
      color: @color;
    }
  }
  .to-login{
    // 立即登录按钮
    background-color: transparent;
    box-sizing: border-box;
    padding: 0.1rem 0.5rem;
    border: 1px solid @color;
    border-radius: 0.5rem;
    font-size: @fontSize;
    color: @color;

  }
}
</style>
