<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-08 13:17:01
 * @Update: 2019-09-09 14:42:07
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div v-show="!load">
      <el-carousel
        class="swiper"
        @change="change"
        type="card"
        height="4.12rem"
        :autoplay="false"
        indicator-position="none"
      >
        <el-carousel-item v-for="(item, index) in swiper" :key="index">
          <!-- <img-card :playCount="item.playCount"
                    :imgUrl="item.coverImgUrl"
                    :dec="item.name"
                    width="3.35rem"
                    top=""
          :swiper="true"></img-card>-->
        </el-carousel-item>
      </el-carousel>
      <div class="img-col">
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
