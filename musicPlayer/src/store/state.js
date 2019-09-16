/*
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-15 10:30:32
 * @Update log: 更新日志
 */
export default {
  loginPage: false, // 侧边栏显示与否
  icontaiyang: false, // 日间模式
  iconyueliang1: true, // 夜间模式
  modeText: '夜', // 日夜模式文字信息
  loginState: 0, // 登陆状态，初始值为 0 未登录，登陆成功设置为 1
  accountUid: 0, // 存取用户 uid
  load: true, // 定义搜索展示界面 loading 图标的展示与否
  linkPage: 'composite', // 定义搜索展示页的标签导航条应该根据路由信息进行滚动
  playState: false, // 是否正在播放，
  fullScreen: false, // 是否是全屏展示播放页
  audioList: [], // 用来展示播放列表项
  playList: [], // 用来存储各种播放模式的列表
  mode: 0, // 用来记录当前播放模式 0：列表循环，1：单曲循环 2：随机播放
  audioIngIndex: -1, // 正在播放的这一首歌曲索引
  playingShow: true, // 是否显示转盘播放页面
  offsetLyric: 0 // 设置歌词偏移
}
