/*
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-08-18 13:51:41
 * @Update log: 更新日志
 */
import Vue from 'vue'
import Router from 'vue-router'

const findIndex = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/findIndex/index')
const homeIndex = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/homeIndex/index')
const loginIndex = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/index')
const phoneAccount = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/components/phoneAccount')
const phonePwd = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/components/phonePwd')
const phoneVerify = () => import(/* webpackChunkName: "group-Detail" */ '@/pages/loginIndex/components/phoneVerify')

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
    redirect: '/find'
  }, {
    path: '/find',
    component: findIndex
  }, {
    path: '/home',
    name: 'home',
    component: homeIndex
  }, {
    path: '/login',
    name: 'login',
    component: loginIndex
  }, {
    path: '/phone',
    name: 'phoneAccount',
    component: phoneAccount
  }, {
    path: '/pwd',
    name: 'phonePwd',
    component: phonePwd
  }, {
    path: '/verify',
    name: 'phoneVerify',
    component: phoneVerify
  }]
})
