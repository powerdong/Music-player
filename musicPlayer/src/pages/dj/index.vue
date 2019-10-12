<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:39:29
 * @Update: 2019-10-12 14:39:50
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <dj-nav @returnPage="returnPage">
      <span class="text">电台</span>
    </dj-nav>
    <swiper></swiper>
    <icons></icons>
    <radio-recom></radio-recom>
    <boutique-recom></boutique-recom>
    <public-class title="热门分类" :data="hotClass"></public-class>
    <public-class title="更多分类" :data="moreClass"></public-class>
  </div>
</template>

<script>
import djNav from 'base/generalNav'
import swiper from './components/swiper'
import icons from './components/icons'
import radioRecom from './components/radioRecom'
import boutiqueRecom from './components/boutiqueRecom'
import publicCon from './public'
import publicClass from './publicClass'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      jsonTarget: [],
      hotClass: [],
      moreClass: []
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
            console.log(this.jsonTarget)
            this.hotClass = this.jsonTarget.splice(0, 6)
            this.moreClass = this.jsonTarget
            // this._getAllClassInfo(this.jsonTarget)
          }
        })
    },
    /**
     * 获取电台各类信息
     */
    _getAllClassInfo (data) {
      let item = []
      data.forEach(element => {
        api.djClassificationInfoFn(element.id)
          .then(res => {
            const { data } = res
            if (data.code === 200) {
              const { djRadios } = data
              item.push(djRadios)
            }
          })
      })
      console.log(item)

      return item
    },
    returnPage () {
      this.$router.go(-1)
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
    }
  },
  components: {
    djNav,
    swiper,
    icons,
    radioRecom,
    boutiqueRecom,
    publicCon,
    publicClass
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1452410_k59z7sgowgp.css");
.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
  }
}
</style>
