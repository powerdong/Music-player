<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-14 15:42:41
 * @Update: 2019-08-19 14:09:09
 * @Update log: 手机号登录密码页面
 -->
<template>
  <div class="wrapper">
    <login-nav></login-nav>
    <div class="inp border-bottom">
      <input type="password" v-model="pwd" placeholder="请输入密码" ref="inputs" autofocus="autofocus" />
      <router-link to="/forget">忘记密码</router-link>
    </div>
    <login-btn @click.native="logon" :title="title"></login-btn>
    <!-- 设置提示语 -->
    <alert :is-alert="alert" alert="用户名或密码错误"></alert>
    <loading :is-loading="loading"></loading>
  </div>
</template>

<script>
import loginNav from 'base/generalNav'
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
      title: '登录',
      loading: false,
      flag: true
    }
  },
  components: {
    loginNav,
    loginBtn,
    alert,
    loading
  },
  methods: {
    /**
     * 输入框内容为空
     */
    clearInput () {
      this.$data.pwd = ''
    },
    /**
     * 提示组件的事件
     */
    alertEvent () {
      // 如果输入内容不合法，提示组件显示
      // 显示一段时间后隐藏
      if (this.$data.timer) {
        clearTimeout(this.$data.timer)
        this.$data.timer = null
      }
      this.$data.alert = true
      // 1s 后隐藏组件
      this.$data.timer = setTimeout(() => {
        this.$data.alert = false
      }, 1000)
    },
    /**
     * 判断密码是否正确
     * @param pwd 传入密码内容
     */
    passwordIsCorrect (pwd) {
      // 创建一个正则表达式
      let reg = new RegExp(/\d*$/)
      // window.location.hash 返回从 “#” 开始的 url
      // 返回一个数组（未匹配到则返回 null）
      let phone = reg.exec(window.location.hash)[0]
      api.phoneLoginFn(phone, pwd)
        .then(res => {
          // 密码正确
          // 显示登陆中，页面中间显示 loading 样式
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
      // 跳转到发现页面
      this.$router.push({path: '/home'})
    },
    /**
     * 登录失败
     */
    error () {
      // 显示提示信息
      this.alertEvent()
      // 输入框内容为空
      this.clearInput()
      // loading 样式隐藏
      this.LoadingEnd()
      // 登陆按钮的锁去掉
      this.$data.flag = true
    },
    /**
     * 由于在点击时会触发两次请求 设置flag锁
     * 点击登录按钮要发生的事件
     */
    logon () {
      if (this.$data.flag) {
        this.$data.flag = false
        this.Loading()
        // 判断密码是否正确
        this.passwordIsCorrect(this.$data.pwd)
      }
    },
    /**
     * 登陆完成 按钮内容复位
     * loading样式隐藏
     */
    LoadingEnd () {
      // 将按钮内容设置为 登录.
      this.$data.title = '登录'
      // 页面显示loading 样式
      this.$data.loading = false
    },
    /**
     * 登录中的 loading 设置
     */
    Loading () {
      // 将按钮内容设置为 登录中...
      this.$data.title = '登录中...'
      // 页面显示loading 样式
      this.$data.loading = true
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
      font-size: 12px;
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
