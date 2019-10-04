<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 14:47:32
 * @Update: 2019-10-04 13:05:28
 * @Update log: 更新日志
 -->
<template>
  <div>
    <sublist-card :djSublist="albumsInfo" :count="albumsNum" type="albums" title="收藏的专辑"></sublist-card>
  </div>
</template>

<script>
import sublistCard from 'base/djSublistCard'
export default {
  name: '',
  props: {
    albumsInfo: {
      type: Array
    },
    albumsNum: {
      type: Number
    }
  },
  components: {
    sublistCard
  }
}
</script>

<style lang='less' scoped>
</style>
