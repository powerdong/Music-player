<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-08 13:17:01
 * @Update: 2019-11-03 14:15:34
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div v-show="!load">
      <!-- 这里缺少歌单页面的轮播图 -->
      <div class="img-col">
        <img-card
          v-for="(item, index) in swiper"
          :key="index"
          :playCount="item.playCount"
          :imgUrl="item.coverImgUrl"
          :dec="item.name"
          :albumId="item.id"
        ></img-card>
        <img-card
          v-for="(item, index) in list"
          :key="index"
          :playCount="item.playCount"
          :imgUrl="item.coverImgUrl"
          :dec="item.name"
          :albumId="item.id"
        ></img-card>
      </div>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import api from 'api'
import imgCard from 'base/imgCard'
import pageLoading from 'base/pageLoading'

export default {
  name: '',
  data () {
    return {
      swiper: [],
      list: [],
      load: true
    }
  },
  created () {
    this._getListInfo()
  },
  methods: {
    change (start, end) {
      console.log(start, end)
    },
    _getListInfo () {
      api.recSongListFn(33)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            if (this.swiper.length === 0) {
              this.swiper = data.playlists.splice(0, 3)
            }
            this.list = data.playlists
            this.load = false
          }
        })
    }
  },
  components: {
    imgCard,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.swiper {
  margin: 0.3rem 0;
}
.img-col {
  .flex-between();
  flex-wrap: wrap;
}
el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
