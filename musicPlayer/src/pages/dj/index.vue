<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:39:29
 * @Update: 2019-10-24 08:41:43
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <dj-nav @returnPage="returnPage" class="titleFixed">
      <span class="text">电台</span>
    </dj-nav>
    <swiper></swiper>
    <icons></icons>
    <radio-recom></radio-recom>
    <boutique-recom></boutique-recom>
    <div v-show="!load">
      <public-con title="创作|翻唱" :data="createData.slice(0,4)"></public-con>
      <public-img-wrap title="有声书" :data="soundBookData.slice(0,3)"></public-img-wrap>
      <public-con title="情感调频" :data="emotionData.slice(0,4)"></public-con>
      <public-img-wrap title="广播剧" :data="broadcastingData.slice(0,3)"></public-img-wrap>
      <public-con title="音乐故事" :data="musicData.slice(0,4)"></public-con>
      <public-img-wrap title="娱乐|影视" :data="entertainmentData.slice(0,3)"></public-img-wrap>
      <public-con title="3D|电子" :data="electronicData.slice(0,4)"></public-con>
      <public-img-wrap title="美文读物" :data="mevinData.slice(0,3)"></public-img-wrap>
      <public-con title="二次元" :data="secondaryData.slice(0,4)"></public-con>
      <public-img-wrap title="脱口秀" :data="talkData.slice(0,3)"></public-img-wrap>
      <public-img-wrap title="知识技能" :data="knowledgeData.slice(0,3)"></public-img-wrap>
      <public-img-wrap title="商业财经" :data="businessData.slice(0,3)"></public-img-wrap>
      <public-img-wrap title="人文历史" :data="historyData.slice(0,3)"></public-img-wrap>
      <public-img-wrap title="外文世界" :data="englishData.slice(0,3)"></public-img-wrap>
      <public-img-wrap title="亲子宝贝" :data="babyData.slice(0,3)"></public-img-wrap>
      <public-img-wrap title="相声曲艺" :data="crosstalkData.slice(0,3)"></public-img-wrap>
      <public-img-wrap title="旅途|城市" :data="journeyData.slice(0,3)"></public-img-wrap>
      <public-class title="热门分类" :data="hotClass"></public-class>
      <public-class title="更多分类" :data="moreClass"></public-class>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import djNav from 'base/generalNav'
import swiper from './components/swiper'
import icons from './components/icons'
import radioRecom from './components/radioRecom'
import boutiqueRecom from './components/boutiqueRecom'
import publicCon from './public'
import publicImgWrap from './publicImgWrap'
import publicClass from './publicClass'
import pageLoading from 'base/pageLoading'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      load: true,
      jsonTarget: [],
      hotClass: [],
      moreClass: [],
      // 创作|翻唱
      createData: [],
      // 有声书
      soundBookData: [],
      // 情感调频
      emotionData: [],
      // 广播剧
      broadcastingData: [],
      // 音乐故事
      musicData: [],
      // 娱乐影视
      entertainmentData: [],
      // 3d电子
      electronicData: [],
      // 美文读物
      mevinData: [],
      // 二次元
      secondaryData: [],
      // 脱口秀
      talkData: [],
      // 知识技能
      knowledgeData: [],
      // 商业经济
      businessData: [],
      // 人文历史
      historyData: [],
      // 外语世界
      englishData: [],
      // 亲子宝贝
      babyData: [],
      // 相声曲艺
      crosstalkData: [],
      // 旅途城市
      journeyData: []
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
            this._getAllClassInfo(this.jsonTarget)
          }
        })
    },
    /**
     * 获取电台各类信息
     */
    _getAllClassInfo (data) {
      let item = []
      const length = data.length
      data.forEach(element => {
        api.djClassificationInfoFn(element.id)
          .then(res => {
            const { data } = res
            if (data.code === 200) {
              const { djRadios } = data
              item.push({
                name: element.name,
                data: djRadios
              })
              if (item.length === length) {
                this.setData(item)
              }
            }
          })
      })
    },
    /**
     * 将data中的数据进行填充
     */
    setData (arr) {
      this.createData = this.ruleData(arr, '创作|翻唱')
      this.soundBookData = this.ruleData(arr, '有声书')
      this.emotionData = this.ruleData(arr, '情感调频')
      this.broadcastingData = this.ruleData(arr, '广播剧')
      this.musicData = this.ruleData(arr, '音乐故事')
      this.entertainmentData = this.ruleData(arr, '娱乐|影视')
      this.electronicData = this.ruleData(arr, '3D|电子')
      this.mevinData = this.ruleData(arr, '美文读物')
      this.secondaryData = this.ruleData(arr, '二次元')
      this.talkData = this.ruleData(arr, '脱口秀')
      this.knowledgeData = this.ruleData(arr, '知识技能')
      this.businessData = this.ruleData(arr, '商业财经')
      this.historyData = this.ruleData(arr, '人文历史')
      this.englishData = this.ruleData(arr, '外语世界')
      this.babyData = this.ruleData(arr, '亲子宝贝')
      this.crosstalkData = this.ruleData(arr, '相声曲艺')
      this.journeyData = this.ruleData(arr, '旅途|城市')
      this.load = false
    },
    /**
     * 定义一个方法，用来筛选数据，将所有数据分类筛选出对应的数据
     */
    ruleData (arr, name) {
      const ruleArr = arr.filter(item => {
        if (item.name === name) {
          return true
        }
      })
      return ruleArr[0].data
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
    publicClass,
    publicImgWrap,
    pageLoading
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
