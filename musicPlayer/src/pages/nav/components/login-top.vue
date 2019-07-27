<template>
  <div class="wrapper">
    <div class="content">
      <p>登陆网易云音乐</p>
      <p>手机电脑多端同步，尽享海量高品质音乐</p>
    </div>
    <button class="to-login">立即登录</button>
  </div>
</template>

<script>
export default {
  name: 'loginTop'
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');
@color: rgba(0, 0, 0, 0.4);
@fontSize : 0.2rem;
.wrapper {
  box-sizing: border-box;
  padding: 0.6rem 0 0.9rem;
  width: 100%;
  height: 3.4rem;
  background-color: rgba(204, 204, 204, 0.3);
  .flex-around();
  flex-direction: column;
  align-items: center;
  .content{
    text-align: center;
    p{
      font-size: @fontSize;
      line-height: @fontSize*1.5;
    color: @color;
    }
  }
  .to-login{
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
