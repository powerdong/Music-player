/*
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-29 12:51:54
 * @Update log: 更新日志
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'styles/reset.css'
import 'styles/border.css'

fastclick.attach(document.body)
// import ""

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
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
