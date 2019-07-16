import Vue from "vue"
import Router from "vue-router"

const findIndex = () => import(/* webpackChunkName: "group-Detail" */ "@/pages/findIndex/index")

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
  }]
})
