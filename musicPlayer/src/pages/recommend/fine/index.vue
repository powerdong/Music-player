<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-08 13:17:12
 * @Update: 2019-09-08 16:10:05
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div v-show="!load">
      <div class="wrapper-top">
        <span class="title">全部</span>
        <span class="filter smallTag">
          <i class="recommend shaixuan"></i> 筛选
        </span>
      </div>
      <div class="img-col">
        <img-card
          v-for="(item, index) in list"
          :key="index"
          :playCount="item.playCount"
          :imgUrl="item.coverImgUrl"
          :albumId="item.id"
          :dec="item.name"
          :fine="true"
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
  components: {
    imgCard,
    pageLoading
  },
  data () {
    return {
      list: [],
      load: true
    }
  },
  created () {
    this._getFineList()
  },
  methods: {
    _getFineList () {
      api.highqualityFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.list = data.playlists
            this.load = false
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper-top {
  .flex-between();
  margin-top: 0.3rem;
  .shaixuan {
    font-size: 0.23rem;
  }
}

.img-col {
  .flex-between();
  flex-wrap: wrap;
}
</style>
