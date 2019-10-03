<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-14 15:42:41
 * @Update: 2019-10-03 20:46:51
 * @Update log: 手机号登录密码页面
 -->
<template>
  <div class="wrapper">
    <div class="inp border-bottom">
      <input type="password" v-model="pwd" placeholder="请输入密码" ref="inputs" autofocus="autofocus" />
      <router-link to="/forget">忘记密码</router-link>
    </div>
    <login-btn @click.native="logon" :title="title"></login-btn>
    <!-- 设置提示语 -->
    <alert :is-alert="alert" :alert="alertText"></alert>
    <loading :is-loading="loading"></loading>
  </div>
</template>

<script>
import { getPhone } from 'utils/getPhone'
import loginBtn from 'base/button'
import alert from 'base/alert'
import loading from 'base/loading'
import api from 'api'
export default {
  name: 'phonePwd',
  data () {
    return {
      pwd: '',
      alert: false,
      alertText: '用户名或密码错误',
      title: '登录',
      loading: false,
      flag: true
    }
  },
  components: {
    loginBtn,
    alert,
    loading
  },
  methods: {
    /**
     * 输入框内容为空
     */
    clearInput () {
      this.pwd = ''
    },
    /**
     * 提示组件的事件
     */
    alertEvent () {
      // 如果输入内容不合法，提示组件显示
      // 显示一段时间后隐藏
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.alert = true
      // 1s 后隐藏组件
      this.timer = setTimeout(() => {
        this.alert = false
      }, 1000)
    },
    /**
     * 登陆成功后存取登录状态及信息
     */
    _getLoginState () {
      api.loginStatusFn()
        .then(res => {
          // 存取用户 id
          let userId = res.data.profile.userId
          if (res.data.code === 200) {
            // 存取用户信息
            let accountInfo = res.data.profile
            // 成功登陆
            // 修改状态为 1
            this.$store.commit('LOGIN_STATE')
            // Vuex在用户刷新的时候loginState会回到默认值false
            // 所以我们需要用到HTML5储存
            // 我们设置一个名为loginState
            localStorage.setItem('loginState', true)
            // 存入用户头像 昵称
            localStorage.setItem('avatarUrl', accountInfo.avatarUrl)
            localStorage.setItem('nickname', accountInfo.nickname)
            // 存取用户 uid信息
            this.$store.commit('ACCOUNT_UID', userId)
            localStorage.setItem('accountUid', userId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 判断密码是否正确
     * @param pwd 传入密码内容
     */
    passwordIsCorrect (pwd) {
      if (!pwd) {
        this.alertText = '请输入密码'
        this.alertEvent()
      }
      let phone = getPhone()
      this._isSure(phone, pwd)
    },
    _isSure (phone, pwd) {
      api.phoneLoginFn(phone, pwd)
        .then(res => {
          // 密码正确
          // 将账号存下，以后登录时账号输入框自动填写
          localStorage.setItem('account', phone)
          this.success()
        })
        // eslint 报 handle-callback-err 错误 添加 if 判断
        .catch(error => {
          if (error) {
            // 密码错误
            this.error()
          }
        })
    },
    /**
     * 登录成功
     */
    success () {
      // 修改状态为 1
      this.$store.commit('LOGIN_STATE')
      // loading 样式隐藏
      this.LoadingEnd()
      // 存取登陆状态
      this._getLoginState()
      // 跳转到发现页面
      this.$router.push({ path: '/find' })
    },
    /**
     * 密码错误登录失败
     */
    error () {
      this.alertText = '用户名或密码错误'
      // 显示提示信息
      this.alertEvent()
      // 输入框内容为空
      this.clearInput()
      // loading 样式隐藏
      this.LoadingEnd()
      // 登陆按钮的锁去掉
      this.flag = true
    },
    /**
     * 由于在点击时会触发两次请求 设置flag锁
     * 点击登录按钮要发生的事件
     */
    logon () {
      if (this.flag) {
        this.flag = false
        this.Loading()
        // 判断密码是否正确
        this.passwordIsCorrect(this.pwd)
      }
    },
    /**
     * 登陆完成 按钮内容复位
     * loading样式隐藏
     */
    LoadingEnd () {
      // 将按钮内容设置为 登录.
      this.title = '登录'
      // 页面显示loading 样式
      this.loading = false
    },
    /**
     * 登录中的 loading 设置
     */
    Loading () {
      // 将按钮内容设置为 登录中...
      this.title = '登录中...'
      // 页面显示loading 样式
      this.loading = true
    },
    // 在vue生命周期的created()钩子函数进行的DOM操作要放在Vue.nextTick()的回调函数中，
    // 因为created()钩子函数执行的时候DOM并未进行任何渲染，而此时进行DOM操作是徒劳的，所以此处一定要将DOM操作的JS代码放进Vue.nextTick()的回调函数中。
    changFocus () {
      this.$nextTick(x => {
        this.$refs.inputs.focus()
      })
    }
  },
  created () {
    this.changFocus()
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

.wrapper {
  box-sizing: border-box;
  padding: 0.23rem;
  .inp {
    padding-bottom: 0.1rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    input[type="password"] {
      // IE：不管该行有没有文字，光标高度与font-size一致。
      // FF：该行有文字时，光标高度与font-size一致。该行无文字时，光标高度与input的height一致。
      // Chrome：该行无文字时，光标高度与line-height一致；该行有文字时，光标高度从input顶部到文字底部(这两种情况都是在有设定line-height的时候)，如果没有line-height，则是与font-size一致。
      // 解决的方案：
      // 给input的height设定一个较小的高度，然后用padding去填充，基本上可以解决所有浏览器的问题
      height: 16px;
      padding: 4px 0px;
      font-size: 0.24rem;
      // ---------------------------
      margin-left: 10px;
      flex: 1;
      // 修改 input 输入框里闪烁光标的颜色
      caret-color: @bgcolor;
    }
  }
  .border-bottom::before {
    border-color: #aaa;
  }
}
</style>
