<!--
 * @Author: Lambda
 * @Begin: 2019-10-17 13:04:41
 * @Update: 2019-12-03 18:43:17
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <div v-show="!loading">
      <top-con type="circle" title="24小时榜" :data="djTopListHours"></top-con>
      <div class="split"></div>
      <top-con title="新人榜" type="circle" :data="djTopListNewComers"></top-con>
      <div class="split"></div>
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
      loading: true
    }
  },
  async created () {
    await this._getDjToplistHours()
    await this._getDjToplistNewComers()
  },
  methods: {
    async _getDjToplistHours () {
      await api.djToplistHoursFn(3)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.djTopListHours = data.data.list
          }
        })
    },
    async _getDjToplistNewComers () {
      await api.djToplistNewComersFn(3)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.djTopListNewComers = data.data.list
            this.loading = false
          }
        })
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
