<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-10 08:19:51
 * @Update: 2019-11-03 13:58:32
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="titleFixed">
      <general-nav class="pd23" @returnPage="returnPage">
        <span class="text">歌手分类</span>
      </general-nav>
      <select-list
        class="pd23"
        :firstList="firstList"
        :secondList="secondList"
        :firstId.sync="firstId"
        :secondId.sync="secondId"
        @update_firstID="updateFirst"
        @update_secondID="updateSecond"
      ></select-list>
    </div>
    <h1 class="title pd23" ref="title">热门歌手</h1>
    <page-loading v-show="loading"></page-loading>
    <artist
      v-show="!loading"
      class="pd23"
      v-for="(item, index) in allArtistList"
      :key="index"
      :circle="true"
      :ImgUrl="item.img1v1Url"
      :name="item.name"
      :isIn="item.accountId"
    ></artist>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import artist from 'base/interchangeable'
import pageLoading from 'base/pageLoading'
import selectList from './select'

import api from 'api'

export default {
  name: '',
  data () {
    return {
      loading: true,
      allArtistList: [],
      firstId: '10',
      secondId: '01',
      firstList: [{
        text: '华语',
        id: '10'
      }, {
        text: '欧美',
        id: '20'
      }, {
        text: '日本',
        id: '60'
      }, {
        text: '韩国',
        id: '70'
      }, {
        text: '其他',
        id: '40'
      }],
      secondList: [{
        text: '男',
        id: '01'
      }, {
        text: '女',
        id: '02'
      }, {
        text: '乐队/组合',
        id: '03'
      }]
    }
  },
  created () {
    this.load = true
    this._getSingerInfo(this.firstId, this.secondId)
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    /**
     * 获取歌手分类信息
     * @param {*} limit  返回数量 , 默认为 30
     * @param {*} offset 偏移数量，用于分页，默认为 0
     * @param {*} initial 按首字母索引查找参数
     */
    _getSingerInfo (firstId, secondId, limit, offset, initial) {
      const cat = firstId + '' + secondId
      api.singerClassFn(cat, limit, offset, initial)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.allArtistList = data.artists
            this.loading = false
          }
        })
    },
    /**
     * 子组件修改父组件的值
     */
    updateFirst (val) {
      this.firstId = val
      this.changeId()
    },
    /**
     * 子组件修改父组件的值
     */
    updateSecond (val) {
      this.secondId = val
      this.changeId()
    },
    /**
     * 当切换了要显示的分类信息时
     * 显示页面loading
     * 进行数据请求
     */
    changeId () {
      this.loading = true
      this._getSingerInfo(this.firstId, this.secondId)
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    selectList,
    generalNav,
    artist,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1396524_tr1owjj5u5.css");
@import url("~styles/global.less");
.wrapper {
  .fixed {
    position: fixed;
    top: 0;
    z-index: 1;
    box-sizing: border-box;
    background-color: #fff;
  }
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
  .title {
    background-color: #ddd;
    line-height: 1.8;
  }
}
</style>
