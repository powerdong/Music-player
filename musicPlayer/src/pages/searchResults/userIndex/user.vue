<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:24:13
 * @Update: 2019-09-05 17:46:09
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper pd23">
   <user v-for="(item, index) in allUserList" :key="index"
            :circle="true"
            :ImgUrl="item.avatarUrl"
            :name="item.nickname"
            :gender="item.gender"
            :nickname="item.signature"
              ></user>
  <info :info="info" :keywords="keywords"></info>
 </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import user from 'base/interchangeable'

export default {
  name: '',
  components: {
    user,
    info
  },
  data () {
    return {
      allUserList: [],
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
    this.getAllUserList(this.keywords)
  },
  methods: {
    getAllUserList (key) {
      api.searchFn(key, undefined, undefined, 1002)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allUserList.length) {
              this.allUserList = [this.allUserList, ...data.result.userprofiles]
            } else {
              this.allUserList = data.result.userprofiles
            }
            if (data.result.userprofileCount === 0) {
              this.info = true
            }
            this.$store.commit('SET_LOAD')
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
