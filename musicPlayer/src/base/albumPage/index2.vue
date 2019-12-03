<!--
 * @Author: Lambda
 * @Begin: 2019-10-13 12:03:28
 * @Update: 2019-11-30 13:55:02
 * @Update log: 更新日志
 -->
<template>
  <detail-page :name="name" :coverImgUrl="coverImgUrl" :title="title">
    <div slot="data">
      <div class="info-top">
        <div class="img-info">
          <img v-lazy="imgUrl + '?param=200y200'" :key="imgUrl" alt />
          <span class="play-count">
            <i class="date-song bofang"></i>
            {{playCount | setPlay}}
          </span>
        </div>
        <div class="info-con">
          <p class="album-title">{{iAlbumTitle}}</p>
          <div class="creator">
            <div class="img-info">
              <img v-lazy="creatorImgUrl + '?param=200y200'" :key="imgUrl" alt />
            </div>
            <span>
              {{author}}
              <i class="date-song iconfontjiantou5"></i>
            </span>
          </div>
          <div class="desc-wrapper">
            <span class="desc">{{description}}</span>
            <i class="date-song iconfontjiantou5"></i>
          </div>
        </div>
      </div>
      <div class="icons">
        <div class="comments" @click="goComments">
          <i class="date-song pinglun"></i>
          <span>{{commentCount | setCom}}</span>
        </div>
        <div class="comments">
          <i class="date-song fenxiang"></i>
          <span>{{shareCount | setShare}}</span>
        </div>
        <div class="comments">
          <i class="date-song xiazai"></i>
          <span>下载</span>
        </div>
        <div class="comments">
          <i class="date-song duoxuankuang"></i>
          <span>多选</span>
        </div>
      </div>
    </div>
    <div slot="nav-list" class="title pd23">
      <span>
        <span @click="beginAudio">
          <i class="date-song cbofang"></i>
          播放全部
        </span>
        <!-- 当歌单组件时，需要显示当前歌单总共有多少首歌曲的信息 -->
        <span class="count" v-if="isAlbum">(共{{trackCount}}首)</span>
      </span>
      <div class="collection" :class="{ 'bg': !isSubInItem }" ref="collection" v-if="isAlbum">
        <span v-show="!isSubInItem" @click="addPlaylist">+ 收藏({{subscribedCountItem | setCol}})</span>
        <span v-show="isSubInItem" @click="deletePlaylist">
          <i class="date-song wenjianjia"></i>
          {{subscribedCountItem | setCol}}
        </span>
      </div>
    </div>
    <div slot="bottom">
      <song-list
        v-for="(item, index) in albumInfo.tracks || albumInfo.songs"
        :key="index"
        :songName="item.name"
        :artists="item.ar"
        :albumName="item.al.name"
        :num="index + 1"
        @beginSong="setAudioList(item, index)"
        :nowSong="item.id === audioSong.id"
      ></song-list>
    </div>
    <slider
      slot="slider"
      ref="slider"
      :title="title"
      :author="name"
      :imgUrl="coverImgUrl"
      :id="itemId"
      :djDetailList="djDetail"
    ></slider>
  </detail-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { filterSetPlayCount } from 'utils/filters'
