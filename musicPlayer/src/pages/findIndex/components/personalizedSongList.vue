<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">推荐歌单</div>
      <div class="square">歌单广场</div>
    </div>
    <ul class="song-group">
      <li class="song-list" v-for="(item, index) in songList" :key="index">
        <div class="list-img">
          <img :src="item.picUrl" alt />
          <span class="play-count">
            <i class="iconfont iconbofang"></i>
            {{playCount[index]}}
          </span>
          <router-link class="cover" :to="'/playlist?id='+item.id"></router-link>
        </div>
        <div class="list-con">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "songList",
  data () {
    return {
      songList: []
    }
  },
  computed: {
    // 将播放数的数字转换为以万为单位
    playCount () {
      const playCount = []
      this.songList.forEach(element => {
        playCount.push(
          element.playCount > 10000
            ? Math.floor(element.playCount / 10000) + "万"
            : element.playCount
        )
      })
      return playCount
    }
  },
  methods: {
    getSongListInfo () {
      axios
        .get("http://140.143.128.100:3000/personalized")
        .then(this.setSongListInfo)
    },
    setSongListInfo (res) {
      if (res.status === 200 && res.statusText === "OK") {
        res = res.data.result
        this.songList = this.getRandomArrayElements(res, 6)
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
    this.getSongListInfo()
  }
}
</script>

<style lang="less" scoped>
@import url("http://at.alicdn.com/t/font_1298894_btl1q00lfth.css");

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
      box-sizing: border-box;
      padding: 0.1rem 0.1rem 0.1rem 0.13rem;
      font-size: 0.2rem;
      border-radius: 1rem;
      letter-spacing: 0.05rem;
      text-align: center;
      border: 1px solid #ccc;
      margin-left: auto;
    }
  }
  .song-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    .song-list {
      flex: 0 0 30%;
      display: flex;
      flex-direction: column;
      .list-img {
        position: relative;
        img {
          border-radius: 0.11rem;
          width: 100%;
        }
        .play-count {
          position: absolute;
          top: 0.11rem;
          right: 0.11rem;
          font-size: 0.2rem;
          color: #fff;
          .iconbofang {
            font-size: 0.18rem;
          }
        }
      }
      .list-con {
        margin: 0.2rem 0 0.3rem;
        font-size: 0.24rem;
        line-height: 0.3rem;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
