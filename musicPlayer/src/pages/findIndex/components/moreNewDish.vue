<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-06 12:57:04
 * @Update: 2019-10-26 08:21:52
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">新碟上架</span>
    </general-nav>
    <page-loading v-show="load"></page-loading>
    <div v-show="!load">
      <div class="nowWeekNewDish">
        <h1 class="title">本周新碟</h1>
        <div class="img-card-wrapper">
          <img-card
            v-for="(item, index) in nowWeekNewDish"
            :key="index"
            width="2.4rem"
            :imgUrl="item.picUrl"
            :dec="item.name"
            :dishId="item.id"
            :artists="item.artists"
            lines="one"
          ></img-card>
        </div>
      </div>
      <div class="nowWeekNewDish" v-show="nowMonth">
        <h1>
          <span class="month">{{month}}月</span>
          <span class="year">/{{year}}</span>
        </h1>
        <div class="img-card-wrapper">
          <img-card
            v-for="(item, index) in nowMonth"
            :key="index"
            width="2.4rem"
            :imgUrl="item.picUrl"
            :dec="item.name"
            :dishId="item.id"
            :artists="item.artists"
            lines="one"
          ></img-card>
        </div>
      </div>
      <div class="nowWeekNewDish" v-show="lastMonth.length">
        <h1>
          <span class="month">{{prevMonth}}月</span>
          <span class="year">/{{prevYear}}</span>
        </h1>
        <div class="img-card-wrapper">
          <img-card
            v-for="(item, index) in lastMonth"
            :key="index"
            width="2.4rem"
            :imgUrl="item.picUrl"
            :dec="item.name"
            :dishId="item.id"
            :artists="item.artists"
            lines="one"
          ></img-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import imgCard from 'base/imgCard'
import pageLoading from 'base/pageLoading'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      // 本周新碟
      // 将新碟数据的前四个设置为本周新碟
      nowWeekNewDish: [],
      // 当前月的合集
      nowMonth: [],
      // 上一个月的合集
      lastMonth: [],
      offset: 0,
      albums: [],
      load: true
    }
  },
  created () {
    this._getAllInfo(this.offset)
  },
  computed: {
    year: function () {
      return new Date().getFullYear()
    },
    month: function () {
      return new Date().getMonth() + 1
    },
    prevYear: function () {
      if (this.prevMonth === 12) {
        return this.year - 1
      }
      return this.year
    },
    prevMonth: function () {
      let prev = this.month - 1
      if (prev === 0) {
        prev = 12
      }
      return prev
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    },
    _getAllInfo (offset) {
      console.log(offset)
      api.newDishFn(80, offset)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            if (this.albums.length === 0) {
              console.log('===0')
              this.albums = data.albums
              this.nowWeekNewDish = this.albums.splice(0, 4)
            } else {
              this.albums.push(...data.albums)
            }
            // 存下来所有的数据
            // 对数据中的时间进行筛选出当月数据和上一个月的数据
            this.filterTime(this.albums)
            this.load = false
          }
        })
    },
    /**
     * 对数据进行时间上的筛选
     */
    filterTime (arr) {
      const months = {}
      const nowMonth = new Date().getMonth() + 1
      const lastMonth = new Date().getMonth()
      // 将当前月和上一个月初始化为空数组
      months[nowMonth] = []
      months[lastMonth] = []
      // 遍历数据，筛选出当前月和上一个月的数据信息
      arr.forEach(element => {
        if (new Date(element.publishTime).getMonth() + 1 === nowMonth) {
          months[nowMonth].push(element)
        }
        if (new Date(element.publishTime).getMonth() + 1 === lastMonth) {
          months[lastMonth].push(element)
        }
      })
      this.nowMonth = months[nowMonth]
      this.lastMonth = months[lastMonth]
    }
  },
  components: {
    generalNav,
    imgCard,
    pageLoading
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
  .month {
    font-size: 0.26rem;
    font-weight: 700;
  }
  .year {
    font-size: 0.23rem;
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
