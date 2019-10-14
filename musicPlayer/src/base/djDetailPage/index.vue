<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-13 12:03:28
 * @Update: 2019-10-14 14:41:11
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <dj-detail-nav @returnPage="returnPage" class="fixed pd23" style="color:#fff;">
      <span class="text">电台</span>
    </dj-detail-nav>
    <div class="container-top" :style="{backgroundImage: 'url(' + coverImgUrl + ')'}">
      <div class="cover"></div>
      <div class="data">
        <div class="name">{{name}}</div>
        <div class="dj-num">{{subscription}}人已订阅</div>
      </div>
    </div>
    <div class="container-bottom">
      <change-nav></change-nav>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import djDetailNav from 'base/generalNav'
import changeNav from './components/changeNav'
import songList from 'base/song'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      djProgramData: [],
      coverImgUrl: '',
      count: 0,
      name: '',
      subscription: 0
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  activated () {
    let ridId = this.$route.params.ridId
    console.log(this.$router.params)

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
          }
        })
    },
    _getDjDetailInfo (id) {
      api.djDetailFn(id)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            console.log(data)
            this.name = data.djRadio.name
            this.coverImgUrl = data.djRadio.picUrl + '?param=300y300'
            this.subscription = data.djRadio.subCount
          }
        })
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
    ...mapActions(['selectPlay'])
  },
  components: {
    djDetailNav,
    changeNav,
    songList
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

.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
  }
  .container-top {
    width: 100%;
    height: 0;
    position: relative;
    z-index: -1;
    padding-bottom: 7rem;
    background-size: 100%;
    background-repeat: no-repeat;
    .cover {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
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
    .sum-num {
      height: 0.5rem;
      line-height: 0.5rem;
      font-weight: 700;
    }
  }
}
</style>
