<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-10-24 11:15:15
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper" :class="{loginBg:!loginState}">
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
        <el-avatar class="account-bg" :src="avatarUrl + '?param=200y200'"></el-avatar>
        <!-- <img class="account-bg" :src="avatarUrl" alt=""> -->
      </div>
      <div class="nickname">
        <span class="account-nickname">{{nickname}}</span>
        <span class="level">Lv.{{level}}</span>
      </div>
      <div class="daily_sign-in">
        <el-button type="danger" size="mini" @click="sign" round v-show="!isSign">
          <i class="login icontubiaozhizuo-"></i>签到
        </el-button>
        <el-button size="mini" round v-show="isSign">
          已签到
          <i class="login iconyoujiantou"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getCookie, setCookie } from 'utils/cookie'
import api from 'api'
export default {
  name: 'loginTop',
  data () {
    return {
      avatarUrl: '',
      nickname: '',
      level: 0
    }
  },
  props: {
    loginState: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this.getUserInfo(this.loginState)
    })
  },
  computed: {
    _loginState: {
      get () {
        return this.loginState
      },
      set (val) {
        this.$emit('update_state', val)
      }
    },
    isSign: {
      get () {
        return getCookie('sign').slice(1)
      }
    }
  },
  methods: {
    getUserInfo (bool) {
      if (bool) {
        // 通过本地存储获取用户头像和昵称
        this.level = localStorage.getItem('level')
        this.avatarUrl = localStorage.getItem('avatarUrl')
        this.nickname = localStorage.getItem('nickname')
      }
    },
    setSignCookie () {
      var curDate = new Date()
      // 当前时间戳
      var curTamp = curDate.getTime()
      // 当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
      var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1
      // 当日已经过去的时间（毫秒）
      var passedTamp = curTamp - curWeeHours
      // 当日剩余时间
      var leftTamp = 24 * 60 * 60 * 1000 - passedTamp
      var leftTime = new Date()
      leftTime.setTime(leftTamp + curTamp)
      setCookie('sign', true, leftTime)
    },
    sign () {
      api.signInFn()
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            // 签到成功
            console.log('签到成功')
            this.isSign = true
            this.setSignCookie()
          }
        })
    },
    ...mapMutations(['HIDE_LOGIN'])
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@color: rgba(0, 0, 0, 0.4);
@font-size : 0.2rem;
.loginBg {
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
  .login-ed {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .nickname {
      position: absolute;
      bottom: 0;
      .level {
        box-sizing: border-box;
        padding: 0.04rem 0.1rem;
        background-color: #ccc;
        border-radius: 0.4rem;
        font-size: 0.2rem;
      }
    }
    .img-info {
      // 用户信息 包括头像和昵称
      text-align: center;
      width: 1.3rem;
      height: 1.3rem;
      .account-bg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .daily_sign-in {
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
      .iconyoujiantou {
        font-size: 0.24rem;
      }
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
        font-size: @font-size;
        line-height: @font-size*1.5;
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
      font-size: @font-size;
      color: @color;
    }
  }
}
</style>
