<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:47:11
 * @Update: 2019-09-09 17:58:49
 * @Update log: 更新日志
 -->
<template>
<song-list-page title="歌单"
                :load="load"
                :imgUrl="albumInfo.coverImgUrl"
                :albumTitle="albumInfo.name"
                :creatorImgUrl="albumInfo.creator.avatarUrl"
                :author="albumInfo.creator.nickname"
                :description="albumInfo.description"
                :commentCount="albumInfo.commentCount"
                :shareCount="albumInfo.shareCount"
                :trackCount="albumInfo.trackCount"
                :subscribedCount="albumInfo.subscribedCount"
                :subscribed="albumInfo.subscribed">
  <song-list v-for="(item, index) in albumInfo.tracks"
            :key="index"
            :songName="item.name"
            :artists="item.ar"
            :albumName="item.al.name"
            :num="index + 1">
</song-list>
</song-list-page>
</template>

<script>
import songList from 'base/song'
import songListPage from 'base/songListPage'
import api from 'api'

export default {
  name: '',
  data () {
    return {
      albumInfo: [],
      name: 'fafafa',
      load: true
    }
  },
  components: {
    songListPage,
    songList
  },
  created () {
    this.getInfoId()
  },
  activated () {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.load = true
    // console.log(to, from)
    let id = this.$route.params.id
    this.getInfo(id)
    // next()
  },
  methods: {
    getInfoId () {
      const id = this.$route.params.id
      console.log(id)
      this.getInfo(id)
    },
    getInfo (id) {
      api.albumDetailFn(id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            console.log(data)
            this.albumInfo = data.playlist
            this.load = false
          }
        })
    }
  },
  destroyed () {
    this.albumInfo = []
  }
}
</script>

<style lang='less' scoped>

</style>
