/*
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-27 13:17:18
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
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'styles/reset.css'
import 'styles/border.css'
import 'styles/resetEleUI.less'

fastclick.attach(document.body)
// import ""

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/load.gif',
  loading: 'https://s2.ax1x.com/2019/09/08/n8qAAS.gif',
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})

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
