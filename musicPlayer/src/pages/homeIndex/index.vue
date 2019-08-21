<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-20 08:40:37
 * @Update log: 更新日志
 -->
<template>
  <div class="container">
    <default-nav></default-nav>
    <home-icons></home-icons>
    <home-list :num="homeListNum"></home-list>
    <div class="split"></div>
    <song-list :index="songListNum"></song-list>
  </div>
</template>

<script>
import defaultNav from '../../pages/nav/index'
import homeIcons from './components/icons'
import homeList from './components/homeList'
import songList from './components/songList'
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
      }
    }
  },
  components: {
    defaultNav,
    homeIcons,
    homeList,
    songList
  },
  methods: {
    /**
     * 获取用户播放记录
     * @param id 用户 uid
     */
    getRecord (id) {
      api
        .userRecordFn(id)
        .then(res => {
          this.homeListNum.recordNum = res.data.allData.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取用户信息
     * 更新我的电台、创建的歌单、收藏的歌单数
     */
    getInfo () {
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
    }
  },
  created () {
    // 获取登陆状态
    api.loginStatusFn()
      .then(res => {
        let userId = res.data.profile.userId
        if (res.data.code === 200) {
          // 成功登陆
          // 修改状态为 1
          this.$store.commit('LOGIN_STATE')
          // 存取用户 uid信息
          this.$store.commit('ACCOUNT_UID', userId)
          // 获取用户信息
          this.getInfo()
          // 获取用户播放记录
          this.getRecord(userId)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');
@import url("//at.alicdn.com/t/font_1322300_au86cqimtlb.css");
</style>
