<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:58:10
 * @Update: 2019-09-03 12:40:06
 * @Update log: 更新日志
 -->
<template>
<list-global title="专辑"
              :more="album.more"
              :moreText="album.moreText"
              linkPage="album"
            :keyW="keyword">
<list-con v-for="(item, index) in album.albums "
          :key="index"
          :album="true"
          :ImgUrl="item.blurPicUrl"
          :name="item.name"
          :artists="item.artists"
          :durationms="item.publishTime"
          ></list-con>
</list-global>
</template>

<script>
import listGlobal from '../titleFooter'
import listCon from '../interchangeable'

export default {
  name: '',
  props: {
    album: {
      type: Object
    },
    keyword: {
      type: String
    }
  },
  components: {
    listGlobal,
    listCon
  }
}
</script>

<style lang='less' scoped>

</style>
