<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-06 12:57:04
 * @Update: 2019-10-06 14:11:44
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">新碟上架</span>
    </general-nav>
    <div class="nowWeekNewDish">
      <h1 class="title">本周新碟</h1>
      <div class="img-card-wrapper">
        <img-card
          v-for="(item, index) in nowWeekNewDish"
          :key="index"
          width="2.4rem"
          :imgUrl="item.picUrl"
          :dec="item.name"
          :albumId="item.id"
          :artists="item.artists"
          lines="one"
        ></img-card>
      </div>
    </div>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import imgCard from 'base/imgCard'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      // 本周新碟
      nowWeekNewDish: [],
      // 当前月的合集
      nowMonth: [],
      // 上一个月的合集
      prevMonth: [],
      offset: 0
    }
  },
  created () {
    this._getAllInfo(this.offset)
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    },
    _getAllInfo (offset) {
      console.log(offset)
      api.newDishFn(30, offset)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.nowWeekNewDish = data.albums
          }
        })
    }
  },
  components: {
    generalNav,
    imgCard
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
  .nowWeekNewDish {
    margin-top: 0.2rem;
    .title {
      font-size: 0.3rem;
      font-weight: 700;
    }
    .img-card-wrapper {
      flex-wrap: wrap;
      .flex-around();
    }
  }
}
</style>
