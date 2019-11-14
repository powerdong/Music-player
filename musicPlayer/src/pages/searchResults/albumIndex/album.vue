<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:26:25
 * @Update: 2019-11-02 12:45:02
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <album
        @click.native="toDishPage(item.id)"
        v-for="(item, index) in allAlbumList"
        :key="index"
        :album="true"
        line="one"
        :ImgUrl="item.blurPicUrl"
        :alia="item.alias.length > 0 ? item.alias[0] : ''"
        maxWidth="4.7rem"
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
import { filterSetKeyWords } from 'utils/setKeyWords'

export default {
  name: '',
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
    this.load = true
    this._getAllAlbumList(this.keywords)
  },
  methods: {
    _getAllAlbumList (key) {
      api.searchFn(key, undefined, undefined, 10)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allAlbumList.length) {
              this.allAlbumList = [this.allAlbumList, ...data.result.albums]
            } else {
              this.allAlbumList = data.result.albums
            }
            this.allAlbumList = filterSetKeyWords(this.keywords, this.allAlbumList, 'name')
            this.load = false
            if (data.result.albumCount === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.load = false
          this.info = true
          console.log(error)
        })
    },
    toDishPage (id) {
      this.$router.push({ name: 'albumPage', params: { dishId: id } })
    }
  },
  components: {
    album,
    info,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
