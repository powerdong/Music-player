<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:23:42
 * @Update: 2019-09-03 20:59:51
 * @Update log: 更新日志
 -->
<template>
 <div>
   视频页面
 </div>
</template>

<script>
import api from 'api'
export default {
  name: '',
  data () {
    return {
      allVideoList: []
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
          console.log(data)
          // if (data.code === 200) {
          //   if (this.allVideoList.length) {
          //     this.allVideoList = [this.allVideoList, ...data.result.Videos]
          //   } else {
          //     this.allVideoList = data.result.Videos
          //   }
          //   this.$store.commit('SET_LOAD')
          // }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
