<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-27 12:37:42
 * @Update: 2019-08-28 13:00:15
 * @Update log: 这里用到了父组件调用子组件方法
 -->
<template>
  <div>
    <search-inp ref="search"></search-inp>
    <history></history>
    <hot-search @returnKey = "setKey"></hot-search>
  </div>
</template>

<script>
import searchInp from './components/searchInp'
import history from './components/history'
import hotSearch from './components/hotSearch'
export default {
  name: 'search',
  data () {
    return {
      hotSearchKey: ''
    }
  },
  components: {
    searchInp,
    history,
    hotSearch
  },
  created () {
    this.setKey()
  },
  methods: {
    setKey (key) {
      if (key) {
        // 父组件调用子组件方法
        this.$refs.search.searchKey(key)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1371990_wmbtlal3hm.css');
</style>
