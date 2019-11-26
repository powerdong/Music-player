<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:57:52
 * @Update: 2019-11-26 13:01:35
 * @Update log: 更新日志
 -->
<template>
  <div>
    <list-global
      title="歌手"
      :more="artist.more"
      :moreText="artist.moreText"
      linkPage="artist"
      :keyW="keyword"
    >
      <list-con
        v-for="(item, index) in artist"
        :key="index"
        :circle="true"
        :ImgUrl="item.img1v1Url"
        @click.native="toArtistDetail"
        :alia="item.alias.length > 0 ? item.alias[0] : ''"
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
      type: Array
    },
    keyword: {
      type: String
    }
  },
  methods: {
    toArtistDetail () {
      this.$router.push('/artistDetailPage')
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
