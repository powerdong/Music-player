<!--
 * @Author: Lambda
 * @Begin: 2019-10-25 13:32:24
 * @Update: 2019-10-26 09:59:35
 * @Update log: 更新日志
 -->
<template>
  <div>
    <page-loading v-show="load"></page-loading>
    <public-img-card :data="data" v-show="!load"></public-img-card>
  </div>
</template>

<script>
import { videoPage } from 'mixins/Mixins'
import publicImgCard from '../public'
import pageLoading from 'base/pageLoading'

export default {
  mixins: [videoPage],
  name: '',
  components: {
    publicImgCard,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
</style>
