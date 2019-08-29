/*
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-08-29 13:25:29
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
  }]
})
