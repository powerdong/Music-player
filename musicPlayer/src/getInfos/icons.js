/*
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-06 12:08:42
 * @Update log: 更新日志
 */
let homeIcons = [{
  text: '私藏推荐',
  icon: 'home iconxindian'
}, {
  text: '私人FM',
  icon: 'home iconshouyinji'
}, {
  text: 'Sati空间',
  icon: 'home iconyueliang'
}, {
  text: '最新电音',
  icon: 'home iconduodian'
}, {
  text: '因乐交友',
  icon: 'home iconjiaoyou'
}, {
  text: '亲子频道',
  icon: 'home iconertong'
}, {
  text: '古典专区',
  icon: 'home icongangqin'
}, {
  text: '跑步FM',
  icon: 'home iconorder-received'
}, {
  text: '小冰电台',
  icon: 'home iconbingjiling'
}, {
  text: '爵士电台',
  icon: 'home iconyandou'
}, {
  text: '驾驶模式',
  icon: 'home iconqiche'
}, {
  text: '编辑',
  icon: 'home icontoggle'
}]

let findIcons = [{
  text: '每日推荐',
  icon: 'find rili',
  linkTo: '/dateRecommend'
}, {
  text: '歌单',
  icon: 'find gedan',
  linkTo: '/recommend'
}, {
  text: '排行榜',
  icon: 'find paixingbang',
  linkTo: '/idx'
}, {
  text: '电台',
  icon: 'find diantai',
  linkTo: '/dj'
}, {
  text: '私人FM',
  icon: 'find shouyin',
  linkTo: '/personalFm'
}]

let homeList = [{
  icon: 'iconyinyue',
  text: '本地音乐',
  num: 0
}, {
  icon: 'iconzuijinbofang',
  text: '最近播放',
  num: 0
}, {
  icon: 'iconxiazai',
  text: '下载管理',
  num: 0
}, {
  icon: 'icondiantai',
  text: '我的电台',
  num: 0
}, {
  icon: 'iconicon-31',
  text: '我的收藏',
  num: 0
}]

let loginIcons = [{
  icon: 'login iconwodexiaoxi',
  text: '我的消息'
}, {
  icon: 'login iconyonghu',
  text: '我的好友'
}, {
  icon: 'login iconpifu',
  text: '个性皮肤'
}, {
  icon: 'login icontinggeshiqu40x40',
  text: '听歌识曲'
}]

let loginIconsTop = [{
  icon: 'iconhuopiaotongxing',
  text: '演出'
}, {
  icon: 'icongouwuche',
  text: '商城'
}, {
  icon: 'icondibiao',
  text: '附近的人'
}, {
  icon: 'iconicon--',
  text: '口袋铃声'
}, {
  icon: 'icondingdan',
  text: '我的订单'
}]

let loginIconsBottom = [{
  icon: 'iconicon--2',
  text: '定时停止播放'
}, {
  icon: 'iconsaoyisao',
  text: '扫一扫'
}, {
  icon: 'iconicon--1',
  text: '音乐闹钟'
}, {
  icon: 'iconhezi501',
  text: '在线听歌免流量'
}, {
  icon: 'iconyouxi',
  text: '游戏推荐'
}, {
  icon: 'iconCoupon',
  text: '优惠券'
}, {
  icon: 'iconmaikefeng',
  text: '我要直播'
}]

export default {
  homeIcons,
  findIcons,
  homeList,
  loginIcons,
  loginIconsTop,
  loginIconsBottom
}
