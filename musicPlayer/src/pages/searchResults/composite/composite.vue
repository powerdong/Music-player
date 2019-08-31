<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:17:07
 * @Update: 2019-08-31 11:35:35
 * @Update log: 更新日志
 -->
<template>
 <div>
   综合页面
 </div>
</template>

<script>
import api from 'api'

export default {
  name: '',
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  data () {
    return {
      // 这个搜索结果都包含哪些部分
      order: {},
      // 查看同名歌曲
      song: {},
      // 查看全部歌单
      playList: {},
      // 查看全部视频
      video: {},
      // 相关搜索
      sim_query: {},
      // 查看全部歌手
      artist: {},
      // 查看全部专辑
      album: {},
      // 查看全部电台
      djRadio: {},
      // 查看全部用户
      user: {}
    }
  },
  created () {
    this.searchShow(this.keywords)
  },
  methods: {
    /**
     * 通过获取到的 动态的搜索关键字
     * 来获取数据，返回到页面
     */
    searchShow (key) {
      api.searchFn(key)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            console.log(data)
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
