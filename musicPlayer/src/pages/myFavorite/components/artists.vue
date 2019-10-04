<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 14:47:43
 * @Update: 2019-10-04 13:22:14
 * @Update log: 更新日志
 -->
<template>
  <div>
    <sublist-card :djSublist="artistsInfo" type="artists" :circle="true"></sublist-card>
  </div>
</template>

<script>
import sublistCard from 'base/djSublistCard'

export default {
  name: '',
  props: {
    artistsInfo: {
      type: Array
    }
  },
  components: {
    sublistCard
  }
}
</script>

<style lang='less' scoped>
</style>
