<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:26:07
 * @Update: 2019-09-05 17:37:52
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper pd23">
   <artist v-for="(item, index) in allArtistList" :key="index"
              :circle="true"
              :ImgUrl="item.img1v1Url"
              :name="item.name"
              :isIn="item.accountId"
              ></artist>
  <info :info="info" :keywords="keywords"></info>
 </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import artist from 'base/interchangeable'

export default {
  name: '',
  components: {
    artist,
    info
  },
  data () {
    return {
      allArtistList: [],
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
    this.getAllArtistList(this.keywords)
  },
  methods: {
    getAllArtistList (key) {
      api.searchFn(key, undefined, undefined, 100)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allArtistList.length) {
              this.allArtistList = [this.allArtistList, ...data.result.artists]
            } else {
              this.allArtistList = data.result.artists
            }
            this.$store.commit('SET_LOAD')
            if (data.result.artistCount === 0) {
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
