<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-27 12:37:42
 * @Update: 2019-09-01 21:49:23
 * @Update log: 这里用到了父组件调用子组件方法
 -->
<template>
  <div>
    <search-inp ref="search" page="search" Right="1rem"></search-inp>
    <history v-show="!loading"></history>
    <!-- 父组件在组件上定义了一个自定义事件childFn，事件名为parentFn用于接受子组件传过来的message值。 -->
    <hot-search v-show="!loading" @returnKey = "setKey" @childFn="parentFn"></hot-search>
    <page-loading v-if="loading"></page-loading>
  </div>
</template>

<script>
import searchInp from 'base/searchInput'
import history from './components/history'
import hotSearch from './components/hotSearch'
import pageLoading from 'base/pageLoading'
export default {
  name: 'search',
  data () {
    return {
      hotSearchKey: '',
      loading: true
    }
  },
  components: {
    searchInp,
    history,
    hotSearch,
    pageLoading
  },
  activated () {
    this.setKey()
  },
  methods: {
    setKey (key) {
      if (key) {
        // 父组件调用子组件方法
        this.$refs.search.searchKey(key)
      }
    },
    parentFn (result) {
      this.loading = result
    }
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1371990_3libmbu82og.css');
</style>
