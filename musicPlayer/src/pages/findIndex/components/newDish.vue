<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-09-16 17:38:48
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">新碟</div>
      <div class="square">更多新碟</div>
    </div>
    <div class="img-col">
      <img-card v-for="(item, index) in dishList"
                :key="index"
                :imgUrl="item.picUrl"
                :dec="item.name"
                :albumId="item.id"></img-card>
      </div>
    </div>
</template>

<script>
import api from 'api'
import imgCard from 'base/imgCard'

export default {
  name: 'newDish',
  components: {
    imgCard
  },
  data () {
    return {
      dishList: []
    }
  },
  methods: {
    getDishListInfo () {
      api.newDishFn()
        .then(this.setDishListInfo)
    },
    setDishListInfo (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.albums
        this.dishList = this.getRandomArrayElements(res, 3)
      }
    },
    getRandomArrayElements (arr, count) {
      // eslint-disable-next-line one-var
      let shuffled = arr.slice(0),
        // 克隆一个数组，为了不影响外边的数据
        i = arr.length,
        min = i - count,
        temp,
        index
      // 存下来数组信息  数组的长度
      // 通过改变数组项的位置 输出后边的几位
      while (--i > min) {
        // 随机生成出一个索引
        index = Math.floor((i + 1) * Math.random())
        // 将随机索引项暂存
        // 将数组后边的项与随机项调换
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    }
  },
  mounted () {
    this.getDishListInfo()
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');

.wrapper {
  .title {
    width: 100%;
    height: 1.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .recommended {
      font-size: 0.3rem;
      font-weight: 700;
    }
    .square {
      .smallTag();
      margin-left: auto;
    }
  }
  .img-col{
    .flex-between();
    flex-wrap: wrap;
  }
}
</style>
