<!--
 * @Author: Lambda
 * @Begin: 2019-10-17 13:05:15
 * @Update: 2019-12-07 13:18:14
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div v-show="!loading">
      <top-con title="付费精品榜" :data="djTopListPay" pageId="pay"></top-con>
      <div class="split"></div>
      <public-con title="最热电台" :data="djToplist" type="rank" :hotRank="true"></public-con>
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
      djTopListPay: [],
      loading: true
    }
  },
  async created () {
    await this._getDjTopListPay()
    await this._getDjHotToplist()
  },
  methods: {
    async _getDjHotToplist () {
      let limit, offset, type
      const { data } = await api.djHotToplistFn(limit, offset, type)
      if (data.code === 200) {
        this.djToplist = data.toplist
        this.loading = false
      }
    },
    async _getDjTopListPay () {
      const { data } = await api.djToplistPaysFn(3)
      if (data.code === 200) {
        this.djTopListPay = data.data.list
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
