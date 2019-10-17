<!--
 * @Author: Lambda
 * @Begin: 2019-10-17 13:04:59
 * @Update: 2019-10-17 13:32:21
 * @Update log: 更新日志
 -->
<template>
  <div class="pd23">
    <public-con title="最热节目" :data="djToplist" type="rank"></public-con>
  </div>
</template>

<script>
import publicCon from '../public'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      djToplist: []
    }
  },
  created () {
    this._getDjToplist()
  },
  methods: {
    _getDjToplist () {
      let limit, offset
      api.djToplistFn(limit, offset)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.djToplist = data.toplist
          }
        })
    }
  },
  components: {
    publicCon
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
</style>
