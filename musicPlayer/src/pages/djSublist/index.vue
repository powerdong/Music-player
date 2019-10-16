<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-01 15:08:21
 * @Update: 2019-10-16 13:29:19
 * @Update log: 更新日志
 -->
<template>
  <div class="dj_sub_list pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">我的电台</span>
    </general-nav>
    <dj-sublist-card :djSublist="djSublist" :count="count" type="dj" title="我订阅的电台"></dj-sublist-card>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import djSublistCard from 'base/djSublistCard'
import api from 'api'

export default {
  name: '',
  data () {
    return {
      djSublist: [],
      count: 0
    }
  },
  activated () {
    this._getDjSublist()
  },
  methods: {
    _getDjSublist () {
      const data = +new Date()
      api.djSublistFn(data)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.djSublist = data.djRadios
            this.count = data.count
          }
        })
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    generalNav,
    djSublistCard
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.dj_sub_list {
  background-color: #fff;
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
}
</style>
