<template>
  <div @scroll="hideVideo">
    <page-loading v-show="load"></page-loading>
    <public-img-card :data="data" @index="getIndex" v-show="!load" ref="public"></public-img-card>
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
