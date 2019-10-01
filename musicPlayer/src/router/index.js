/*
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-10-01 14:57:34
 * @Update log: 更新日志
 */
import Vue from 'vue'
import Router from 'vue-router'

const navIndex = () => import(/* webpackChunkName: "group-nav" */ '@/pages/nav/index')
const findIndex = () => import(/* webpackChunkName: "group-findPage" */ '@/pages/findIndex/index')
const homeIndex = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/homeIndex/index')
const loginIndex = () => import(/* webpackChunkName: "group-loginPage" */ '@/pages/loginIndex/index')
const accountLogin = () => import(/* webpackChunkName: "group-login-accountPage" */ '@/pages/loginIndex/components/accountLogin')
const phoneAccount = () => import(/* webpackChunkName: "group-login-phonePage" */ '@/pages/loginIndex/components/phoneAccount')
const phonePwd = () => import(/* webpackChunkName: "group-login-pwdPage" */ '@/pages/loginIndex/components/phonePwd')
const phoneVerify = () => import(/* webpackChunkName: "group-login-verifyPage" */ '@/pages/loginIndex/components/phoneVerify')
const search = () => import(/* webpackChunkName: "group-searchPage" */ '@/pages/searchIndex/index')
const searchResults = () => import(/* webpackChunkName: "group-resultPage" */ '@/pages/searchResults/index')
const composite = () => import(/* webpackChunkName: "group-result-comPage" */ '@/pages/searchResults/composite/composite')
const song = () => import(/* webpackChunkName: "group-result-songPage" */ '@/pages/searchResults/songIndex/song')
const video = () => import(/* webpackChunkName: "group-result-videoPage" */ '@/pages/searchResults/videoIndex/video')
const artist = () => import(/* webpackChunkName: "group-result-artistPage" */ '@/pages/searchResults/artistIndex/artist')
const album = () => import(/* webpackChunkName: "group-result-albumPage" */ '@/pages/searchResults/albumIndex/album')
const playList = () => import(/* webpackChunkName: "group-result-playlistPage" */ '@/pages/searchResults/playListIndex/playList')
const djRadio = () => import(/* webpackChunkName: "group-result-djRadioPage" */ '@/pages/searchResults/djRadioIndex/djRadio')
const user = () => import(/* webpackChunkName: "group-result-userPage" */ '@/pages/searchResults/userIndex/user')
const dateRecommend = () => import(/* webpackChunkName: "group-date-recommendPage" */ '@/pages/dateRecommend')
const recommend = () => import(/* webpackChunkName: "group-recommendPage" */ '@/pages/recommend')
const recommended = () => import(/* webpackChunkName: "group-recommendedPage" */ '@/pages/recommend/recommended')
const fine = () => import(/* webpackChunkName: "group-recommendedPage" */ '@/pages/recommend/fine')
const general = () => import(/* webpackChunkName: "group-recommendedPage" */ '@/pages/recommend/general')
const idx = () => import(/* webpackChunkName: "group-idxPage" */ '@/pages/idx')
const dj = () => import(/* webpackChunkName: "group-djPage" */ '@/pages/dj')
const personalFm = () => import(/* webpackChunkName: "group-personal-fmPage" */ '@/pages/personalFm')
const albumPage = () => import(/* webpackChunkName: "group-albumPage" */ 'base/albumPage')
const recentlyPlayed = () => import(/* webpackChunkName: "group-recentlyPlayed" */ '@/pages/recentlyPlayed')
const djSublist = () => import(/* webpackChunkName: "group-djSublist" */ '@/pages/djSublist')
const myFavorite = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite')
const albums = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/albums')
const artists = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/artists')
const column = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/column')
const mlog = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/mlog')
const videos = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/videos')

Vue.use(Router)

export default new Router({
  /**************************************************
   *
   * 设置 链接激活时使用的 CSS 类名
   * 默认值: "router-link-active"
   * 可以通过路由的构造选项 linkActiveClass 来全局配置。
   *
   * 通过设置 meta: { keepAlive: true },来定义一个页面是否需要做缓存
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
    path: '/recently',
    component: recentlyPlayed
  }, {
    path: '/dj_sublist',
    component: djSublist
  }, {
    path: '/favorite',
    component: myFavorite,
    redirect: '/albums',
    children: [{
      path: '/albums',
      component: albums
    }, {
      path: '/artists',
      component: artists
    }, {
      path: '/videos',
      component: videos
    }, {
      path: '/column',
      component: column
    }, {
      path: '/mlog',
      component: mlog
    }]
  }, {
    path: '/login',
    name: 'login',
    component: loginIndex
  }, {
    // 登录的一系列路由
    path: '/phone',
    component: accountLogin,
    children: [{
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
    // 搜索页
    path: '/search',
    component: search
  }, {
    // 搜索展示页面
    path: '/searchResults/:id',
    component: searchResults,
    redirect: '/composite/:id',
    children: [{
      // 综合页面
      path: '/composite/:id',
      component: composite
    }, {
      // 单曲页面
      path: '/song/:id',
      component: song
    }, {
      // 视频页面
      path: '/video/:id',
      component: video
    }, {
      // 歌手页面
      path: '/artist/:id',
      component: artist
    }, {
      // 专辑页面
      path: '/album/:id',
      component: album
    }, {
      // 歌单页面
      path: '/playList/:id',
      component: playList
    }, {
      // 主播电台页面
      path: '/djRadio/:id',
      component: djRadio
    }, {
      // 用户页面
      path: '/user/:id',
      component: user
    }]
  }, {
    // 每日推荐页面
    path: '/dateRecommend',
    component: dateRecommend
  }, {
    // 歌单广场页面
    path: '/recommend',
    component: recommend,
    redirect: '/recommended',
    children: [{
      // 推荐歌单
      path: '/recommended',
      component: recommended
    }, {
      // 精品歌单
      path: '/fine',
      component: fine
    }, {
      // 通用歌单
      path: '/general/:id',
      component: general
    }]
  }, {
    // 排行榜页面
    path: '/idx',
    component: idx
  }, {
    // 电台页面
    path: '/dj',
    component: dj
  }, {
    // 私人 FM 页面
    path: '/personalFm',
    component: personalFm
  }, {
    // 通用专辑展示页面
    path: '/albumPage/:id',
    component: albumPage
  }]
})