import detailPage from '@/components/detailPage'
import songList from 'base/song'
import pageLoading from 'base/pageLoading'
import slider from 'base/slider'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      // 存储信息的数组
      albumInfo: [],
      // 用来定义是否显示load加载组件
      load: true,
      albumId: 0,
      dishId: 0,
      idxId: 0,
      idxComId: 0,
      iTitle: '歌单',
      name: '',
      isSubInItem: false,
      loading: true,
      title: '歌单',
      subed: false,
      ridId: 0,
      itemId: 0,
      imgUrl: '',
      albumTitle: '',
      creatorImgUrl: '',
      author: '',
      description: '',
      commentCount: 0,
      shareCount: 0,
      trackCount: 0,
      subscribedCount: 0,
      subscribe: '',
      isSubIn: false,
      playCount: 0
    }
  },
  filters: {
    setCom: (val) => {
      if (!val) {
        return '评论'
      }
      return filterSetPlayCount(val)
    },
    setShare: (val) => {
      if (!val) {
        return '分享'
      }
      return filterSetPlayCount(val)
    },
    setCol: (val) => {
      if (!val) {
        return ''
      }
      return filterSetPlayCount(val)
    },
    setPlay: (val) => {
      if (!val) {
        return ''
      }
      return filterSetPlayCount(val)
    }
  },
  computed: {
    /**
     * 返回日
     */
    day: function () {
      const day = new Date().getDate() < 10
        ? '0' + new Date().getDate()
        : new Date().getDate()
      return day
    },
    /**
     * 返回月份
     */
    month: function () {
      const month = new Date().getMonth() + 1 < 10
        ? '0' + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
      return month
    },
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  activated () {
    this.loading = true
    this.albumInfo = []
    let albumId = this.$route.params.albumId
    let idxId = this.$route.params.idxId
    let dishId = this.$route.params.dishId
    if (albumId) {
      this.title = '歌单'
      this.albumId = +albumId
      this._getInfo(albumId)
      return
    }
    if (idxId || idxId === 0) {
      this.title = ''
      this.idxId = +idxId
      this._getIdxInfo(idxId)
      return
    }
    if (dishId) {
      this.title = '专辑'
      this.dishId = +dishId
      this._getDishInfo(dishId)
      return
    }
    /**
     * 判断当在歌单页面刷新时无法获取到歌单内容
     * 获取到的id值为undefined
     */
    if (!idxId || !albumId || !dishId) {
      this.$router.go(-1)
    }
  },
  methods: {
    /**
     * 收藏歌单
     */
    addPlaylist () {
      const id = this.albumId || this.dishId || this.idxId
      api.addOrDeletePlaylistFn(1, id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.isSubInItem = true
            ++this.subscribedCountItem
          }
        })
    },
    /**
     * 取消收藏歌单
     */
    deletePlaylist () {
      const id = this.albumId || this.dishId || this.idxId
      api.addOrDeletePlaylistFn(2, id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.isSubInItem = false
            --this.subscribedCountItem
          }
        })
    },
    /**
     * 去评论页面
     * 通过传不同的params的属性来判断资源是歌单还是专辑
     */
    goComments () {
      const playlistId = this.albumId ? this.albumId : this.idxComId
      const albumId = this.dishId
      const imgUrl = this.imgUrl
      const title = this.albumTitle
      const author = this.author
      this.$router.push({ name: 'comments', params: { playlistId, albumId, imgUrl, title, author } })
    },
    update_iTitle (con) {
      this.iTitle = con
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
      console.log(this.$refs)
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
    ...mapActions(['selectPlay'])
  },
  components: {
    detailPage,
    songList,
    pageLoading,
    slider
  }
}
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1394963_t6jt71rtm9.css");
@import url("~styles/global.less");
@textColor: #ccc;

.title {
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  .flex-between();
  background-color: #fff;
  .count {
    color: #999;
    font-size: small;
  }
  .collection {
    .pd23();
    font-size: smaller;
    margin-top: 3px;
    height: 0.7rem;
    line-height: 0.7rem;
    border-radius: 0.4rem;
    color: #999;
    &.bg {
      background-color: @bgcolor;
      color: #fff;
    }
  }
}
.info-top {
  height: 3rem;
  .flex-between();
  overflow: hidden;
  .img-info {
    @size: 2.6rem;
    width: @size;
    height: 0;
    position: relative;
    padding-bottom: @size;
    border-radius: @imgBorderRadius;
    overflow: hidden;
    img {
      width: @size;
      height: @size;
    }
    .play-count {
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      .bofang {
        font-size: 0.24rem;
      }
    }
  }
  .info-con {
    width: 3.6rem;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .album-title {
      font-size: 0.36rem;
      line-height: 1.5;
      .twoLinesEllipsis();
    }
    .creator {
      height: 1rem;
      color: @textColor;
      display: flex;
      align-items: center;
      .img-info {
        @size: 0.6rem;
        width: @size;
        height: 0;
        padding-bottom: @size;
        margin-right: 8px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: @size;
          height: @size;
        }
      }
    }
    .desc-wrapper {
      display: flex;
      align-items: center;
      color: @textColor;
      .desc {
        width: 3rem;
        .twoLinesEllipsis();
      }
    }
  }
}
.icons {
  margin-top: 8px;
  .flex-around();
  width: 100%;
  .comments {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .date-song {
      font-size: 0.4rem;
      margin-bottom: 5px;
    }
  }
}
.list-info {
  width: 100%;
  box-sizing: border-box;
  padding: 0.1rem 0.23rem;
  background-color: #fff;
  transform: translate3d(0, -0.5rem, 0);
}
</style>
