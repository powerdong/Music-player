import Vue from "vue"
import Router from "vue-router"

const findIndex = () => import(/* webpackChunkName: "group-Detail" */ "@/pages/findIndex/index")
const homeIndex = () => import(/* webpackChunkName: "group-Detail" */ "@/pages/homeIndex/index")

Vue.use(Router)

export default new Router({
  linkActiveClass: "ac",
  routes: [{
    path: "/",
    name: "main",
    redirect: "/find",
    component: findIndex,
    children: [{
      path: "/find",
      component: findIndex
    }]
  }, {
    path: "/home",
    name: "home",
    component: homeIndex
  }]
})
