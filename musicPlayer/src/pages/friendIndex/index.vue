<!--
 * @Author: Lambda
 * @Begin: 2019-10-26 10:32:15
 * @Update: 2019-11-07 13:40:13
 * @Update log: 更新日志
 -->
<template>
  <div>
    <public-info :data="dataInfo"></public-info>
  </div>
</template>

<script>
import publicInfo from './public'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      dataInfo: []
    }
  },
  created () {
    this._getFriendInfo()
  },
  methods: {
    _getFriendInfo () {
      api.friendFn()
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            const arr = data.event
            this.dataInfo = this.getJson(arr)
          }
        })
    },
    getJson (arr) {
      let res = []
      arr.forEach((ele, index) => {
        res.push(JSON.parse(ele.json))
        res[index].userReason = ele.rcmdInfo.userReason
      })
      return res
    }
  },
  components: {
    publicInfo
  }
}
</script>

<style lang='less' scoped>
</style>
