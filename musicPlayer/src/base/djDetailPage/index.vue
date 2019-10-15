<!--
 * @Author: Lambda
 * @Begin: 2019-10-13 12:03:28
 * @Update: 2019-10-15 13:35:35
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper" @scroll="scrollList">
    <dj-detail-nav @returnPage="returnPage" class="fixed pd23" style="color:#fff;">
      <span class="text">{{iTitle}}</span>
    </dj-detail-nav>
    <div
      class="container-top"
      :class="{coverFixed, position}"
      :style="{backgroundImage: 'url(' + coverImgUrl + ')'}"
    >
      <div class="cover" :style="{backgroundColor: `rgba(0, 0, 0, ${cover})`}"></div>
      <div class="data" v-show="!listFixed">
        <div class="name">{{name}}</div>
        <div class="dj-num">{{subscription}}人已订阅</div>
      </div>
    </div>
    <change-nav
      :class="{listFixed}"
      :active="active"
      :count="count"
      @changeToProgram="changeToProgram"
      @changeToDetail="changeToDetail"
    ></change-nav>
    <div class="container-bottom" :style="{ marginTop: top}">
      <div class="song-list" v-show="active==='program'">
        <page-loading v-show="loading"></page-loading>
        <div v-show="!loading">
          <h1 class="sum-num pd23">共{{count}}期</h1>
          <song-list
            class="pd23"
            v-for="(item, index) in djProgramData"
            :key="index"
            :songName="item.name"
            :num="djProgramData.length - index"
            :createTime="item.createTime"
            :listenerCount="item.listenerCount"
            :duration="item.duration"
            :twoLine="true"
            type="djList"
            @beginSong="setAudioList(item, index)"
            :nowSong="item.id === audioSong.id"
          ></song-list>
        </div>
      </div>
      <div class="detail pd23" v-show="active==='detail'">
        <h1 class="anchor">主播</h1>
        <div class="content">
          <div class="img-info">
            <img :src="avatarUrl" alt />
          </div>
          <div class="artist">
            <p class="name">{{detailName}}</p>
            <p class="dec">网易音乐人</p>
          </div>
        </div>
        <h1 class="dj-content">电台内容简介</h1>
        <div class="class">
          <span>分类</span>
          <span class="tag">{{category}}</span>
        </div>
        <p class="text">{{desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import djDetailNav from 'base/generalNav'
import changeNav from './components/changeNav'
import songList from 'base/song'
import pageLoading from 'base/pageLoading'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      djProgramData: [],
      coverImgUrl: '',
      count: 0,
      name: '',
      subscription: 0,
      active: 'program',
      avatarUrl: '',
      detailName: '',
      category: '',
      desc: '',
      loading: true,
      cover: '0.2',
      iTitle: '电台',
      title: '电台',
      listFixed: false,
      item: false,
      position: true,
      top: '0rem'
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  activated () {
    this.loading = true
    this.coverImgUrl = ''
    this.count = 0
    this.name = ''
    this.active = 'program'
    let ridId = this.$route.params.ridId
    if (!ridId) {
      this.$router.go(-1)
    }
    this._getDjProgramInfo(ridId)
    this._getDjDetailInfo(ridId)
  },
  methods: {
    _getDjProgramInfo (id) {
      let limit = 30
      let offset = 0
      let asc = false
      api.djProgramFn(id, limit, offset, asc)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.count = data.count
            this.djProgramData = data.programs
            this.loading = false
          }
        })
    },
    _getDjDetailInfo (id) {
      api.djDetailFn(id)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.name = data.djRadio.name
            this.coverImgUrl = data.djRadio.picUrl + '?param=300y300'
            this.subscription = data.djRadio.subCount
            this.avatarUrl = data.djRadio.dj.avatarUrl + '?param=100y100'
            this.desc = data.djRadio.desc
            this.detailName = data.djRadio.dj.nickname
            this.category = data.djRadio.category
          }
        })
    },
    changeToDetail () {
      this.active = 'detail'
    },
    changeToProgram () {
      this.active = 'program'
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.djProgramData,
        index
      })
    },
    returnPage () {
      this.$router.go(-1)
    },
    /**
     * 定义页面滚动事件，
     * 这里需要添加在滚动过程中样式的变化
     */
    scrollList (e) {
      // 获取到 top 值
      let top = this.$el.scrollTop
      this.cover = top / 1000 + 0.3
      if (this.cover > 0.6) {
        this.cover = 0.6
      }
      if (top >= 148) {
        this.iTitle = this.name
      } else {
        this.iTitle = this.title
      }
      // 当 top 到了 282 的时候会改变标题行的是否固定样式
      if (top >= 282) {
        this.listFixed = true
        this.coverFixed = true
        this.position = false
        this.top = '7.8rem'
      } else {
        this.listFixed = false
        this.coverFixed = false
        this.position = true
        this.top = '0'
      }
    },
    ...mapActions(['selectPlay'])
  },
  components: {
    djDetailNav,
    changeNav,
    songList,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
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
  transform: translateY(-5.4rem);
}
.wrapper {
  height: 100vh;
  position: relative;
  overflow: scroll;
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
  }
  .container-top {
    width: 100%;
    height: 0;
    padding-bottom: 7rem;
    background-size: 100%;
    background-repeat: no-repeat;
    &.position {
      z-index: -1;
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
      .name {
        color: #fff;
        font-size: 0.3rem;
        line-height: 1.5;
      }
      .dj-num {
        color: #eee;
        font-size: 0.2rem;
        line-height: 1.5;
      }
    }
  }
  .container-bottom {
    transform: translate3d(0, -0.8rem, 0);
    .song-list {
      .sum-num {
        height: 0.5rem;
        line-height: 0.5rem;
        font-weight: 700;
      }
    }
    .detail {
      .anchor,
      .dj-content {
        font-weight: 700;
        line-height: 1.5;
        margin: 0.3rem 0;
      }
      .content {
        display: flex;
        align-items: center;
        .img-info {
          width: 1rem;
          height: 0;
          padding-bottom: 1rem;
          margin-right: 0.2rem;
          img {
            border-radius: 50%;
            width: 1rem;
            height: 1rem;
          }
        }
        .artist {
          display: flex;
          flex-direction: column;
          line-height: 1.5;
          .dec {
            font-size: 0.23rem;
            color: #999;
          }
        }
      }
      .class {
        font-size: 0.23rem;
        line-height: 1.5;
        .tag {
          color: @bgcolor;
          box-sizing: border-box;
          padding: 2px;
          border-radius: 4px;
          border: 1px solid @bgcolor;
        }
      }
      .text {
        font-size: 0.23rem;
        color: #999;
        margin-top: 0.13rem;
        line-height: 1.5;
      }
    }
  }
}
</style>
