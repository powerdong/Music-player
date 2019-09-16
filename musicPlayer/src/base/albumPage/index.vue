<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:47:11
 * @Update: 2019-09-16 17:34:12
 * @Update log: 这个是歌单展示的通用组件
 -->
<template>
  <!-- 通过传递参数给子组件，标题，加载样式，图片链接，歌单名称，作者头像，作者昵称，歌单介绍，评论数，分享数，歌单歌曲数，收藏数，是否收藏 -->
  <song-list-page title="歌单"
                  :load="load"
                  :imgUrl="albumInfo.coverImgUrl"
                  :albumTitle="albumInfo.name"
                  :creatorImgUrl="albumInfo.creator ? albumInfo.creator.avatarUrl : ''"
                  :author="albumInfo.creator ? albumInfo.creator.nickname : ''"
                  :description="albumInfo.description"
                  :commentCount="albumInfo.commentCount"
                  :shareCount="albumInfo.shareCount"
                  :trackCount="albumInfo.trackCount"
                  :subscribedCount="albumInfo.subscribedCount"
                  :subscribed="albumInfo.subscribed">
    <!-- 这是一个通用的用来展示歌曲列表的组件，通过for循环组件进行渲染  这里使用 index+1 展示了页面的索引值 -->
    <song-list v-for="(item, index) in albumInfo.tracks"
               :key="index"
               :songName="item.name"
               :artists="item.ar"
               :albumName="item.al.name"
               :num="index + 1"
               @beginSong="setAudioList(item, index)"
               :nowSong="item.id === audioSong.id">
    </song-list>
  </song-list-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import songList from 'base/song'
import songListPage from 'base/songListPage'
import api from 'api'

export default {
  name: '',
  data () {
    return {
      // 存储信息的数组
      albumInfo: [],
      // 用来定义是否显示load加载组件
      load: true
    }
  },
  components: {
    songListPage,
    songList
  },
  /**
   * 生命钩子函数在实例创建完成后被立即调用
   */
  created () {
    this.getInfoId()
  },
  activated () {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.load = true
    let id = this.$route.params.id
    this.getInfo(id)
  },
  computed: {
    ...mapGetters({audioSong: 'AUDIO_ING_SONG'})
  },
  methods: {
    /**
     * 获取页面的动态id信息
     */
    getInfoId () {
      const id = this.$route.params.id
      this.getInfo(id)
    },
    /**
     * 根据传入的id获取歌单信息
     *
     * 这里需要增加 catch 方法！！！
     */
    getInfo (id) {
      // 这里使用的是定义的接口信息，详情查看 api 文件夹
      api.albumDetailFn(id)
        // 请求成功后返回数据
        .then(res => {
          // 接受数据
          const data = res.data
          // 查看返回数据的 code 状态，如果是 200 的话进行使用
          if (data.code === 200) {
            // 将请求回来的数据使用，将load 样式关闭
            this.albumInfo = data.playlist
            console.log(this.albumInfo)
            this.load = false
          }
        })
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.albumInfo.tracks,
        index
      })
    },
    ...mapActions(['selectPlay'])
  }
}
</script>

<style lang='less' scoped>
</style>
