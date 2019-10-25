<!--
 * @Author: Lambda
 * @Begin: 2019-10-25 13:31:37
 * @Update: 2019-10-25 19:50:57
 * @Update log: 更新日志
 -->
<template>
  <div>音乐节</div>
</template>

<script>
import api from 'api'
export default {
  name: '',
  created () {
    this._getVideoDetail(58104)
  },
  methods: {
    _getVideoDetail (id) {
      api.getVideoGroupFn(id)
        .then(res => {
          const {
            data
          } = res
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
