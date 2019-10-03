<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-29 13:30:03
 * @Update log: 更新日志
 -->
<template>
  <div class="container">
    <home-icons></home-icons>
    <home-list :num="homeListNum"></home-list>
    <div class="split"></div>
    <song-list ref="songList" :index="songListNum" @showSlider="showSlider" @heartMode="_heartMode"></song-list>
    <slider
      ref="slider"
      :title="title"
      :id="id"
      :homeFavoritelistSlider="homeFavoritelistSlider"
      :homePlaylistSlider="homePlaylistSlider"
    ></slider>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import homeIcons from './components/icons'
import homeList from './components/homeList'
import songList from './components/songList'
import slider from 'base/slider'
import api from 'api'

export default {
  name: 'homeIndex',
  data () {
    return {
      // 我的页面上部列表
      homeListNum: {
        // 播放记录
        recordNum: 0,
        // 我的电台
        djNum: 0
      },
      songListNum: {
        // 创建的歌单
        createNum: 0,
        // 收藏的歌单
        favoritesNum: 0
      },
      heartModeList: [],
      title: '',
      id: 0,
      homePlaylistSlider: false,
      homeFavoritelistSlider: false
    }
  },
  components: {
    homeIcons,
    homeList,
    songList,
    slider
  },
  methods: {
    /**
     * 开启心动模式
     */
    _heartMode (id, pid) {
      api.heartModeFn(id, pid)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            let arr = data.data
            this.ruleModeList(arr, 'songInfo')
            console.log(this.heartModeList)
            this.startPlayAll({
              list: this.heartModeList
            })
          }
        })
    },
    /**
     * 对请求到的心动模式数据进行修改，使得可以播放
     */
    ruleModeList (arr, item) {
      arr.forEach(ele => {
        this.heartModeList.push(ele[item])
      })
    },
    /**
     * 显示下方的滑块
     */
    showSlider (name, id, type) {
      this.title = '歌单：' + name
      this.id = id
      if (type) {
        this.homeFavoritelistSlider = true
        this.homePlaylistSlider = false
      } else {
        this.homeFavoritelistSlider = false
        this.homePlaylistSlider = true
      }
      this.$refs.slider.showSlider()
    },
    /**
     * 获取用户播放记录
     * @param id 用户 uid
     */
    getRecord (id) {
      // 当用户刷新页面时 vuex 状态失效，采用本地存储
      let uid = localStorage.getItem('accountUid')
      id = id || uid
      api
        .userRecordFn(id)
        .then(res => {
          this.homeListNum.recordNum = res.data.weekData.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取用户信息
     * 更新我的电台、创建的歌单、收藏的歌单数
     */
    _getInfo () {
      api.userInfoFn().then(res => {
        let data = res.data
        if (data.code === 200) {
          // 更新我的电台数
          this.homeListNum.djNum = data.djRadioCount
          // 更新创建的歌单数
          this.songListNum.createNum = data.createdPlaylistCount
          // 更新收藏的歌单数
          this.songListNum.favoritesNum = data.subPlaylistCount
        }
      })
    },
    ...mapActions(['startPlayAll'])
  },
  computed: {
    ...mapGetters({ loginState: 'LOGIN_STATE' }),
    ...mapGetters({ accountUid: 'ACCOUNT_UID' })
  },
  activated () {
    /**
     *
     * 需要增加判断，要不然每次跳转到这个路由都会有事件
     *
     */
    // 获取用户登录成功后储存的登录标志
    let getFlag = localStorage.getItem('loginState')
    if (this.loginState || getFlag) {
      // 用户已经登录
      // 获取用户信息
      this._getInfo()
      // 获取用户播放记录
      this.getRecord(this.accountUid)
      // this.$refs.songList.getPlaylist()
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1322300_t3s39ptd6ao.css");
</style>
