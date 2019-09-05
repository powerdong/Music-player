<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:25:40
 * @Update: 2019-09-05 17:43:14
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper pd23">
   <dj-radio v-for="(item, index) in allDjRadioList" :key="index"
            :dj="true"
            :ImgUrl="item.picUrl"
            :name="item.name"
            :nicknames="item.dj"
              ></dj-radio>
  <info :info="info" :keywords="keywords"></info>
 </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import djRadio from 'base/interchangeable'

export default {
  name: '',
  components: {
    djRadio,
    info
  },
  data () {
    return {
      allDjRadioList: [],
      info: false
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.getAllDjRadioList(this.keywords)
  },
  methods: {
    getAllDjRadioList (key) {
      api.searchFn(key, undefined, undefined, 1009)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allDjRadioList.length) {
              this.allDjRadioList = [this.allDjRadioList, ...data.result.albums]
            } else {
              this.allDjRadioList = data.result.albums
            }
            this.$store.commit('SET_LOAD')
            /**
             * 这里使用Es6 判断一个对象是否为空
             */
            if (Object.keys(data.result).length === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.$store.commit('SET_LOAD')
          this.info = true
          console.log(error)
        })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

.wrapper{
  height: 87vh;
  overflow-y: scroll;
}
</style>
