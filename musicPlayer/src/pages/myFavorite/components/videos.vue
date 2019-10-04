<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 14:48:10
 * @Update: 2019-10-04 13:36:59
 * @Update log: 更新日志
 -->
<template>
  <div>
    <sublist-card :djSublist="videosInfo" :bigImg="true" type="video"></sublist-card>
  </div>
</template>

<script>
import sublistCard from 'base/djSublistCard'

export default {
  name: '',
  props: {
    videosInfo: {
      type: Array
    },
    videosNum: {
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
