<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-11 13:11:46
 * @Update: 2019-10-13 12:07:08
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="title">
      <h1 class="text">电台推荐</h1>
    </div>
    <div class="img-col">
      <img-card
        v-for="(item, index) in radioRecomList"
        :key="index"
        type="dj"
        :name="item.name"
        :imgUrl="item.picUrl"
        :dec="item.rcmdText"
        :ridId="item.id"
      ></img-card>
    </div>
  </div>
</template>

<script>
import api from 'api'
import imgCard from 'base/imgCard'

export default {
  name: '',
  data () {
    return {
      radioRecomList: []
    }
  },
  created () {
    this._getRadioRecom()
  },
  methods: {
    _getRadioRecom () {
      api.radioRecomFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.radioRecomList = data.data
          }
        })
    }
  },
  components: {
    imgCard
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  margin-top: 0.5rem;
  .title {
    .flex-between();
    align-items: center;
    .text {
      font-weight: 700;
    }
  }
  .img-col {
    .flex-between();
    flex-wrap: wrap;
  }
}
</style>
