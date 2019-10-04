<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 14:23:14
 * @Update: 2019-10-04 12:48:02
 * @Update log: 更新日志
 -->
<template>
  <div class="my_favorite pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">我的收藏</span>
    </general-nav>
    <slider-nav :list="list" minWidth="1rem"></slider-nav>
    <router-view
      :albumsInfo="albumsInfo"
      :videosInfo="videosInfo"
      :columnInfo="columnInfo"
      :artistsInfo="artistsInfo"
      :mlogInfo="mlogInfo"
      :albumsNum="albumsNum"
      :videosNum="videosNum"
      :columnNum="columnNum"
      :artistsNum="artistsNum"
      :mlogNum="mlogNum"
    ></router-view>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import sliderNav from 'base/sliderNav'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      albumsNum: 0,
      artistsNum: 0,
      videosNum: 0,
      columnNum: 0,
      mlogNum: 0,
      albumsInfo: [],
      artistsInfo: [],
      videosInfo: [],
      columnInfo: [],
      mlogInfo: []
    }
  },
  computed: {
    list: function () {
      let arr = [{
        path: `/albums`,
        text: `专辑`,
        num: this.albumsNum
      }, {
        path: `/artists`,
        text: `歌手`,
        num: this.artistsNum
      }, {
        path: `/videos`,
        text: `视频`,
        num: this.videosNum
      }, {
        path: `/column`,
        text: `专栏`,
        num: this.columnNum
      }, {
        path: `/mlog`,
        text: `Mlog`,
        num: this.mlogNum
      }]
      return arr
    }
  },
  created () {
    this._getAllInfo()
  },
  methods: {
    _getAllInfo () {
      this._getFavoriteAlbums()
      this._getFavoriteArtists()
      this._getFavoriteVideosFn()
    },
    /**
     * 获取已收藏专辑列表
     */
    _getFavoriteAlbums () {
      api.favoriteAlbumsFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.albumsNum = data.count
            this.albumsInfo = data.data
          }
        })
    },
    /**
     * 获取已收藏的歌手列表
     */
    _getFavoriteArtists () {
      api.favoriteArtistsFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.artistsNum = data.count
            this.artistsInfo = data.data
          }
        })
    },
    /**
     * 获取已收藏的视频
     */
    _getFavoriteVideosFn () {
      api.favoriteVideosFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.videosNum = data.count
            this.videosInfo = data.data
          }
        })
    },
    /**
     * 返回上一页
     */
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    generalNav,
    sliderNav
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.my_favorite {
  background-color: #fff;
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
}
</style>
