<!--
 * @Author: Lambda
 * @Begin: 2019-12-07 13:04:21
 * @Update: 2019-12-08 12:58:10
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <dj-top-con-detail class="titleFixed" @returnPage="returnPage">
      <span class="text">{{title}}</span>
    </dj-top-con-detail>
    <div v-show="!loading">
      <public-con :data="data"></public-con>
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
      title: '',
      loading: true
    }
  },
  filters: {
    setTime: val => (filterSetMonth(val))
  },
  activated () {
    this.pageId = this.$route.params.id
    this.title = this.$route.params.title
    this._getClassRecommend(this.pageId)
  },
  methods: {
    async _getClassRecommend (id) {
      const { data: { code, djRadios } } = await api.djClassificationInfoFn(id)
      if (code === 200) {
        this.data = djRadios
        this.loading = false
      }
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  deactivated () {
    this.pageId = ''
    this.data = []
    this.title = ''
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
