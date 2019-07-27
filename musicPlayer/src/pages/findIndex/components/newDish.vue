<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">新碟</div>
      <div class="square">更多新碟</div>
    </div>
    <ul class="song-group">
      <li class="song-list" v-for="(item, index) in dishList" :key="index">
        <div class="list-img">
          <img :src="item.picUrl" alt />
          <!-- 跳转到专辑详情页 -->
          <router-link class="cover" :to="'/album?id='+item.id"></router-link>
        </div>
        <div class="list-con">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'newDish',
  data () {
    return {
      dishList: []
    }
  },
  computed: {
    // 将播放数的数字转换为以万为单位
    playCount () {
      const playCount = []
      this.dishList.forEach(element => {
        playCount.push(
          element.playCount > 10000
            ? Math.floor(element.playCount / 10000) + '万'
            : element.playCount
        )
      })
      return playCount
    }
  },
  methods: {
    getDishListInfo () {
      axios
        .get('http://140.143.128.100:3000/top/album?offset=0&limit=20')
        .then(this.setDishListInfo)
    },
    setDishListInfo (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        console.log(res)
        res = res.data.albums
        this.dishList = this.getRandomArrayElements(res, 3)
        console.log(this.dishList)
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
  .song-group {
    .flex-between();
    flex-wrap: wrap;
    .song-list {
      flex: 0 0 30%;
      display: flex;
      flex-direction: column;
      .list-img {
        position: relative;
        img {
          border-radius: @imgBorderRadius;
          width: 100%;
        }
      }
      .list-con {
        margin: 0.2rem 0 0.3rem;
        font-size: 0.24rem;
        line-height: 0.3rem;
        letter-spacing: 1px;
        .twoLinesEllipsis();
      }
    }
  }
}
</style>
