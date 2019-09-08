<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:26:25
 * @Update: 2019-09-08 16:34:16
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper pd23">
   <div v-show="!load">
    <album v-for="(item, index) in allAlbumList" :key="index"
                :album="true"
                :ImgUrl="item.blurPicUrl"
                :name="item.name"
                :artists="item.artists"
                :durationms="item.publishTime"
                ></album>
    <info :info="info" :keywords="keywords"></info>
  </div>
  <page-loading v-show="load"></page-loading>
 </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import album from 'base/interchangeable'
import pageLoading from 'base/pageLoading'

export default {
  name: '',
  components: {
    album,
    info,
    pageLoading
  },
  data () {
    return {
      allAlbumList: [],
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.getAllAlbumList(this.keywords)
  },
  methods: {
    getAllAlbumList (key) {
      api.searchFn(key, undefined, undefined, 10)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allAlbumList.length) {
              this.allAlbumList = [this.allAlbumList, ...data.result.albums]
            } else {
              this.allAlbumList = data.result.albums
            }
            this.load = false
            if (res.result.albumCount === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.load = false
          this.info = true
          console.log(error)
        })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

</style>
