<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:25:40
 * @Update: 2019-11-14 13:57:40
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <dj-radio
        @click.native="goDjDetailPage(item.id)"
        v-for="(item, index) in allDjRadioList"
        :key="index"
        :dj="true"
        maxWidth="4.7rem"
        line="one"
        :ImgUrl="item.picUrl"
        :name="item.name"
        :nicknames="item.dj"
      ></dj-radio>
      <info :info="info" :keywords="keywords"></info>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import djRadio from 'base/interchangeable'
import pageLoading from 'base/pageLoading'
import { filterSetKeyWords } from 'utils/setKeyWords'

export default {
  name: '',
  data () {
    return {
      allDjRadioList: [],
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.load = true
    this._getAllDjRadioList(this.keywords)
  },
  methods: {
    _getAllDjRadioList (key) {
      api.searchFn(key, undefined, undefined, 1009)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allDjRadioList.length) {
              this.allDjRadioList = [this.allDjRadioList, ...data.result.albums]
            } else {
              this.allDjRadioList = data.result.djRadios
            }
            this.allDjRadioList = filterSetKeyWords(this.keywords, this.allDjRadioList, 'name')
            this.load = false
            /**
             * 这里使用Es6 判断一个对象是否为空
             */
            if (Object.keys(data.result).length === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.load = false
          this.info = true
          console.log(error)
        })
    },
    goDjDetailPage (id) {
      this.$router.push({ name: 'djDetailPage', params: { ridId: id } })
    }
  },
  components: {
    djRadio,
    info,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
