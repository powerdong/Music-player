/*
 * @Author: 李浩栋
 * @Begin: 2019-08-19 13:42:17
 * @Update: 2019-10-04 12:26:53
 * @Update log: 更新日志
 */
// ===================发现页面
export const bannerSwiper = '/api/banner?type=1' // 请求发现页面轮播图
export const recSongList = '/api/top/playlist' // 推荐歌单，歌单广场
export const highquality = '/api/top/playlist/highquality' // 精品歌单
export const catlist = '/api/playlist/catlist' // 获取歌单分类 !!!
export const hot = '/api/playlist/hot' // 获取热门歌单分类 !!!
export const topList = '/api/toplist/detail' // 获取所有榜单内容摘要
export const idxList = '/api/top/list' // 获取排行榜
export const albumDetail = '/api/playlist/detail' // 获取歌单详情
export const recSongs = '/api/recommend/songs' // 每日推荐歌曲
export const dateRecSongList = '/api/recommend/resource' // 每日推荐歌单，发现页展示的那六个
export const newDish = '/api/top/album' // 发现页新碟
export const newSongs = '/api/top/song' // 发现页新歌
// ======================播放歌曲
export const songUrl = 'api/song/url' // 获取歌曲url
export const checkSong = 'api/check/music' // 查看歌曲是否可用
export const songLyric = 'api/lyric' // 获取歌词
export const heartMode = 'api/playmode/intelligence/list' // 心动模式播放
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
export const favoriteAlbums = '/api/album/sublist' // 获取收藏的专辑
export const favoriteArtists = '/api/artist/sublist' // 获取收藏的歌手
export const favoriteVideos = '/api/mv/sublist' // 获取收藏的视频
export const djSublist = '/api/dj/sublist' // 获取订阅的电台
// ==================搜索页面相关
export const search = '/api/search' // 搜索关键词
export const defaultSearch = '/api/search/default' // 默认搜索关键词
export const suggestSearch = '/api/search/suggest' // 搜索建议
export const hotSearchList = '/api/search/hot/detail' // 热搜列表
// =================歌单事件
export const addOrDeletePlaylist = '/api/playlist/subscribe' // 收藏/取消收藏歌单
export const addPlaylist = '/api/playlist/create' // 添加歌单
export const deletePlaylist = '/api/playlist/delete' // 删除歌单
