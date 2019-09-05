<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:57:52
 * @Update: 2019-09-03 11:02:12
 * @Update log: 更新日志
 -->
<template>
 <div>
   <list-global title="歌手"
                :more="artist.more"
                :moreText="artist.moreText"
                linkPage="artist"
                :keyW="keyword">
    <list-con v-for="(item, index) in artist.artists" :key="index"
              :circle="true"
              :ImgUrl="item.img1v1Url"
              :name="item.name"
              :isIn="item.accountId"
              ></list-con>
  </list-global>
 </div>
</template>

<script>
import listGlobal from 'base/titleFooter'
import listCon from 'base/interchangeable'

export default {
  name: '',
  props: {
    artist: {
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
