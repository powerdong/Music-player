<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:24:50
 * @Update: 2019-09-05 17:26:49
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper pd23" @scroll="handleScroll">
   <div v-if="!info">
    <div class="title">
      <span>
        <i class="result bofang"></i>
        播放全部
      </span>
    </div>
    <ul class="song-group">
      <li class="list-item" v-for="(item, index) in allSongList" :key="index">
        <div class="song-info">
          <p class="song-name">{{item.name}}</p>
          <p class="song-art">
            <span>
              <span class="artist" v-for="(item, index) in item.artists" :key="index">
                {{ item.name }}
              </span>
            </span>
            <span class="album-name">
              {{ item.album.name }}
            </span>
          </p>
        </div>
        <div class="icon">
            <i class="result diandiandian"></i>
        </div>
      </li>
    </ul>
    <page-loading v-show="scroll"></page-loading>
  </div>
  <info :info="info" :keywords="keywords"></info>
 </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import pageLoading from 'base/pageLoading'

export default {
  name: '',
  components: {
    pageLoading,
    info
  },
  data () {
    return {
      allSongList: [],
      offset: 0,
      scroll: false,
      info: false
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.getAllSongList(this.keywords)
  },
  methods: {
    getAllSongList (key, offset) {
      api.searchFn(key, undefined, offset, 1)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allSongList.length) {
              this.allSongList = [this.allSongList, ...data.result.songs]
            } else {
              this.allSongList = data.result.songs
            }
            this.$store.commit('SET_LOAD')
            this.scroll = false
            if (data.result.songCount === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.$store.commit('SET_LOAD')
          this.info = true
          console.log(error)
        })
    },
    /**
     * 滚动触底
     */
    handleScroll () {
      // if (this.$el.scrollTop + this.$el.offsetHeight > this.$el.scrollHeight) {
      //   this.scroll = true
      //   const offset = this.offset += 1
      //   this.getAllSongList(this.keywords, offset)
      // }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

.wrapper{
  height: 87vh;
  overflow-y: scroll;
  .title{
    margin: 0.23rem 0 ;
    font-size: 0.3rem;
  }
  .song-group{
    margin-top: 0.16rem;
    .list-item{
      .flex-between();
      align-items: center;
      height: 1rem;
      .song-info{
        display: flex;
        flex-direction: column;
        .song-name{
          width: 6rem;
          height: 0.4rem;
          line-height: 0.4rem;
          .ellipsis();
        }
        .song-art{
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.23rem;
          color: #dacdcd;
          .artist{
            &::after{
            content: "/";
            }
            &:last-child::after{
              content: "";
            }
          }
          .album-name{
            &::before{
              content: "-"
            }
          }
        }
      }
      .icon{
        color: #ccc;
      }
    }
  }
}
</style>
