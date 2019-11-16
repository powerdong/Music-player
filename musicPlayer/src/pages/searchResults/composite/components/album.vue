<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:58:10
 * @Update: 2019-11-16 13:44:29
 * @Update log: 更新日志
 -->
<template>
  <list-global
    title="专辑"
    :more="album.more"
    :moreText="album.moreText"
    linkPage="album"
    :keyW="keyword"
  >
    <list-con
      @click.native="toDishPage(item.id)"
      v-for="(item, index) in album "
      :key="index"
      :album="true"
      line="one"
      :ImgUrl="item.blurPicUrl"
      :alia="item.alias.length > 0 ? item.alias[0] : ''"
      :name="item.name"
      :artists="item.artists"
      maxWidth="4.7rem"
      :durationms="item.publishTime"
    ></list-con>
  </list-global>
</template>

<script>
import listGlobal from 'base/titleFooter'
import listCon from 'base/interchangeable'

export default {
  name: '',
  props: {
    album: {
      type: Array
    },
    keyword: {
      type: String
    }
  },
  methods: {
    toDishPage (id) {
      this.$router.push({ name: 'albumPage', params: { dishId: id } })
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
