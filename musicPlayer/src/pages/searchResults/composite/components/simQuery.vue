<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:57:31
 * @Update: 2019-09-02 20:32:28
 * @Update log: 更新日志
 -->
<template>
 <list-global title="相关搜索"
              :more="simQuery.more"
              :moreText="simQuery.moreText">
    <ul class="sim-group">
      <li class="sim-list"
          v-for="(item, index) in simQuery.sim_querys"
          :key="index">
          {{item.keyword}}
      </li>
    </ul>
 </list-global>
</template>

<script>
import listGlobal from 'base/titleFooter'

export default {
  name: '',
  props: {
    simQuery: {
      type: Object
    }
  },
  components: {
    listGlobal
  }
}
</script>

<style lang='less' scoped>
.sim-group{
  display: flex;
  flex-wrap: wrap;
  .sim-list{
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
