<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:24:13
 * @Update: 2019-09-08 16:30:42
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <user
        v-for="(item, index) in allUserList"
        :key="index"
        :circle="true"
        :ImgUrl="item.avatarUrl"
        :name="item.nickname"
        :gender="item.gender"
        :nickname="item.signature"
      ></user>
      <info :info="info" :keywords="keywords"></info>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import user from 'base/interchangeable'
import pageLoading from 'base/pageLoading'

export default {
  name: '',
  data () {
    return {
      allUserList: [],
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
    this._getAllUserList(this.keywords)
  },
  methods: {
    _getAllUserList (key) {
      api.searchFn(key, undefined, undefined, 1002)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            this.allUserList = data.result.userprofiles
            if (data.result.userprofileCount === 0) {
              this.info = true
            }
            this.load = false
          }
        })
        .catch(error => {
          this.load = false
          this.info = true
          console.log(error)
        })
    }
  },
  components: {
    user,
    info,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
