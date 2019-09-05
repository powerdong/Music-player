<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:26:25
 * @Update: 2019-09-05 17:47:08
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper pd23">
   <album v-for="(item, index) in allAlbumList" :key="index"
              :album="true"
              :ImgUrl="item.blurPicUrl"
              :name="item.name"
              :artists="item.artists"
              :durationms="item.publishTime"
              ></album>
  <info :info="info" :keywords="keywords"></info>
 </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import album from 'base/interchangeable'

export default {
  name: '',
  components: {
    album,
    info
  },
  data () {
    return {
      allAlbumList: [],
      info: false
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
            this.$store.commit('SET_LOAD')
            if (res.result.albumCount === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.$store.commit('SET_LOAD')
          this.info = true
          console.log(error)
        })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

.wrapper{
  height: 87vh;
  overflow-y: scroll;
}
</style>
