<!--
 * @Author: Lambda
 * @Begin: 2019-10-25 13:31:37
 * @Update: 2019-11-07 12:29:55
 * @Update log: 更新日志
 -->
<template>
  <div @scroll="hideVideo">
    <page-loading v-show="load"></page-loading>
    <public-img-card :data="data" v-show="!load" ref="public"></public-img-card>
  </div>
</template>

<script>
import api from 'api'
import publicImgCard from '../public'
import pageLoading from 'base/pageLoading'
export default {
  name: '',
  data () {
    return {
      data: [],
      load: true
    }
  },
  created () {
    this._getVideoDetail(58104)
  },
  methods: {
    _getVideoDetail (id) {
      api.getVideoGroupFn(id)
        .then(res => {
          const {
            data
          } = res
          if (data.code === 200) {
            this.data = data.datas
            this.load = false
          }
        })
    },
    hideVideo () {
      this.$refs.public.stopVideoTag()
    }
  },
  components: {
    publicImgCard,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
</style>
