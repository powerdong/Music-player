<!--
 * @Author: Lambda
 * @Begin: 2019-12-07 13:04:21
 * @Update: 2019-12-07 14:01:20
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <dj-top-con-detail class="titleFixed" @returnPage="returnPage">
      <span class="text">{{title}}</span>
    </dj-top-con-detail>
    <div v-show="!loading">
      <h1 class="update">更新时间: {{updateTime | setTime}}</h1>
      <public-con :data="data" type="rank" :hotRank="hotRank" :content="content" :noImg="noImg"></public-con>
    </div>
    <page-loading v-show="loading"></page-loading>
  </div>
</template>

<script>
import djTopConDetail from 'base/generalNav'
import publicCon from '../public'
import { filterSetMonth } from 'utils/filters'
import pageLoading from 'base/pageLoading'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      data: [],
      hotRank: false,
      title: '',
      updateTime: 0,
      content: '',
      noImg: true,
      loading: true
    }
  },
  filters: {
    setTime: val => (filterSetMonth(val))
  },
  activated () {
    this.pageId = this.$route.params.id
    this.switchFunction(this.pageId)
  },
  methods: {
    switchFunction (id) {
      switch (id) {
        case 'anchorHours':
          this.title = '24小时榜'
          this.content = 'popular'
          this.hotRank = true
          this._getDjToplistHours()
          break
        case 'newcomer':
          this.title = '新人榜'
          this.content = 'popular'
          this.hotRank = true
          this._getDjToplistNewComers()
          break
        case 'pay':
          this.title = '付费精品榜'
          this.hotRank = true
          this.noImg = false
          this._getDjTopListPay()
          break
        case 'programHours':
          this.title = '24小时新人榜'
          this._getDjProgramTopHours()
          break
        default: this.returnPage()
          break
      }
    },
    async _getDjToplistHours () {
      const { data } = await api.djToplistHoursFn()
      if (data.code === 200) {
        this.updateTime = data.data.updateTime
        this.data = data.data.list
        this.loading = false
      }
    },
    async _getDjToplistNewComers () {
      const { data } = await api.djToplistNewComersFn()
      if (data.code === 200) {
        this.updateTime = data.data.updateTime
        this.data = data.data.list
        this.loading = false
      }
    },
    async _getDjProgramTopHours () {
      const { data } = await api.djProgramTopHoursFn()
      if (data.code === 200) {
        this.data = data.data.list
        this.updateTime = data.data.updateTime
        this.loading = false
      }
    },
    async _getDjTopListPay () {
      const { data } = await api.djToplistPaysFn()
      if (data.code === 200) {
        this.data = data.data.list
        this.updateTime = data.data.updateTime
        this.loading = false
      }
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  deactivated () {
    this.pageId = ''
    this.title = ''
    this.data = []
    this.updateTime = 1546300800000
    this.content = ''
    this.hotRank = false
    this.noImg = true
    this.loading = true
  },
  components: {
    djTopConDetail,
    publicCon,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.text {
  font-size: 0.4rem;
  vertical-align: 5px;
}
.update {
  margin: 0.3rem 0;
  font-size: 0.24rem;
  font-weight: 600;
}
</style>
