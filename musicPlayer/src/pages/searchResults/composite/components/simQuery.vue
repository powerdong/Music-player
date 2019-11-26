<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:57:31
 * @Update: 2019-11-26 12:50:04
 * @Update log: 更新日志
 -->
<template>
  <list-global title="相关搜索" :more="simQuery.more" :moreText="simQuery.moreText">
    <ul class="sim-group">
      <li
        class="sim-list"
        v-for="(item, index) in simQuery.sim_querys"
        @click="toSearch(item.keyword)"
        :key="index"
      >{{item.keyword}}</li>
    </ul>
  </list-global>
</template>

<script>
import listGlobal from 'base/titleFooter'
import Bus from '../../../../assets/Bus'

export default {
  name: '',
  props: {
    simQuery: {
      type: Object
    }
  },
  methods: {
    toSearch (keywords) {
      Bus.$emit('search', keywords)
    }
  },
  components: {
    listGlobal
  }
}
</script>

<style lang='less' scoped>
.sim-group {
  display: flex;
  flex-wrap: wrap;
  .sim-list {
    height: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.24rem;
    box-sizing: border-box;
    padding: 0.2rem;
    background-color: #ddd;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
  }
}
</style>
