<!--
 * @Author: Lambda
 * @Begin: 2019-10-25 13:32:06
 * @Update: 2019-11-23 11:49:54
 * @Update log: 更新日志
 -->
<template>
  <div @scroll="hideVideo">
    <page-loading v-show="load"></page-loading>
    <public-img-card :data="data" @index="getIndex" v-show="!load" ref="public"></public-img-card>
    <should-login v-show="isLogin === 0"></should-login>
  </div>
</template>

<script>
import { videoPage } from 'mixins/Mixins'
import publicImgCard from '../public'
import pageLoading from 'base/pageLoading'
import shouldLogin from 'base/shouldLogin'
export default {
  mixins: [videoPage],
  name: '',
  components: {
    publicImgCard,
    pageLoading,
    shouldLogin
  }
}
</script>

<style lang='less' scoped>
</style>
