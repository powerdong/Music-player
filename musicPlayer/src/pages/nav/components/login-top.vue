<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-30 13:17:54
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper"
      :class="{loginBg:!loginState}">
    <!-- 没有登录状态样式 -->
    <div class="no-login" v-if="!loginState">
      <div class="content">
        <p>登陆网易云音乐</p>
        <p>手机电脑多端同步，尽享海量高品质音乐</p>
      </div>
      <!-- 在一个组件的根元素上直接监听一个原生事件 使用native修饰-->
      <router-link to="login" tag="button" class="to-login" @click.native="HIDE_LOGIN">立即登录</router-link>
    </div>
    <!-- 已经登陆状态样式 -->
    <div class="login-ed" v-if="loginState">
      <div class="img-info">
        <el-avatar class="account-bg" :src="avatarUrl"></el-avatar>
        <!-- <img class="account-bg" :src="avatarUrl" alt=""> -->
        <p class="account-nickname">{{nickname}}</p>
      </div>
      <div class="daily_sign-in">
          <el-button  type="danger" size="mini"  round><i class="login icontubiaozhizuo-"></i>签到</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'loginTop',
  data () {
    return {
      avatarUrl: '',
      nickname: '',
      loginState: ''
    }
  },
  created () {
    // 通过本地存储获取用户头像和昵称
    this.avatarUrl = localStorage.getItem('avatarUrl')
    this.nickname = localStorage.getItem('nickname')
    this.loginState = this.LOGIN_STATE ? this.LOGIN_STATE : localStorage.getItem('accountUid')
  },
  computed: {
    ...mapGetters(['LOGIN_STATE'])
  },
  methods: {
    ...mapMutations(['HIDE_LOGIN'])
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@color: rgba(0, 0, 0, 0.4);
@fontSize : 0.2rem;
.loginBg{
  // 如果没有登陆，背景是灰色
  background-color: rgba(204, 204, 204, 0.3);
}
.wrapper {
  // 左侧上部大背景
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0.6rem 0.23rem 0.9rem;
  width: 100%;
  height: 3rem;
  .login-ed{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .img-info{
      // 用户信息 包括头像和昵称
      text-align: center;
      width: 1.3rem;
      height: 1.3rem;
      .account-bg{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .daily_sign-in{
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0.07rem;
      font-size: 0.2rem;
      margin-top: auto;
      color: #fff;
      width: 1.2rem;
      height: 0.44rem;
      border-radius: 0.2rem;
      background: @bgcolor;
    }
  }
  .no-login {
    width: 100%;
    height: 100%;
    .flex-around();
    flex-direction: column;
    align-items: center;
    .content {
      text-align: center;
      p {
        // 两句话
        font-size: @fontSize;
        line-height: @fontSize*1.5;
        color: @color;
      }
    }
    .to-login {
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
}
</style>
