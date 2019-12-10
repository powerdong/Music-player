<!--
 * @Author: Lambda
 * @Begin: 2019-10-28 08:56:16
 * @Update: 2019-12-10 18:55:16
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper" @scroll="scrollList">
    <general-nav @returnPage="returnPage" class="fixed nav-color">
      <span class="text">{{iTitle}}</span>
    </general-nav>
    <div
      :class="{coverFixed, position}"
      :style="{backgroundImage: 'url(' + coverImgUrl + ')'}"
      class="container-top"
    >
      <div class="cover" :style="{backgroundColor: `rgba(0, 0, 0, ${cover})`}"></div>
      <div class="data" v-show="!listFixed" :style="{opacity}">
        <div class="user-img">
          <img v-lazy="avatarUrl + '?param=200y200'" :key="avatarUrl" alt />
        </div>
        <div class="user-info-content">
          <div class="user-info-left">
            <div class="user-nickname">{{nickname}}</div>
            <div class="follow-wrapper">
              <span class="follows">关注 {{newFollows}}</span>
              <span class="item">|</span>
              <span class="followed">粉丝 {{followeds}}</span>
            </div>
            <div class="age-level">
              <span class="age">
                <i class="userInfo" :class="{userInfonv: gender === 2,userInfonan: gender === 1}"></i>
                {{ birthday | setAge }}后
              </span>
              <span class="level">Lv.{{level}}</span>
            </div>
          </div>
          <div class="user-info-right">
            <div class="edit">编辑</div>
            <div class="change-bg">更换背景</div>
          </div>
        </div>
      </div>
    </div>
    <change-nav
      :class="{listFixed}"
      :active="active"
      firstNav="主页"
      secondNav="动态"
      @changeToSecond="changeToSecond"
      @changeToFirst="changeToFirst"
    ></change-nav>
    <div class="container-bottom pd23" :style="{ marginTop: top}">
      <div class="home" v-show="active==='first'">
        <h1 class="title">基本信息</h1>
        <p class="list-info">
          <span class="list-name">个人介绍：</span>
          <span class="list-con">{{signature}}</span>
        </p>
        <p class="list-info">
          <span class="list-name">村龄：</span>
          <span class="list-con">{{age}}年（{{year}}年{{month}}月注册）</span>
        </p>
        <p class="list-info">
          <span class="list-name">年龄：</span>
          <span class="list-con-age">{{ birthday | setAge }}后</span>
          <span class="list-con-astro">{{astro}}座</span>
        </p>
        <p class="list-info">
          <span class="list-name">累计听歌：</span>
          <span class="list-con-con">{{ listenSongs }}首</span>
        </p>
      </div>
      <user-dynamic v-show="active==='second'" :uid="uid"></user-dynamic>
    </div>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import userDynamic from './components/userDynamic'
import { filterAge } from 'utils/filters'
import { getAstro } from 'utils/getAstro'
import api from 'api'
import changeNav from 'base/djDetailPage/components/changeNav'

