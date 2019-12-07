<!--
 * @Author: Lambda
 * @Begin: 2019-10-17 13:04:59
 * @Update: 2019-12-03 18:38:16
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div v-show="!loading">
      <top-con title="24小时榜" :data="topData" pageId="programHours"></top-con>
      <div class="split"></div>
      <public-con title="最热节目" :data="djToplist" type="rank"></public-con>
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
      djToplist: [],
      loading: true,
      topData: []
    }
  },
  async created () {
    await this._getDjProgramTopHours()
    await this._getDjToplist()
  },
  methods: {
    async _getDjToplist () {
      let limit, offset
      const { data } = await api.djToplistFn(limit, offset)
      if (data.code === 200) {
        this.djToplist = data.toplist
        this.loading = false
      }
    },
    async _getDjProgramTopHours () {
      const { data } = await api.djProgramTopHoursFn(3)
      if (data.code === 200) {
        this.topData = data.data.list
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
