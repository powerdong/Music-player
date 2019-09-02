<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:56:55
 * @Update: 2019-09-02 18:11:52
 * @Update log: 更新日志
 -->
<template>
  <list-global title="歌单"
                :more="playList.more"
                :moreText="playList.moreText">
    <list-con  :songList="true"
              v-for="(item, index) in playList.playLists"
              :key="index"
              :ImgUrl="item.coverImgUrl"
              :name="item.name"
              :trackCount="item.trackCount"
              :nickname="item.creator.nickname"
              :playCount="item.playCount"
              ></list-con>
  </list-global>
</template>

<script>
import listCon from '../interchangeable'
import listGlobal from '../titleFooter'
export default {
  name: '',
  components: {
    listCon,
    listGlobal
  },
  props: {
    playList: {
      type: Object
    }
  },
  data () {
    return {
      lists: this.playList.playLists
    }
  }
}
</script>

<style lang='less' scoped>

</style>
