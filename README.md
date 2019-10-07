<h1 align="center">Welcome to Music-player 👋</h1>

## 🚀 如何运行

> node 版本 `[6.4.0]`

### ✨开发过程

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

**欢迎star，欢迎issue**

### 项目进度

## 目标功能

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
- [ ] 新歌推荐
- [x] 更多新碟--**新增**
- [x] 发现页面排行榜
- [ ] 发现页面电台
- [ ] 发现页面私人FM
- [x] 搜索功能
- [x] 搜索结果展示
- [x] 热搜榜
- [x] 历史记录
- [x] 搜索推荐
- [ ] 歌手分类
- [x] 播放功能(**小播放器进度条**)
- [x] 播放列表
- [ ] 添加删除播放列表
- [ ] 歌曲mv播放
- [ ] 签到
- [ ] 歌曲喜欢与否
- [ ] 专辑收藏与否
- [ ] 相关评论
- [ ] 用户相关
- [ ] 用户设置


### 项目演示

[demo地址](http://140.143.128.100:8081)（请用chrome手机模式预览）


## 项目布局
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
+-- getInfos // 获取一些静态信息
+-- pages // 项目路由页面
+-- router // 路由配置
+-- store // vuex 配置使用
```

## 作者

👤 **Lambda**

