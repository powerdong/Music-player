<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-13 10:32:53
 * @Update: 2019-10-26 08:18:44
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">电台分类</span>
    </general-nav>
    <page-loading v-show="load"></page-loading>
    <div v-show="!load">
      <class-ification title="热门分类" :data="hotClass" type="class"></class-ification>
      <class-ification title="更多分类" :data="moreClass" type="class"></class-ification>
    </div>
  </div>
</template>

<script>
import classIfication from '../publicClass'
import generalNav from 'base/generalNav'
import pageLoading from 'base/pageLoading'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      hotClass: [],
      moreClass: [],
      load: true
    }
  },
  created () {
    this._getDjClass()
  },
  methods: {
    /**
     * 获取电台分类
     */
    _getDjClass () {
      api.djClassificationFn()
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            const categories = data.categories
            this.jsonTarget = this.getJsonData(categories)
            this.hotClass = this.jsonTarget.slice(0, 6)
            this.moreClass = this.jsonTarget.slice(6)
            this.load = false
          }
        })
    },
    /**
     * 获取json数据中的id，name，img信息
     * 返回一个数组
     */
    getJsonData (data) {
      let jsonTarget = []
      data.map((item) => {
        jsonTarget.push({
          id: item.id,
          name: item.name,
          imgUrl: item.pic56x56Url
        })
      })
      return jsonTarget
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    classIfication,
    generalNav,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
}
</style>
