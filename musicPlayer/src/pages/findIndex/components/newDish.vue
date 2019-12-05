<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-12-05 15:50:04
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">
        <span :class="{active:type==='dish'}" @click="type='dish'">新碟</span>
        <i style="color:#ddd">|</i>
        <span :class="{active:type==='newSong'}" @click="type='newSong'">新歌</span>
      </div>
      <div class="square">
        <span v-show="type==='dish'" @click.stop="moreNewDish">更多新碟</span>
        <span v-show="type==='newSong'" @click.stop="moreNewSongs">新歌推荐</span>
      </div>
    </div>
    <page-loading style="height:3rem" v-show="load"></page-loading>
    <div v-show="!load">
      <div class="img-col" v-show="type==='dish'">
        <img-card
          v-for="(item, index) in dishList"
          :key="index"
          :imgUrl="item.picUrl"
          :dec="item.name"
          :dishId="item.id"
        ></img-card>
      </div>
      <div class="img-col" v-show="type==='newSong'">
        <img-card
          v-for="(item, index) in newSongsList"
          :key="index"
          :imgUrl="item.album.blurPicUrl"
          :dec="item.name"
          @click.native="beginAudio(item)"
        ></img-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
import imgCard from 'base/imgCard'
import pageLoading from 'base/pageLoading'
import { mapActions } from 'vuex'

export default {
  name: 'newDish',
  components: {
    imgCard,
    pageLoading
  },
  data () {
    return {
      dishList: [],
      newSongsList: [],
      type: 'dish',
      load: true
    }
  },
  async created () {
    await this._getDishListInfo()
    await this._getNewSongsInfo()
  },
  methods: {
    _getDishListInfo () {
      api.newDishFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            const arr = data.albums
            this.dishList = this.getRandomArrayElements(arr, 3)
          }
        })
        .catch(error => {
          if (error) {
            console.log(error, '请求超时')
          }
        })
    },
    beginAudio (list) {
      this.addToAudioList(list)
    },
    _getNewSongsInfo () {
      api.newSongsFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            const arr = data.data
            this.newSongsList = this.getRandomArrayElements(arr, 3)
            this.load = false
          }
        })
        .catch(error => {
          if (error) {
            this.load = false
            console.log(error, '请求超时')
          }
        })
    },
    /**
     * 更多新碟
     */
    moreNewDish () {
      this.$router.push('/moreNewDish')
    },
    /**
     * 新歌推荐
     */
    moreNewSongs () {
      this.$router.push('/moreNewSongs')
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
    },
    ...mapActions(['addToAudioList'])
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

.wrapper {
  .title {
    width: 100%;
    height: 1.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .recommended {
      font-size: 0.24rem;
      .active {
        font-size: 0.3rem;
        font-weight: 700;
      }
    }
    .square {
      .smallTag();
      margin-left: auto;
    }
  }
  .img-col {
    .flex-between();
    flex-wrap: wrap;
  }
}
</style>
