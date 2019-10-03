<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-28 10:41:47
 * @Update: 2019-08-28 12:29:24
 * @Update log: 更新日志
 -->
<template>
  <div class="song-hot-search">
    <p class="hot-search-title">热搜榜</p>
    <ul>
      <li
        class="hot-search-list"
        v-for="(item, index) in hotSearchList"
        :key="index"
        @click="returnKey(item.searchWord)"
      >
        <span class="num">{{ index + 1 }}</span>
        <div class="song-info">
          <div class="song-info-title">
            <p class="song-name">{{ item.searchWord }}</p>
            <span class="num">{{ item.score }}</span>
            <img v-if="item.iconUrl" class="search-png" :src="item.iconUrl" />
          </div>
          <!-- 歌曲介绍 -->
          <div class="song-Introduced">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'hotSearch',
  data () {
    return {
      hotSearchList: []
    }
  },
  created () {
    this._getList()
  },
  methods: {
    /**
     * 获取热搜榜单
     */
    _getList () {
      api.hotSearchListFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.hotSearchList = data.data
            this.$emit('childFn', false)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * 通过点击热歌榜将关键字返回给父组件，父组件调用搜索组件的搜索功能
     */
    returnKey (key) {
      this.$emit('returnKey', key)
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.song-hot-search {
  .pd23();
  margin-top: 0.6rem;
  .hot-search-list {
    display: flex;
    margin: 0.2rem 0;
    &:nth-of-type(1) > .num {
      color: @bgcolor;
    }
    &:nth-of-type(2) > .num {
      color: @bgcolor;
    }
    &:nth-of-type(3) > .num {
      color: @bgcolor;
    }
    > .num {
      line-height: 1rem;
      font-size: 0.26rem;
    }
    .song-info {
      margin-left: 20px;
      height: 100%;
      .song-info-title {
        display: flex;
        line-height: 0.6rem;
        .song-name {
          margin-right: 0.1rem;
        }
        .search-png {
          margin-left: 0.2rem;
          // width: 0.3rem;
          height: 0.2rem;
          margin-top: 0.2rem;
        }
      }
    }
    .song-Introduced {
      font-size: 0.23rem;
      color: #aaa;
    }
  }
}
</style>
