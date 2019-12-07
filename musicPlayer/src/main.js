/*
 * @Author: Lambda
 * @Begin: 2019-08-30 19:47:55
 * @Update: 2019-12-07 11:56:15
 * @Update log: 更新日志
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import topTip from '@/components/top-tip'
import {
  Search,
  ActionSheet,
  Swipe,
  SwipeItem,
  Button,
  Checkbox,
  CheckboxGroup,
  PasswordInput,
  NumberKeyboard,
  PullRefresh
} from 'vant'

import 'styles/reset.css'
import 'styles/border.css'

fastclick.attach(document.body)
// import ""
Vue.use(Search)
Vue.use(Button)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(PasswordInput).use(NumberKeyboard)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/load.gif',
  loading: 'http://q24ivthib.bkt.clouddn.com/loadingloader1.gif',
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})

Vue.component('top-tip', topTip)

/* eslint-disable no-new */
// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
window.vm = vm
