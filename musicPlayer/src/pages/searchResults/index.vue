<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-30 12:05:38
 * @Update: 2019-09-01 21:36:10
 * @Update log: 更新日志
 * 建立各个组件，将对象传给对应的组件进行渲染
 -->
<template>
 <div>
   <search-input :keyword="key">
   </search-input>
   <nav-list></nav-list>
   <page-loading v-show="load"></page-loading>
   <router-view v-show="!load" :keywords="key"></router-view>
 </div>
</template>

<script>
import searchInput from 'base/searchInput'
import pageLoading from 'base/pageLoading'
import navList from './navIndex'

import { mapGetters } from 'vuex'
export default {
  name: 'searchResults',
  components: {
    pageLoading,
    searchInput,
    navList
  },
  data () {
    return {
      key: ''
    }
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.key = to.params.id
    }
  },
  computed: {
    ...mapGetters({'load': 'LOAD'})
  },
  created () {
    this.setKey()
  },
  methods: {
    setKey () {
      this.key = this.$route.params.id
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.el-button--info{
  background: #fff;
  color: #000
}
.btn{
  width: 100px;
  height: 50px;
}
.button{
    position: relative;
    overflow: hidden;
    user-select: none;
}
.button:after{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
     //设置径向渐变
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}
.button:active:after{
    transform: scale(0, 0);
    opacity: .3;
    //设置初始状态
    transition: 0s;
}
</style>
