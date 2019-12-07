<!--
 * @Author: Lambda
 * @Begin: 2019-10-17 13:04:41
 * @Update: 2019-12-07 13:27:46
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div v-show="!loading">
      <top-con type="circle" title="24小时榜" :data="djTopListHours" pageId="anchorHours"></top-con>
      <div class="split"></div>
      <top-con title="新人榜" type="circle" :data="djTopListNewComers" pageId="newcomer"></top-con>
      <div class="split"></div>
      <public-con
        title="最热主播"
        :data="djToplistPopular"
        type="rank"
        content="popular"
        :hotRank="true"
      ></public-con>
    </div>
    <page-loading v-show="loading"></page-loading>
  </div>
</template>

<script>
import publicCon from '../public'
import topCon from '../titleAndThree'
import api from 'api'
import pageLoading from 'base/pageLoading'
export default {
  name: '',
  data () {
    return {
      djTopListHours: [],
      djTopListNewComers: [],
      djToplistPopular: [],
      loading: true
    }
  },
  async created () {
    await this._getDjToplistHours()
    await this._getDjToplistNewComers()
    await this._getDjToplistPopular()
  },
  methods: {
    async _getDjToplistHours () {
      const { data } = await api.djToplistHoursFn(3)
      if (data.code === 200) {
        this.djTopListHours = data.data.list
      }
    },
    async _getDjToplistNewComers () {
      const { data } = await api.djToplistNewComersFn(3)
      if (data.code === 200) {
        this.djTopListNewComers = data.data.list
      }
    },
    async _getDjToplistPopular () {
      const { data } = await api.djToplistPopularsFn()
      if (data.code === 200) {
        this.djToplistPopular = data.data.list
        this.loading = false
      }
    }
  },
  components: {
    publicCon,
    pageLoading,
    topCon
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
