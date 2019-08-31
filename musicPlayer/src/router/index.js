/*
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-08-31 11:29:51
 * @Update log: 更新日志
 */
import Vue from 'vue'
import Router from 'vue-router'

const navIndex = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/nav/index')
const findIndex = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/findIndex/index')
const homeIndex = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/homeIndex/index')
const loginIndex = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/index')
const accountLogin = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/components/accountLogin')
const phoneAccount = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/components/phoneAccount')
const phonePwd = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/components/phonePwd')
const phoneVerify = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/components/phoneVerify')
const search = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchIndex/index')
const searchResults = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/index')
const composite = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/composite/composite')
const song = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/songIndex/song')
const video = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/videoIndex/video')
const artist = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/artistIndex/artist')
const album = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/albumIndex/album')
const playList = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/playListIndex/playList')
const djRadio = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/djRadioIndex/djRadio')
const user = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/searchResults/userIndex/user')

Vue.use(Router)

export default new Router({
  /**************************************************
   *
   * 设置 链接激活时使用的 CSS 类名
   * 默认值: "router-link-active"
   * 可以通过路由的构造选项 linkActiveClass 来全局配置。
   *
   **************************************************/
  linkActiveClass: 'ac',
  routes: [{
    /**
     * 设置页面初次加载后默认显示 find 页面
     */
    path: '/',
    name: 'main',
    component: navIndex,
    redirect: '/find',
    children: [{
      path: '/find',
      component: findIndex
    }, {
      path: '/home',
      name: 'home',
      component: homeIndex
    }]
  }, {
    path: '/login',
    name: 'login',
    component: loginIndex
  }, {
    // 登录的一系列路由
    path: '/phone',
    component: accountLogin,
    children: [ {
      path: '',
      component: phoneAccount
    }, {
      path: '/pwd',
      component: phonePwd
    }, {
      path: '/verify',
      name: 'phoneVerify',
      component: phoneVerify
    }]
  }, {
    path: '/search',
    component: search
  }, {
    path: '/searchResults/:id',
    component: searchResults,
    children: [{
      // 综合页面
      path: '',
      component: composite
    }, {
      // 单曲页面
      path: '/song',
      component: song
    }, {
      // 视频页面
      path: '/video',
      component: video
    }, {
      // 歌手页面
      path: '/artist',
      component: artist
    }, {
      // 专辑页面
      path: '/album',
      component: album
    }, {
      // 歌单页面
      path: '/playList',
      component: playList
    }, {
      // 主播电台页面
      path: 'djRadio',
      component: djRadio
    }, {
      // 用户页面
      path: 'user',
      component: user
    }]
  }]
})
