<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:23:42
 * @Update: 2019-09-05 17:35:11
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper pd23">
   <video-list v-for="(item, index) in allVideoList" :key="index"
          :videoList="true"
          :ImgUrl="item.coverUrl"
          :name="item.title"
          :durationms="item.durationms"
          :nicknames="item.creator"
          :playTime="item.playTime"
    ></video-list>
    <info :info="info" :keywords="keywords"></info>
 </div>
</template>

<script>
import info from 'base/pageErrorInfo'
import videoList from 'base/interchangeable'
import api from 'api'
export default {
  name: '',
  components: {
    info,
    videoList
  },
  data () {
    return {
      allVideoList: [],
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
    this.getAllVideoList(this.keywords)
  },
  methods: {
    getAllVideoList (key) {
      api.searchFn(key, undefined, undefined, 1014)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allVideoList.length) {
              this.allVideoList = [this.allVideoList, ...data.result.videos]
            } else {
              this.allVideoList = data.result.videos
            }
            this.$store.commit('SET_LOAD')
            // 当没有视频信息的时候
            if (data.result.videoCount === 0) {
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
