<!--
 * @Author: Lambda
 * @Begin: 2019-10-26 10:32:15
 * @Update: 2019-10-26 11:05:27
 * @Update log: 更新日志
 -->
<template>
  <div>朋友动态展示页面</div>
</template>

<script>
import api from 'api'
export default {
  name: '',
  created () {
    this._getFriendInfo()
  },
  methods: {
    _getFriendInfo () {
      api.friendFn()
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            console.log(data)
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
