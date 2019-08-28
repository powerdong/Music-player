/*
 * @Author: 李浩栋
 * @Begin: 2019-08-19 13:47:19
 * @Update: 2019-08-28 11:57:52
 * @Update log: 更新日志
 */
import axios from 'axios'

import {
  phoneLogin,
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
  suggestSearch
} from './config'

export default {
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
  userRecordFn (uid, type = 0) {
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
  }
}
