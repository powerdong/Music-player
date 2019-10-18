<!--
 * @Author: Lambda
 * @Begin: 2019-10-17 13:04:59
 * @Update: 2019-10-18 10:36:29
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <public-con v-show="!loading" title="最热节目" :data="djToplist" type="rank"></public-con>
    <page-loading v-show="loading"></page-loading>
  </div>
</template>

<script>
import publicCon from '../public'
import api from 'api'
import pageLoading from 'base/pageLoading'

export default {
  name: '',
  data () {
    return {
      djToplist: [],
      loading: true
    }
  },
  created () {
    this._getDjToplist()
  },
  methods: {
    _getDjToplist () {
      let limit, offset
      api.djToplistFn(limit, offset)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.djToplist = data.toplist
            this.loading = false
          }
        })
    }
  },
  components: {
    publicCon,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
