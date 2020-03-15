/*
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-12-07 13:17:07
 * @Update log: 更新日志
 */
import Vue from 'vue'
import Router from 'vue-router'

const navIndex = () => import(/* webpackChunkName: "group-nav" */ '@/pages/nav/index')
const findIndex = () => import(/* webpackChunkName: "group-findPage" */ '@/pages/findIndex/index')
const homeIndex = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/homeIndex/index')
const videoIndex = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/index')
const videoComments = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/videoComments/index')
const userInfoIndex = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/userInfoIndex/index')
const musicFestival = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/musicFestival')
const scene = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/scene')
const listenBGM = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/listenBGM')
const singing = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/singing')
const dance = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/dance')
const acg = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/acg')
const rock = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/rock')
const game = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/game')
const animation = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/videoIndex/components/animation')
const friend = () => import(/* webpackChunkName: "group-homePage" */ '@/pages/friendIndex/index')
const loginIndex = () => import(/* webpackChunkName: "group-loginPage" */ '@/pages/loginIndex/index')
const phoneAccount = () => import(/* webpackChunkName: "group-login-phonePage" */ '@/pages/loginIndex/components/phoneAccount')
const phonePwd = () => import(/* webpackChunkName: "group-login-pwdPage" */ '@/pages/loginIndex/components/phonePwd')
const phoneVerify = () => import(/* webpackChunkName: "group-login-verifyPage" */ '@/pages/loginIndex/components/phoneVerify')
const search = () => import(/* webpackChunkName: "group-searchPage" */ '@/pages/searchIndex/index')
const searchResults = () => import(/* webpackChunkName: "group-resultPage" */ '@/pages/searchResults/index')
const singer = () => import(/* webpackChunkName: "group-resultPage" */ '@/pages/searchResults/singerIndex/singer')
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
const classification = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/dj/childrenPage/class')
const djPayGift = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/dj/childrenPage/djPayGift')
const djRanking = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/dj/childrenPage/ranking')
const djRankingAnchor = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/dj/childrenPage/ranking-anchor')
const djRankingProgram = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/dj/childrenPage/ranking-program')
const djRankingRadio = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/dj/childrenPage/ranking-radio')
const albumPage = () => import(/* webpackChunkName: "group-albumPage" */ 'base/albumPage')
const djDetailPage = () => import(/* webpackChunkName: "group-djDetailPage" */ 'base/djDetailPage')
const djTopConDetailPage = () => import(/* webpackChunkName: "group-djDetailPage" */ '@/pages/dj/childrenPage/topConDetail')
const djClassRecommendDetailPage = () => import(/* webpackChunkName: "group-djDetailPage" */ '@/pages/dj/childrenPage/classRecommend')
const artistDetailPage = () => import(/* webpackChunkName: "group-djDetailPage" */ '@/components/detailPage')
const recentlyPlayed = () => import(/* webpackChunkName: "group-recentlyPlayed" */ '@/pages/recentlyPlayed')
const djSublist = () => import(/* webpackChunkName: "group-djSublist" */ '@/pages/djSublist')
const myFavorite = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite')
const albums = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/albums')
const artists = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/artists')
const column = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/column')
const mlog = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/mlog')
const videos = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/myFavorite/components/videos')
const moreNewDish = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/findIndex/components/moreNewDish')
const moreNewSongs = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/findIndex/components/moreNewSongs')
const chinese = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/findIndex/components/chinese')
const europe = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/findIndex/components/europe')
const korea = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/findIndex/components/korea')
const japan = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/findIndex/components/japan')
const comments = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/commentsIndex/index')

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
    }, {
      path: '/friend',
      component: friend
    }, {
      path: '/videoPage',
      name: 'videoPage',
      component: videoIndex,
      redirect: '/videoPage/musicFestival',
      children: [{
        path: '/videoPage/musicFestival',
        component: musicFestival
      }, {
        path: '/videoPage/scene/:id',
        component: scene
      }, {
        path: '/videoPage/listenBGM/:id',
        component: listenBGM
      }, {
        path: '/videoPage/singing/:id',
        component: singing
      }, {
        path: '/videoPage/dance/:id',
        component: dance
      }, {
        path: '/videoPage/ACG/:id',
        component: acg
      }, {
        path: '/videoPage/rock/:id',
        component: rock
      }, {
        path: '/videoPage/game/:id',
        component: game
      }, {
        path: '/videoPage/animation/:id',
        component: animation
      }]
    }]
  }, {
    // 视频评论页面
    // 使用  this.$router.push({ name: 'videoComments', params: { id } })
    // 可以使得地址栏不显示 id 信息，并且可以通过 this.$route.params 获取到值
    // 要注意这时候在path中不能再写 /:id
    path: '/videoComments',
    name: 'videoComments',
    component: videoComments
  }, {
    // 更多新碟
    path: '/moreNewDish',
    component: moreNewDish
  }, {
    // 新歌推荐
    path: '/moreNewSongs',
    component: moreNewSongs,
    redirect: '/chinese',
    children: [{
      path: '/chinese',
      component: chinese
    }, {
      path: '/europe',
      component: europe
    }, {
      path: '/korea',
      component: korea
    }, {
      path: '/japan',
      component: japan
    }]
  }, {
    // 最近播放
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
    component: phoneAccount
  }, {
    path: '/pwd',
    name: 'phonePwd',
    component: phonePwd
  }, {
    path: '/verify',
    name: 'phoneVerify',
    component: phoneVerify
  },
  {
    // 搜索页
    path: '/search',
    component: search
  },
  {
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
  },
  {
    // 歌手分类页面
    path: '/singer',
    component: singer
  },
  {
    // 用户信息展示页面
    path: '/user_info',
    name: 'user_info',
    component: userInfoIndex
  },
  {
    // 每日推荐页面
    path: '/dateRecommend',
    component: dateRecommend
  },
  {
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
  },
  {
    // 排行榜页面
    path: '/idx',
    component: idx
  },
  {
    // 电台页面
    path: '/dj',
    component: dj
  },
  {
    path: '/conDetail',
    name: 'conDetail',
    component: djTopConDetailPage
  },
  {
    // 电台分类
    path: '/classification',
    component: classification
  },
  {
    // 电台分类详情
    path: '/classDetail',
    name: 'classDetail',
    component: djClassRecommendDetailPage
  },
  {
    path: '/pay_fine',
    component: djPayGift
  },
  {
    path: '/ranking',
    component: djRanking,
    redirect: '/program',
    children: [{
      path: '/anchor',
      component: djRankingAnchor
    }, {
      path: '/program',
      component: djRankingProgram
    }, {
      path: '/radio',
      component: djRankingRadio
    }]
  },
  {
    // 通用专辑展示页面
    path: '/albumPage',
    name: 'albumPage',
    component: albumPage
  },
  {
    // 通用电台详情展示页面
    path: '/djDetailPage',
    name: 'djDetailPage',
    component: djDetailPage
  },
  {
    // 通用歌手展示页面
    path: '/artistDetailPage',
    name: 'artistDetailPage',
    component: artistDetailPage
  },
  {
    // 通用评论展示页面
    path: '/comments',
    name: 'comments',
    component: comments
  }
  ]
})
