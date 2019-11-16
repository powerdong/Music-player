<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:56:55
 * @Update: 2019-11-01 13:31:54
 * @Update log: 更新日志
 -->
<template>
  <list-global
    title="歌单"
    :more="playList.more"
    :moreText="playList.moreText"
    linkPage="playList"
    :keyW="keyword"
  >
    <list-con
      :songList="true"
        @click.native="goAlbumPage(item.id)"
      v-for="(item, index) in playList"
      :key="index"
      :ImgUrl="item.coverImgUrl"
      line="one"
      maxWidth="4.7rem"
      :name="item.name"
      :trackCount="item.trackCount"
      :nickname="item.creator.nickname"
      :playCount="item.playCount"
    ></list-con>
  </list-global>
</template>

<script>
import listCon from 'base/interchangeable'
import listGlobal from 'base/titleFooter'
export default {
  name: '',
  components: {
    listCon,
    listGlobal
  },
  props: {
    playList: {
      type: Array
    },
    keyword: {
      type: String
    }
  },
  data () {
    return {
      lists: this.playList.playLists
    }
  },
  methods: {
    goAlbumPage (id) {
      this.$router.push({ name: 'albumPage', params: { albumId: id } })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
