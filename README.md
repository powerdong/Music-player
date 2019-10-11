<h1 align="center">Welcome to Music-player 👋</h1>

## :speech_balloon:前言

随着不断的学习 Vue，需要做一个小项目通过在实现项目过程中了解到更多的知识。随着如今人们对于音乐的需求，移动端的使用量愈发增加，项目通过 Vue 编写实现，全面借用**网易云音乐移动端**的 UI 设计、功能实现，努力做到以假乱真的效果。前几天便着手开始弄了,到今天为止也算是勉强能用了。

> 本项目自行构思得出，由个人独立编写程序研究。

**注：此项目纯属个人瞎搞，正常使用请选择[网易云音乐官方](https://music.163.com)客户端。**

## :muscle: 项目目标

全面实现移动端网易云音乐的功能

> 项目还在编写完善中

## 🚀 如何运行

> node 版本 `[6.4.0]`

### ✨ 开发过程

```
# 克隆
git clone https://github.com/powerdong/Music-player.git
```

```
# 打开项目目录
cd Music-player

cd musicPlayer
```

```
# 安装依赖
npm install
```

```
# 开启本地服务运行项目
npm run dev
```

**欢迎 star，欢迎 issue**

### :eyes: 项目进度

**上一次更新：** ~~歌手分类~~

**最近一次更新：** 退出账号

## 技术栈

### :point_right: 主要依赖

- Vue 全家桶(使用 Vue-cli 作为构建工具)
- WebPack4.0
- ES6
- Less
- ESLint
- ElementUI
- [网易云音乐 API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

### :clap: 项目演示

[demo 地址](http://140.143.128.100:8081)（请用 chrome 手机模式预览）

## :mega: 目标功能

- [x] 手机登录、注册
- [x] 修改密码
- [x] 我的页面歌单信息
- [x] 添加，删除歌单
- [x] 最近播放
- [x] 心动模式
- [x] 我的电台
- [x] 我的收藏
- [x] 发现页面推荐歌单
- [x] 发现页面新碟
- [x] 发现页面新歌
- [x] 发现页面每日推荐
- [x] 发现页面歌单
- [x] 歌单广场
- [x] 新歌推荐
- [x] 更多新碟
- [x] 发现页面排行榜
- [ ] 发现页面电台
- [x] 退出账号
- [x] 发现页面私人 FM
- [x] 搜索功能
- [x] 搜索结果展示
- [x] 热搜榜
- [x] 历史记录
- [x] 搜索推荐
- [x] 歌手分类
- [x] 播放功能(**小播放器进度条**)
- [x] 播放列表
- [ ] 添加删除播放列表
- [ ] 歌曲 mv 播放
- [ ] 签到
- [ ] 歌曲喜欢与否
- [ ] 专辑收藏与否
- [ ] 相关评论
- [ ] 用户相关
- [ ] 用户设置
- [ ] 页面滚动加载
- [ ] 左右滑动切换
- [ ] 页面切换动画
- [ ] 登陆情况判断
- [ ] 全面优化&修复

## :computer: 部分截图

侧边账户中心

![uDnX80.png](https://user-gold-cdn.xitu.io/2019/10/4/16d95706581a456f?w=472&h=837&f=png&s=45997)

发现页面&每日推荐

![uDuYM8.gif](https://user-gold-cdn.xitu.io/2019/10/4/16d9572548c6aaf3?w=491&h=838&f=gif&s=3519632)

歌单&歌单详情

![uDuGxf.gif](https://user-gold-cdn.xitu.io/2019/10/4/16d9572540c179b1?w=491&h=838&f=gif&s=2610859)

排行榜&排行榜信息

![uDu3Gt.gif](https://user-gold-cdn.xitu.io/2019/10/4/16d95725335944d7?w=491&h=838&f=gif&s=934318)

我的页面&最近播放

![uDu1PI.gif](https://user-gold-cdn.xitu.io/2019/10/4/16d95725267c98e0?w=491&h=838&f=gif&s=290121)

我的歌单&播放歌曲

![uDutsS.gif](https://user-gold-cdn.xitu.io/2019/10/4/16d9572557bd8143?w=491&h=838&f=gif&s=7018012)

搜索展示

![uDu8RP.gif](https://user-gold-cdn.xitu.io/2019/10/4/16d9572538e2c261?w=491&h=838&f=gif&s=1094604)

## :page_with_curl: 项目布局

```js
.src
+-- api
|   +-- config.js // 存取相关的api地址
|   +-- index.js // 请求相关的api方法
+-- assets
|   +-- styles
    |   +-- border.css // 移动端的1px边框
    |   +-- global.less // 全局应用样式
    |   +-- reset.css // 重置样式
    |   +-- resetEleUI.less // 修改elementUI组件样式
|   +-- utils // 全局要使用的方法
    |   +-- getPhone // 获取手机号码
    |   +-- modalScroll // 处理移动端滚动条
|   +-- Bus.js // Bus 总线
|   +-- Mixins.js // 混入(mixin)
+-- base // 存取页面公共的小组件
    +-- albumPage // 歌单展示页面组件
    +-- songListPage // 展示歌曲列表
    +-- alert // 提示消息
    +-- audioAllTitle // 播放全部标题行
    +-- button // 登陆页面按钮
    +-- djSublistCard // 类似于我的电台页面的长卡片组件
    +-- generalNav // 通用页面顶部的标题行
    +-- icon // 图标展示
    +-- idxCard // 官方排行榜
    +-- imgCard // 歌单的图片卡
    +-- interchangeable // 用来展示搜索展示页面除单曲以外的项目
    +-- loading // 转圈loading
    +-- pageErrorInfo // 出错提醒
    +-- pageErrorLoading // 页面加载loading
    +-- searchInput // 搜索框
    +-- slider // 播放列表滑块
    +-- sliderNav // 滑动标题
    +-- song // 歌曲项
    +-- titleFooter // 搜索展示页综合页面各项通用头和尾
+-- getInfos // 获取一些静态信息
    +-- getData // 获取静态信息方法
    +-- icon // 存取图标信息
+-- pages // 项目路由页面
+-- router // 路由配置
    +-- index
+-- store // vuex 配置使用
    +-- action // 根级别的 action
    +-- getter // 根级别的 getter
    +-- index // 组装模块并导出 store 的地方
    +-- mutation-types // 根级别的 mutation-types
    +-- mutation // 根级别的 mutation
    +-- state // 根级别的 state
```

> 本项目会长期更新，欢迎大家指出问题，共同学习

## 作者

👤 **Lambda**
