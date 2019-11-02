/*
 * @Author: 李浩栋
 * @Begin: 2019-08-19 13:42:17
 * @Update: 2019-10-27 07:59:21
 * @Update log: 更新日志
 */
// 开发环境
const api = '/api'
// 线上环境
// const api = ''
// ===================发现页面
export const bannerSwiper = api + '/banner?type=1' // 请求发现页面轮播图
export const recSongList = api + '/top/playlist' // 推荐歌单，歌单广场
export const highquality = api + '/top/playlist/highquality' // 精品歌单
export const catlist = api + '/playlist/catlist' // 获取歌单分类 !!!
export const hot = api + '/playlist/hot' // 获取热门歌单分类 !!!
export const topList = api + '/toplist/detail' // 获取所有榜单内容摘要
export const idxList = api + '/top/list' // 获取排行榜
export const albumDetail = api + '/playlist/detail' // 获取歌单详情
export const recSongs = api + '/recommend/songs' // 每日推荐歌曲
export const dateRecSongList = api + '/recommend/resource' // 每日推荐歌单，发现页展示的那六个
export const newDish = api + '/top/album' // 发现页新碟
export const getDishInfo = api + '/album' // 获取专辑内容
export const newSongs = api + '/top/song' // 发现页新歌
export const personalFm = api + '/personal_fm' // 发现页私人FM
// ======================播放歌曲
export const songUrl = 'api/song/url' // 获取歌曲url
export const checkSong = 'api/check/music' // 查看歌曲是否可用
export const songLyric = 'api/lyric' // 获取歌词
export const heartMode = 'api/playmode/intelligence/list' // 心动模式播放
export const likeMusicList = 'api/likelist' // 喜欢歌曲列表
export const likeMusic = 'api/like' // 喜欢歌曲
// ===================登陆
export const phoneLogin = api + '/login/cellphone' // 手机号登陆
export const phoneRegistered = api + '/cellphone/existence/check' // 手机号是否被注册
export const sendVerify = api + '/captcha/sent' // 发送验证码
export const verify = api + '//captcha/verify' // 验证验证码
export const loginStatus = api + '/login/status' // 登录状态
export const logout = api + '/logout' // 退出登录
export const signIn = api + '/daily_signin' // 签到
// ===================我的页面相关
export const userRecord = api + '/user/record' // 用户播放记录
export const userInfo = api + '/user/subcount' // 用户信息
export const userDetail = api + '/user/detail' // 用户详情
export const userEvent = api + '/user/event' // 用户动态
export const playlist = api + '/user/playlist' // 用户歌单
export const userDj = api + '/user/dj' // 用户电台 申请做主播那一行
export const favoriteAlbums = api + '/album/sublist' // 获取收藏的专辑
export const favoriteArtists = api + '/artist/sublist' // 获取收藏的歌手
export const favoriteVideos = api + '/mv/sublist' // 获取收藏的视频
export const djSublist = api + '/dj/sublist' // 获取订阅的电台
// =================视频页面下相关
export const getVideoTag = api + '/video/group/list' // 获取视频标签导航
export const getVideoGroup = api + '/video/group' // 获取对应标签的视频详情
// ==================搜索页面相关
export const search = api + '/search' // 搜索关键词
export const defaultSearch = api + '/search/default' // 默认搜索关键词
export const suggestSearch = api + '/search/suggest' // 搜索建议
export const hotSearchList = api + '/search/hot/detail' // 热搜列表
export const singerClass = api + '/artist/list' // 歌手分类
// =================朋友页面
export const friend = api + '/event' // 获取朋友页面的动态
// =================歌单事件
export const addOrDeletePlaylist = api + '/playlist/subscribe' // 收藏/取消收藏歌单
export const addPlaylist = api + '/playlist/create' // 添加歌单
export const deletePlaylist = api + '/playlist/delete' // 删除歌单
// ================发现页面的电台页面
export const djBanner = api + '/dj/banner' // 电台页面的轮播图
export const radioRecommendations = api + '/dj/today/perfered' // 电台推荐数据
export const boutiqueRecommendations = api + '/dj/paygift' // 电台精品推荐
export const djClassification = api + '/dj/catelist' // 电台分类
export const djClassificationInfo = api + '/dj/recommend/type' // 电台分类推荐
export const djProgram = api + '/dj/program' // 电台节目
export const djDetail = api + '/dj/detail' // 电台详情
export const djPayGift = api + '/dj/paygift' // 电台付费精选
export const djSub = api + '/dj/sub' // 订阅/取消订阅电台
export const djToplist = api + '/dj/program/toplist' // 获取最热节目
export const djHotToplist = api + '/dj/toplist' // 获取电台榜
// ================评论页面相关
export const commentPlaylist = api + '/comment/playlist' // 获取歌单的评论
export const commentAlbum = api + '/comment/album' // 获取专辑的评论
export const commentLike = api + '/comment/like' // 给评论点赞
export const pushOrDeleteCom = api + '/comment' // 发送删除评论
