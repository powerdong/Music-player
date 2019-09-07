/*
 * @Author: 李浩栋
 * @Begin: 2019-08-19 13:42:17
 * @Update: 2019-09-07 21:20:38
 * @Update log: 更新日志
 */
// ===================发现页面
export const bannerSwiper = '/api/banner?type=1' // 请求发现页面轮播图
export const recSongList = '/api/top/playlist' // 推荐歌单，歌单广场
export const highquality = '/api/top/playlist/highquality' // 精品歌单 !!!
export const catlist = '/api/playlist/catlist' // 获取歌单分类 !!!
export const hot = '/api/playlist/hot' // 获取热门歌单分类 !!!
export const topList = '/api/toplist/detail' // 获取所有榜单内容摘要   !!!
export const idxList = '/api/top/list' // 获取排行榜 !!!
export const recSongs = '/api/recommend/songs' // 每日推荐歌曲
export const dateRecSongList = '/api/recommend/resource' // 每日推荐歌单，发现页展示的那六个
export const newDish = '/api/top/album' // 发现页新碟
// ===================登陆
export const phoneLogin = '/api/login/cellphone' // 手机号登陆
export const phoneRegistered = '/api/cellphone/existence/check' // 手机号是否被注册
export const sendVerify = '/api/captcha/sent' // 发送验证码
export const verify = '/api//captcha/verify' // 验证验证码
export const loginStatus = '/api/login/status' // 登录状态
// ===================我的页面相关
export const userRecord = '/api/user/record' // 用户播放记录
export const userInfo = '/api/user/subcount' // 用户信息
export const playlist = '/api/user/playlist' // 用户歌单
export const userDj = '/api/user/dj' // 用户电台
// ==================搜索页面相关
export const search = '/api/search' // 搜索关键词
export const defaultSearch = '/api/search/default' // 默认搜索关键词
export const suggestSearch = '/api/search/suggest' // 搜索建议
export const hotSearchList = '/api/search/hot/detail' // 热搜列表
