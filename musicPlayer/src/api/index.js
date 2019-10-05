/*
 * @Author: 李浩栋
 * @Begin: 2019-08-19 13:47:19
 * @Update: 2019-09-28 12:53:36
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
  newSongs
} from './config'

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
  newDishFn (limit = 20, offset) {
    return axios.get(newDish, {
      params: {
        limit,
        offset
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
   */
  userInfoFn () {
    return axios.get(userInfo)
  },
  /**
   * 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
   * @param {*} uid 用户id
   */
  playlistFn (uid) {
    return axios.get(playlist, {
      params: {
        uid
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
   * 登陆后调用此接口 , 可获取订阅的电台列表
   */
  djSublistFn () {
    return axios.get(djSublist)
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
  }
}
