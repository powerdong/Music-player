<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-08 17:48:59
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">推荐歌单</div>
      <div class="square">歌单广场</div>
    </div>
    <div class="img-col">
      <!-- 因为两个接口的属性名不同，这里使用了或 -->
      <img-card v-for="(item, index) in songList"
                :key="index"
                :imgUrl="item.picUrl || item.coverImgUrl"
                :dec="item.name"
                :playCount="item.playCount || item.playcount"
                :albumId="item.id"></img-card>
      </div>
  </div>
</template>

<script>
import api from 'api'
import imgCard from 'base/imgCard'

import { mapGetters } from 'vuex'
export default {
  name: 'songList',
  components: {
    imgCard
  },
  data () {
    return {
      songList: []
    }
  },
  computed: {
    ...mapGetters({loginState: 'LOGIN_STATE'})
  },
  methods: {
    /**
     * 在用户没有登陆的情况下随机取出6项进行展示
     */
    getSongListInfo () {
      api.recSongListFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.songList = this.getRandomArrayElements(data.playlists, 6)
          }
        })
        .catch(error => console.log(error))
    },
    /**
     * 随机取出数组中的几项
     */
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
    /**
     * 在用户登陆情况下执行这个函数获取每日推荐歌单
     */
    loadGetSongListInfo () {
      api.dateRecSongListFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            const arr = data.recommend
            this.songList = this.getRandomArrayElements(arr, 6)
          }
        })
    }
  },
  activated () {
    let getFlag = localStorage.getItem('loginState')
    if (this.loginState || getFlag) {
      // 用户已经登录
      this.loadGetSongListInfo()
    } else {
      console.log(111)
      this.getSongListInfo()
    }
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
