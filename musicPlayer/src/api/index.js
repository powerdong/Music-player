/*
 * @Author: 李浩栋
 * @Begin: 2019-08-19 13:47:19
 * @Update: 2019-12-08 12:02:19
 * @Update log: 更新日志
 */
import axios from 'axios'
import {
  bannerSwiper,
  recSongList,
  highquality,
  recSongs,
  topList,
  dateRecSongList,
  newDish,
  phoneLogin,
  albumDetail,
  sendVerify,
  verify,
  phoneRegistered,
  loginStatus,
  userRecord,
  userInfo,
  playlist,
  userDj,
  hotSearchList,
  search,
  defaultSearch,
  suggestSearch,
  songUrl,
  checkSong,
  songLyric,
  idxList,
  addOrDeletePlaylist,
  addPlaylist,
  deletePlaylist,
  heartMode,
  favoriteAlbums,
  favoriteArtists,
  favoriteVideos,
  djSublist,
  newSongs,
  getDishInfo,
  personalFm,
  singerClass,
  logout,
  radioRecommendations,
  boutiqueRecommendations,
  djClassification,
  djClassificationInfo,
  djProgram,
  djDetail,
  djPayGift,
  djSub,
  djBanner,
  djToplist,
  djHotToplist,
  likeMusicList,
  likeMusic,
  userDetail,
  signIn,
  friend,
  getVideoTag,
  getVideoGroup,
  commentPlaylist,
  commentLike,
  commentAlbum,
  userEvent,
  pushOrDeleteCom,
  getVideoUrl,
  register,
  commentDj,
  getVideoDetail,
  getVideoRelated,
  getVideoComments,
  resourceLike,
  djProgramTopHours,
  djToplistHours,
  djToplistNewComers,
  djToplistPopulars,
  djToplistPays
} from './config'
// 请求超时时间
axios.defaults.timeout = 30000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 以后可以利用 ES6 的解构赋值进行重构
 * function personInfo({ name, age, address, gender }) {
      console.log(name, age, address, gender)
    }
    personInfo({ gender: 'man', address: 'changsha', name: 'william', age: 18 })

    function saveInfo({
      name = 'william',
      age = 18,
      address = 'changsha',
      gender = 'man'
    } = {}) {
      console.log(name, age, address, gender)
    }
    saveInfo()
 */

