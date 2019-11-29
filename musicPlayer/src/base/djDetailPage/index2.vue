<!--
 * @Author: Lambda
 * @Begin: 2019-10-13 12:03:28
 * @Update: 2019-11-14 14:03:58
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
      <div class="data" v-show="!listFixed" :style="{opacity}">
        <div>
          <div class="name">{{name}}</div>
          <div class="num">{{subscription}}人已订阅</div>
        </div>
        <div class="subscription" v-show="!subed" @click.prevent="addDj">
          <svg
            t="1571198266501"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1753"
            width="14"
            height="14"
          >
            <path
              d="M737.792 910.6944a57.2416 57.2416 0 0 1-26.7264-6.656l-197.5296-103.8336-197.5296 103.8336a57.2416 57.2416 0 0 1-83.0464-60.3648l37.6832-220.16L110.848 467.968a57.2928 57.2928 0 0 1 31.744-97.6896L363.52 338.2272 462.1824 138.24a56.832 56.832 0 0 1 51.2-31.8976 56.9344 56.9344 0 0 1 51.2 31.8976l98.7648 200.1408 220.8256 32.0512A57.2928 57.2928 0 0 1 916.48 467.968l-159.7952 155.7504 37.7344 220.16a57.3952 57.3952 0 0 1-56.32 67.0208zM159.8464 430.08l155.2896 151.3984a57.2416 57.2416 0 0 1 16.4352 50.688l-36.6592 213.5552 192-100.9152a57.088 57.088 0 0 1 53.2992 0L732.16 845.7216l-36.6592-213.76a57.344 57.344 0 0 1 16.4352-50.688L867.2768 430.08l-214.6304-31.1808a57.2928 57.2928 0 0 1-43.1104-31.3344l-96-194.56-96 194.56a57.2416 57.2416 0 0 1-43.1104 31.3344z m715.6736 1.024zM509.7984 165.2736z"
              fill="#ffffff"
              p-id="1754"
            />
          </svg>订阅
        </div>
        <div class="subscription1" v-show="subed" @click.prevent="deleteDj">
          <svg
            t="1571203188806"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2523"
            width="14"
            height="14"
          >
            <path
              d="M926.037333 224.256c-22.016-22.016-57.685333-22.016-79.701333 0L384.853333 685.738667 179.370667 480.256c-22.016-22.016-57.685333-22.016-79.701334 0-22.016 22.016-22.016 57.685333 0 79.701333l239.786667 239.786667c12.458667 12.458667 29.184 17.749333 45.397333 16.213333 16.213333 1.536 32.938667-3.754667 45.397334-16.213333l495.786666-495.786667c22.016-22.016 22.016-57.685333 0-79.701333z"
              fill="#ffffff"
              p-id="2524"
            />
          </svg>已订阅
        </div>
      </div>
    </div>
    <change-nav
      :class="{listFixed}"
      :active="active"
      :count="count"
      firstNav="详情"
      secondNav="节目"
      @changeToSecond="changeToSecond"
      @changeToFirst="changeToFirst"
    ></change-nav>
    <div class="container-bottom" :style="{ marginTop: top}">
      <div class="song-list" v-show="active==='second'">
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
            :itemId="item.id"
            @showSlider="showSlider"
            type="djList"
            @beginSong="setAudioList(item, index)"
            :nowSong="item.id === audioSong.id"
          ></song-list>
        </div>
      </div>
      <div class="detail pd23" v-show="active==='first'">
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
    <slider
      ref="slider"
      :title="title"
      :author="name"
      :imgUrl="coverImgUrl"
      :id="itemId"
      :djDetailList="djDetail"
    ></slider>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import djDetailNav from 'base/generalNav'
import changeNav from './components/changeNav'
import songList from 'base/song'
import pageLoading from 'base/pageLoading'
import slider from 'base/slider'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      djProgramData: [],
      djDetail: false,
      coverImgUrl: '',
      count: 0,
      name: '',
      subscription: 0,
      active: 'second',
      avatarUrl: '',
      detailName: '',
      category: '',
      desc: '',
      loading: true,
      cover: '0.2',
      iTitle: '电台',
      title: '电台',
      listFixed: false,
      coverFixed: false,
      position: true,
      top: '0rem',
      subed: false,
      ridId: 0,
      itemId: 0,
      opacity: 1
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
    this.active = 'second'
    const params = this.$route.params
    if (!params.ridId) {
      this.$router.go(-1)
      return
    }
    this.ridId = params.ridId
    const ridId = this.ridId
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
            this.subed = data.djRadio.subed
          }
        })
    },
    addDj () {
      api.djSubFn(this.ridId, 1)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.subed = true
            console.log(data)
          }
        })
    },
    showSlider (id) {
      this.title = '电台节目：' + this.name
      this.djDetail = true
      this.itemId = id
      this.$refs.slider.showSlider()
    },
    deleteDj () {
      api.djSubFn(this.ridId, 0)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            console.log(data)
            this.subed = false
          }
        })
    },
    changeToFirst () {
      this.active = 'first'
    },
    changeToSecond () {
      this.active = 'second'
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
      this.opacity = 1 - top / 500
      if (this.cover > 0.6) {
        this.cover = 0.6
        this.opacity = 0.4
      } else {
        this.cover = top / 1000 + 0.3
        this.opacity = 1 - top / 500
      }
      if (top >= 282) {
        this.iTitle = this.name
        this.listFixed = true
        this.coverFixed = true
        this.position = false
        this.top = '6.6rem'
      } else {
        this.iTitle = this.title
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
    pageLoading,
    slider
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
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
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
      .flex-between();
      width: 100%;
      box-sizing: border-box;
      padding-right: 0.8rem;
      .name {
        color: #fff;
        max-width: 4rem;
        .twoLinesEllipsis();
        font-size: 0.3rem;
        line-height: 1.5;
      }
      .num {
        color: #eee;
        line-height: 1.5;
      }
      .subscription {
        box-sizing: border-box;
        position: absolute;
        right: 0.5rem;
        bottom: 0;
        display: flex;
        padding: 0 0.23rem;
        height: 0.5rem;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: @bgcolor;
        border-radius: 0.4rem;
        .icon {
          margin-right: 0.2rem;
        }
      }
      .subscription1 {
        box-sizing: border-box;
        position: absolute;
        right: 0.5rem;
        bottom: 0;
        display: flex;
        padding: 0 0.23rem;
        height: 0.5rem;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 0.4rem;
        border: 1px solid #fff;
        .icon {
          margin-right: 0.2rem;
        }
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