export default {
  name: '',
  data () {
    return {
      active: 'first',
      iTitle: '',
      cover: '0.2',
      opacity: 1,
      listFixed: false,
      position: true,
      coverFixed: false,
      top: '0rem',
      level: 0,
      gender: 0,
      signature: '',
      age: 0,
      listenSongs: 0,
      year: 0,
      astro: '',
      month: 0,
      newFollows: 0,
      followeds: 0,
      birthday: 0,
      nickname: '',
      avatarUrl: '',
      events: [],
      uid: 0,
      coverImgUrl: 'http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg'
    }
  },
  filters: {
    setAge: function (val) {
      return filterAge(val)
    }
  },
  activated () {
    const { id } = this.$route.params
    this.active = 'first'
    this.uid = id || localStorage.getItem('accountUid')
    this._getUserInfo(this.uid)
  },
  methods: {
    /**
     * 获取用户信息
     */
    _getUserInfo (id) {
      if (!id) {
        // 用户未登录
        return
      }
      api.userDetailFn(id)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            const { nickname, newFollows, followeds, backgroundUrl, birthday, signature, gender, avatarUrl } = data.profile
            this.nickname = nickname
            this.newFollows = newFollows
            this.followeds = followeds
            this.birthday = birthday
            this.gender = gender
            this.signature = signature
            this.level = data.level
            const createTime = data.createTime
            const createDate = new Date(createTime)
            const setAstro = new Date(birthday)
            this.listenSongs = data.listenSongs
            this.year = createDate.getFullYear()
            this.month = createDate.getMonth() + 1
            this.age = parseInt(data.createDays / 365)
            this.avatarUrl = avatarUrl
            this.coverImgUrl = backgroundUrl
            console.log(setAstro.getMonth())
            this.astro = getAstro(setAstro.getMonth() + 1, createDate.getDate())
          }
        })
    },
    /**
     * 定义页面滚动事件，
     * 这里需要添加在滚动过程中样式的变化
     */
    scrollList (e) {
      // 获取到 top 值
      let top = this.$el.scrollTop
      this.cover = top / 1000 + 0.3
      this.opacity = 1 - top / 500
      if (this.cover > 0.6) {
        this.cover = 0.6
        this.opacity = 0.4
      } else {
        this.cover = top / 1000 + 0.3
        this.opacity = 1 - top / 500
      }
      if (top >= 220) {
        this.iTitle = this.nickname
        this.listFixed = true
        this.coverFixed = true
        this.position = false
        this.top = '6.6rem'
      } else {
        this.iTitle = ''
        this.listFixed = false
        this.coverFixed = false
        this.position = true
        this.top = '0'
      }
    },
    returnPage () {
      this.$router.go(-1)
    },
    changeToFirst () {
      this.active = 'first'
    },
    changeToSecond () {
      this.active = 'second'
    }
  },
  deactivated () {
    this.uid = 0
  },
  components: {
    generalNav,
    changeNav,
    userDynamic
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1479172_fftra1vturg.css");
.topFixed {
  position: fixed;
  width: 100%;
  height: 0.8rem;
  z-index: 9;
}
.fixed {
  .topFixed();
  top: 0;
}
.listFixed {
  .topFixed();
  top: 1.6rem;
}
.coverFixed {
  position: fixed;
  width: 100%;
  z-index: 3;
  top: 0;
  transform: translateY(-4.4rem);
}
.nav-color {
  color: #fff;
}
.wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  .text {
    font-size: 0.4rem;
  }
}
.container-top {
  width: 100%;
  height: 0;
  padding-bottom: 6rem;
  background-size: 100%;
  background-repeat: no-repeat;
  &.position {
    position: relative;
  }
  .cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .data {
    position: absolute;
    bottom: 1rem;
    left: 0.3rem;
    width: 100%;
    box-sizing: border-box;
    padding-right: 0.8rem;
    .user-img {
      width: 100%;
      height: 0;
      padding-bottom: 1.5rem;
      margin-bottom: 0.3rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
    }
    .user-info-content {
      color: #fbfbfb;
      .flex-between();
      .user-info-left {
        display: flex;
        flex-direction: column;
        line-height: 1.5;
        .user-nickname {
          font-size: 0.28rem;
        }
        .follow-wrapper {
          color: #999;
          font-size: 0.22rem;
          .item {
            margin: 0 0.1rem;
            color: #777;
          }
        }
        .age-level {
          .age {
            box-sizing: border-box;
            background-color: #37677f;
            padding: 0.05rem 0.1rem;
            border-radius: 0.3rem;
            font-size: 0.22rem;
            margin-right: 0.1rem;
            .userInfonan {
              font-size: 0.22rem;
              color: #6eccff;
              margin-right: 0.03rem;
            }
            .userInfonv {
              font-size: 0.22rem;
              color: #fd79a8;
              margin-right: 0.03rem;
            }
          }
          .level {
            box-sizing: border-box;
            background-color: #7b7c7e;
            padding: 0.05rem 0.1rem;
            border-radius: 0.3rem;
            font-size: 0.22rem;
          }
        }
      }
      .user-info-right {
        display: flex;
        align-items: flex-end;
        .edit,
        .change-bg {
          box-sizing: border-box;
          background-color: #7b7c7e;
          padding: 0.13rem 0.25rem;
          border-radius: 0.3rem;
          font-size: 0.22rem;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
.container-bottom {
  transform: translate3d(0, -0.8rem, 0);
  .home {
    .title {
      font-weight: 700;
      margin: 0.4rem 0;
    }
    .list-info {
      color: #7b7c7e;
      font-size: 0.23rem;
      line-height: 1.5;
    }
  }
}
</style>