export default {
  /**
   * 请求发现页面首页轮播图
   */
  bannerSwiperFn () {
    return axios.get(bannerSwiper)
  },
  /**
   * 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
   */
  recSongsFn () {
    return axios.get(recSongs)
  },
  /**
   * 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐
   * @param {*} id 歌单 id
   * @param {*} s 歌单最近的 s 个收藏者,默认5个
   */
  albumDetailFn (id, s = 5) {
    return axios.get(albumDetail, {
      params: {
        id,
        s
      }
    })
  },
  /**
   * 调用此接口,可获取所有榜单内容摘要
   */
  topListFn () {
    return axios.get(topList)
  },
  /**
   * 请求 可获取推荐歌单
   * ?limit=10&order=hot
   * @param {*} limit 取出数量，默认是30
   * @param {*} order 分别对应最新和最热,可选值为 'new' 和 'hot'
   * @param {*} cat tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",
   *  :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
   */
  recSongListFn (limit = 30, order = 'hot', cat) {
    return axios.get(recSongList, {
      params: {
        limit,
        order,
        cat
      }
    })
  },
  /**
   * 获取精品歌单
   * @param {*} limit 取出歌单数量 , 默认为 30
   * @param {*} before 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
   * @param {*} cat cat: tag
   */
  highqualityFn (limit = 30, before, cat) {
    return axios.get(highquality, {
      params: {
        limit,
        before,
        cat
      }
    })
  },
  /**
   * 调用此接口 , 传入数字 idx, 可获取不同排行榜
   * @param {*} idx 排行榜 idx
   */
  idxListFn (idx) {
    return axios.get(idxList, {
      params: {
        idx
      }
    })
  },
  /**
   * 可获得每日推荐歌单 ( 需要登录 )
   */
  dateRecSongListFn () {
    return axios.get(dateRecSongList)
  },
  /**
   * 调用此接口 , 可获取新碟上架列表
   * @param {*} limit 取出数量 , 默认为 50
   * @param {*} offset 偏移数量 , 用于分页
   *  如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
   */
  newDishFn (limit = 10, offset) {
    return axios.get(newDish, {
      params: {
        limit,
        offset
      }
    })
  },
  /**
   * 调用此接口 , 传入专辑 id, 可获得专辑内容
   * @param {*} id 专辑id
   */
  getDishInfoFn (id) {
    return axios.get(getDishInfo, {
      params: {
        id
      }
    })
  },
  /**
   * 检测手机号码是否已注册
   * @param {*} phone 手机号
   */
  phoneRegisteredFn (phone) {
    return axios.get(phoneRegistered, {
      params: {
        phone
      }
    })
  },
  /**
   * 调用此接口 ,传入手机号码, 可发送验证码
   * @param {number} phone 手机号
   */
  sendVerifyFn (phone) {
    return axios.get(sendVerify, {
      params: {
        phone
      }
    })
  },
  /**
   * 验证验证码
   * 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
   * @param {*} phone 手机号
   * @param {*} captcha 验证码
   */
  verifyFn (phone, captcha) {
    return axios.get(verify, {
      params: {
        phone,
        captcha
      }
    })
  },
  /**
   * 用户通过手机登录
   * @param {number} phone 手机号
   * @param {String} password 密码
   */
  phoneLoginFn (phone, password) {
    return axios.get(phoneLogin, {
      params: {
        phone: phone || '',
        password: password || ''
      }
    })
  },
  /**
   * 获取当前登录状态
   */
  loginStatusFn () {
    return axios.get(loginStatus)
  },
  /**
   * 获取用户播放记录
   * 登陆后调用此接口 , 传入用户 id, 可获取用户播放记录
   * @param {*} uid 用户id
   * @param {*} type type=1 时只返回 weekData, type=0 时返回 allData
   */
  userRecordFn (uid, type = 1) {
    return axios.get(userRecord, {
      params: {
        uid,
        type
      }
    })
  },
  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   * 登陆后调用此接口 , 可以获取用户信息
   * artistCount: 2 我的收藏中的歌手
   * code: 200
   * createDjRadioCount: 0
   * createdPlaylistCount: 2 创建的歌单数
   * djRadioCount: 1 我的电台
   * mvCount: 0
   * newProgramCount: 0
   * programCount: 0
   * subPlaylistCount: 3 收藏的歌单数
   * @param {*} timestamp 时间戳，使得每次请求的URL不同，除掉了默认的2分钟缓存
   */
  userInfoFn (timestamp) {
    return axios.get(userInfo, {
      params: {
        timestamp
      }
    })
  },
  /**
   * 登陆后调用此接口 , 传入用户 id, 可以获取用户详情
   * @param {*} uid 用户id
   */
  userDetailFn (uid) {
    return axios.get(userDetail, {
      params: {
        uid
      }
    })
  },
  /**
   * 登陆后调用此接口 , 传入用户 id, 可以获取用户动态
   * @param {*} uid 用户 id
   * @param {*} limit  返回数量 , 默认为 30
   * @param {*} lasttime 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
   */
  userEventFn (uid, limit = 20, lasttime) {
    return axios.get(userEvent, {
      params: {
        uid,
        limit,
        lasttime
      }
    })
  },
  /**
   * 调用此接口 , 传入签到类型
   * @param {*} type 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
   * 其中安卓端签到可获得 3 点经验 , web/PC 端签到可获得 2 点经验
   */
  signInFn (type) {
    return axios.get(signIn, {
      params: {
        type
      }
    })
  },
  /**
   * 调用此接口 ,传入手机号码和验证码,密码,昵称, 可注册网易云音乐账号(同时可修改密码)
   * @param {*} captcha 验证码
   * @param {*} phone 手机号码
   * @param {*} password 密码
   * @param {*} nickname 昵称
   */
  registerFn (captcha, phone, password, nickname) {
    return axios.get(register, {
      params: {
        captcha,
        phone,
        password,
        nickname
      }
    })
  },
  /**
   * 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
   * @param {*} uid 用户id
   * @param {*} timestamp 时间戳，使得每次请求的URL不同，除掉了默认的2分钟缓存
   */
  playlistFn (uid, timestamp) {
    return axios.get(playlist, {
      params: {
        uid,
        timestamp
      }
    })
  },
  /**
   * 登陆后调用此接口 , 传入用户 id, 可以获取用户电台
   * @param {*} uid 用户 id
   */
  userDjFn (uid) {
    return axios.get(userDj, {
      params: {
        uid
      }
    })
  },
  /**
   * 调用此接口,可获取热门搜索列表
   */
  hotSearchListFn () {
    return axios.get(hotSearchList)
  },
  /**
   * 调用此接口 , 传入搜索关键词可以搜索
   * 该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开
   * @param {*} keywords 关键词
   * @param {*} limit 返回数量 , 默认为 30
   * @param {*} offset 偏移数量，用于分页 默认为 0
   * @param {*} type 搜索类型 默认为 1 即单曲 这里设置默认返回综合
   * 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单
   * 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
   */
  searchFn (keywords, limit = 30, offset = 0, type = 1018) {
    return axios.get(search, {
      params: {
        keywords,
        limit,
        offset,
        type
      }
    })
  },
  /**
   * 调用此接口 , 可获取默认搜索关键词
   */
  defaultSearchFn () {
    return axios.get(defaultSearch)
  },
  /**
   * 调用此接口
   * 传入搜索关键词可获得搜索建议 ,
   * 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
   * @param {*} keywords 关键词
   * @param {*} type 默认返回移动端数据
   */
  suggestSearchFn (keywords, type = 'mobile') {
    return axios.get(suggestSearch, {
      params: {
        keywords,
        type
      }
    })
  },
  /**
   *  使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url
   * 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 )
   * 可以获取对应的音乐的 url( 不需要登录 )
   * @param {*} id 音乐 id
   * @param {*} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
   */
  songUrlFn (id, br) {
    return axios.get(songUrl, {
      params: {
        id,
        br
      }
    })
  },
  /**
   * 传入歌曲 id, 可获取音乐是否可用
   * @param {*} id 歌曲 id
   * @param {*} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
   */
  checkSongFn (id, br) {
    return axios.get(checkSong, {
      params: {
        id,
        br
      }
    })
  },
  /**
   * 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
   * @param {*} id 歌曲id
   */
  songLyricFn (id) {
    return axios.get(songLyric, {
      params: {
        id
      }
    })
  },
  /**
   * 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
   * @param {*} t 1：收藏 2：取消收藏
   * @param {*} id  歌单id
   */
  addOrDeletePlaylistFn (t, id) {
    return axios.get(addOrDeletePlaylist, {
      params: {
        t,
        id
      }
    })
  },
  /**
   * 调用此接口 , 传入歌单名字可新建歌单
   * @param {*} name 歌单名
   * @param {*} privacy 是否为隐私歌单 传'10'设置为隐私歌单
   */
  addPlaylistFn (name, privacy) {
    return axios.get(addPlaylist, {
      params: {
        name,
        privacy
      }
    })
  },
  /**
   * 调用此接口 , 传入歌单名字可新建歌单
   * @param {*} id 歌单id
   */
  deletePlaylistFn (id) {
    return axios.get(deletePlaylist, {
      params: {
        id
      }
    })
  },
  /**
   * 登录后调用此接口 , 可获取心动模式/智能播放列表
   * @param {*} id  歌曲 id
   * @param {*} pid 歌单id
   * @param {*} sid 要开始播放的歌曲id
   */
  heartModeFn (id, pid, sid) {
    return axios.get(heartMode, {
      params: {
        id,
        pid,
        sid
      }
    })
  },
  /**
   * 调用此接口 , 传入音乐 id, 可喜欢该音乐
   * @param {*} id 音乐id
   * @param {*} like 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
   */
  likeMusicFn (id, like) {
    return axios.get(likeMusic, {
      params: {
        id,
        like
      }
    })
  },
  /**
   * 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
   * @param {*} uid 用户id
   */
  likeMusicListFn (uid) {
    const timestamp = +new Date()
    return axios.get(likeMusicList, {
      params: {
        uid,
        timestamp
      }
    })
  },
  /**
   * 调用此接口 , 可获得已收藏专辑列表
   * @param {*} limit 取出数量 , 默认为 25
   * @param {*} offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
   */
  favoriteAlbumsFn (limit, offset) {
    return axios.get(favoriteAlbums, {
      params: {
        limit,
        offset
      }
    })
  },
  /**
   * 调用此接口,可获取收藏的歌手列表
   */
  favoriteArtistsFn () {
    return axios.get(favoriteArtists)
  },
  /**
   * 调用此接口,可收藏视频
   */
  favoriteVideosFn () {
    return axios.get(favoriteVideos)
  },
  /**
   * 获取视频详情
   * @param {*} id 视频id
   */
  getVideoDetailFn (id) {
    return axios.get(getVideoDetail, {
      params: {
        id
      }
    })
  },
  /**
   * 获取相关视频
   * @param {*} id 视频id
   */
  getVideoRelatedFn (id) {
    return axios.get(getVideoRelated, {
      params: {
        id
      }
    })
  },
  /**
   * 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 ( 不需要登录 )
   * @param {*} id 视频的 id
   * @param {*} limit 取出评论数量 , 默认为 20
   * @param {*} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
   * @param {*} before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
   */
  getVideoCommentsFn (id, limit = 20, offset, before) {
    const timestamp = +new Date()
    return axios.get(getVideoComments, {
      params: {
        id,
        limit,
        offset,
        before,
        timestamp
      }
    })
  },
  /**
   * 登陆后调用此接口 , 可获取订阅的电台列表
   */
  djSublistFn (timestamp) {
    return axios.get(djSublist, {
      params: {
        timestamp
      }
    })
  },
  /**
   * 调用此接口 , 可获取新歌速递
   * @param {*} type 地区类型 id,对应以下:
   * 全部:0 华语:7 欧美:96 日本:8 韩国:16
   */
  newSongsFn (type = 0) {
    return axios.get(newSongs, {
      params: {
        type
      }
    })
  },
  /**
   * 获取私人 FM
   * 需要登录
   */
  personalFmFn () {
    return axios.get(personalFm)
  },
  /**
   * 调用此接口,可获取歌手分类列表
   * @param {*} cat 歌手类型, 必选
   * 入驻歌手 5001
   * 华语男歌手 1001 华语女歌手 1002 华语组合/乐队 1003
   * 欧美男歌手 2001 欧美女歌手 2002 欧美组合/乐队 2003
   * 日本男歌手 6001 日本女歌手 6002 日本组合/乐队 6003
   * 韩国男歌手 7001 韩国女歌手 7002 韩国组合/乐队 7003
   * 其他男歌手 4001 其他女歌手 4002 其他组合/乐队 4003
   * @param {*} limit  返回数量 , 默认为 30
   * @param {*} offset 偏移数量，用于分页，默认为 0
   * @param {*} initial 按首字母索引查找参数
   * /artist/list?cat=1001&initial=b
   * 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列
   */
  singerClassFn (cat = 1001, limit = 30, offset = 0, initial) {
    return axios.get(singerClass, {
      params: {
        cat,
        limit,
        offset,
        initial
      }
    })
  },
  /**
   * 退出账号
   */
  logoutFn () {
    return axios.get(logout)
  },
  /**
   * 调用此接口,可获取电台banner
   */
  djBannerFn () {
    return axios.get(djBanner)
  },
  /**
   * 获取电台页面的电台推荐数据
   */
  radioRecomFn () {
    return axios.get(radioRecommendations)
  },
  /**
   * 可以获取付费精选的电台列表
   * @param {*} limit 返回数量 , 默认为 30
   * @param {*} offset  偏移数量, 默认为 0
   */
  boutiqueRecomFn (limit = 3, offset = 0) {
    return axios.get(boutiqueRecommendations, {
      params: {
        limit,
        offset
      }
    })
  },
  /**
   * 登陆后调用此接口 , 可获得电台类型
   */
  djClassificationFn () {
    return axios.get(djClassification)
  },
  /**
   * 登陆后调用此接口 , 可获得推荐电台
   * @param {*} type 电台类型
   * 可通过/dj/catelist获取 , 对应关系为 id 对应 此接口的 type, name 对应类型意义
   */
  djClassificationInfoFn (type) {
    return axios.get(djClassificationInfo, {
      params: {
        type
      }
    })
  },
  /**
   * 登陆后调用此接口 , 传入rid, 可查看对应电台的电台节目以及对应的 id
   * 需要 注意的是这个接口返回的 mp3Url 已经无效 , 都为 null
   * 但是通过调用 /song/url 这 个接口 , 传入节目 id 仍然能获取到节目音频 ,
   * 如 /song/url?id=478446370 获取代 码时间的一个节目的音频
   * @param {*} rid 电台 的 id
   * @param {*} limit 返回数量 , 默认为 30
   * @param {*} offset 偏移数量，用于分页
   * @param {*} asc 排序方式,默认为 false (新 => 老 ) 设置 true 可改为 老 => 新
   */
  djProgramFn (rid, limit = 30, offset = 0, asc) {
    return axios.get(djProgram, {
      params: {
        rid,
        limit,
        offset,
        asc
      }
    })
  },
  /**
   * 登陆后调用此接口 , 传入rid, 可获得对应电台的详情介绍
   * @param {*} rid 电台 的 id
   */
  djDetailFn (rid) {
    return axios.get(djDetail, {
      params: {
        rid
      }
    })
  },
  /**
   * 可以获取付费精选的电台列表 , 传入 limit 和 offset 可以进行分页
   * @param {*} limit 返回数量 , 默认为 30
   * @param {*} offset 偏移数量，用于分页
   */
  djPayGiftFn (limit = 30, offset = 0) {
    return axios.get(djPayGift, {
      params: {
        limit,
        offset
      }
    })
  },
  /**
   * 登陆后调用此接口 , 传入rid, 可订阅 dj
   * @param {*} rid 电台 的 id
   * @param {*} t t=1 对应关注 t=0 对应取消关注
   */
  djSubFn (rid, t) {
    return axios.get(djSub, {
      params: {
        rid,
        t
      }
    })
  },
  /**
   * 登陆后调用此接口 , 可获得电台节目榜
   * @param {*} limit  返回数量 , 默认为 100
   * @param {*} offset 偏移数量，用于分页
   */
  djToplistFn (limit = 100, offset = 0) {
    return axios.get(djToplist, {
      params: {
        limit,
        offset
      }
    })
  },
  /**
   * 登陆后调用此接口 , 可获得新晋电台榜/热门电台榜
   * @param {*} limit 返回数量 , 默认为 100
   * @param {*} offset 偏移数量，用于分页
   * @param {*} type 榜单类型, new 为新晋电台榜, hot为热门电台榜
   */
  djHotToplistFn (limit = 100, offset = 0, type = 'hot') {
    return axios.get(djHotToplist, {
      params: {
        limit,
        offset,
        type
      }
    })
  },
  /**
   * 调用此接口,可获取24小时节目榜
   * @param {*} limit 返回数量 , 默认为 100 (不支持 offset)
   */
  djProgramTopHoursFn (limit) {
    return axios.get(djProgramTopHours, {
      params: {
        limit
      }
    })
  },
  /**
   * 调用此接口,可获取24小时主播榜
   * @param {*} limit 返回数量 , 默认为 100 (不支持 offset)
   */
  djToplistHoursFn (limit) {
    return axios.get(djToplistHours, {
      params: {
        limit
      }
    })
  },
  /**
   * 说明 : 调用此接口,可获取主播新人榜
   * @param {*} limit 返回数量 , 默认为 100 (不支持 offset)
   */
  djToplistNewComersFn (limit) {
    return axios.get(djToplistNewComers, {
      params: {
        limit
      }
    })
  },
  /**
   * 调用此接口,可获取最热主播榜
   * @param {*} limit 返回数量 , 默认为 100 (不支持 offset)
   */
  djToplistPopularsFn (limit) {
    return axios.get(djToplistPopulars, {
      params: {
        limit
      }
    })
  },
  /**
   * 调用此接口,可获取付费精品电台
   * @param {*} limit 返回数量 , 默认为 100 (不支持 offset)
   */
  djToplistPaysFn (limit) {
    return axios.get(djToplistPays, {
      params: {
        limit
      }
    })
  },
  /**
   * 调用此接口 , 可获取各种动态
   * 对应网页版网易云，朋友界面里的各种动态消息
   * 如分享的视频，音乐，照片等！
   * @param {*} pagesize  每页数据,默认20
   * @param {*} lasttime  返回数据的 lasttime ,默认-1
   * 传入上一次返回结果的 lasttime,将会返回下一页的数据
   */
  friendFn (pagesize = 20, lasttime = -1) {
    return axios.get(friend, {
      params: {
        pagesize,
        lasttime
      }
    })
  },
  /**
   * 调用此接口 , 可获取视频标签列表
   */
  getVideoTagFn () {
    return axios.get(getVideoTag)
  },
  /**
   * 调用此接口 , 传入id,可获取到相关的视频
   * @param {*} id videoGroup 的 id
   */
  getVideoGroupFn (id) {
    return axios.get(getVideoGroup, {
      params: {
        id
      }
    })
  },
  /**
   * 调用此接口 , 传入视频 id,可获取视频播放地址
   * @param {*} id 视频 id
   */
  getVideoUrlFn (id) {
    return axios.get(getVideoUrl, {
      params: {
        id
      }
    })
  },
  /**
   * 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
   * @param {*} id 歌单id
   * @param {*} limit 取出评论数量 , 默认为 20
   * @param {*} offset 偏移数量 , 用于分页
   * @param {*} before 分页参数,取上一页最后一项的 time
   * 获取下一页数据(获取超过5000条评论的时候需要用到)
   */
  commentPlaylistFn (id, limit = 20, offset, before) {
    const timestamp = +new Date()
    return axios.get(commentPlaylist, {
      params: {
        id,
        limit,
        offset,
        before,
        timestamp
      }
    })
  },
  /**
   * 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
   * @param {*} id 专辑id
   * @param {*} limit 取出评论数量 , 默认为 20
   * @param {*} offset 偏移数量 , 用于分页
   * @param {*} before 分页参数,取上一页最后一项的 time
   * 获取下一页数据(获取超过5000条评论的时候需要用到)
   */
  commentAlbumFn (id, limit = 20, offset, before) {
    const timestamp = +new Date()
    return axios.get(commentAlbum, {
      params: {
        id,
        limit,
        offset,
        before,
        timestamp
      }
    })
  },
  commentDjFn (id, limit = 20, offset, before) {
    const timestamp = +new Date()
    return axios.get(commentDj, {
      params: {
        id,
        limit,
        offset,
        before,
        timestamp
      }
    })
  },
  /**
   * 调用此接口 , 传入 type,
   * 资源 id, 和评论 id cid
   * 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
   * @param {*} id 资源 id, 如歌曲 id,mv id
   * @param {*} cid 评论 id
   * @param {*} t 是否点赞 ,1 为点赞 ,0 为取消点赞
   * @param {*} type  数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
   * 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频  6: 动态
   */
  commentLikeFn (id, cid, t, type) {
    return axios.get(commentLike, {
      params: {
        id,
        cid,
        t,
        type
      }
    })
  },
  /**
   * 调用此接口,可发送评论
   * @param {*} t 1: 发送评论
   * @param {*} type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
   * 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频  6: 动态
   * @param {*} id 对应资源 id
   * @param {*} content 要发送的内容
   * @param {*} commentId 回复的评论id (回复评论时必填)
   * @param {*} threadId 如给动态发送评论，则不需要传 id，需要传动态的 threadId
   */
  pushComFn (type, id, content, commentId, threadId) {
    const t = 1
    const timestamp = +new Date()
    return axios.post(pushOrDeleteCom, {
      t,
      type,
      id,
      content,
      commentId,
      threadId,
      timestamp
    })
  },
  /**
   * 调用此接口,可删除评论
   * @param {*} t 0: 删除评论
   * @param {*} type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
   * 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频  6: 动态
   * @param {*} id 对应资源 id
   * @param {*} threadId 如给动态删除评论，则不需要传 id，需要传动态的 `threadId`
   * @param {*} commentId 回复的评论id (回复评论时必填),删除评论时传入评论的id
   */
  delComFn (type, id, commentId, threadId) {
    const t = 0
    return axios.post(pushOrDeleteCom, {
      t,
      type,
      id,
      threadId,
      commentId
    })
  },
  /**
   * 调用此接口 , 可对 MV,电台,视频点赞
   * @param {*} type 资源类型,对应以下类型 1: mv 4: 电台 5: 视频 6: 动态
   * @param {*} id 资源 id
   */
  resourceLikeInFn (type, id) {
    const t = 1
    return axios.get(resourceLike, {
      params: {
        t,
        type,
        id
      }
    })
  },
  /**
   * 调用此接口 , 可对 MV,电台,视频取消点赞
   * @param {*} type 资源类型,对应以下类型 1: mv 4: 电台 5: 视频 6: 动态
   * @param {*} id 资源 id
   */
  resourceLikeOutFn (type, id) {
    const t = 0
    return axios.get(resourceLike, {
      params: {
        t,
        type,
        id
      }
    })
  }
}
