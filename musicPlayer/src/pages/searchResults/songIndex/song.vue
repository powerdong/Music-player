<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 11:24:50
 * @Update: 2019-09-22 12:12:06
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23" @scroll="handleScroll">
    <div v-show="!load">
      <div v-if="!info">
        <div class="title">
          <span @click="startPlay">
            <i class="result cbofang"></i>
            播放全部
          </span>
        </div>
        <div class="song-group">
          <song-list
            v-for="(item, index) in allSongList"
            :key="index"
            :songName="item.name"
            :artists="item.artists"
            :albumName="item.album.name"
            @beginSong="setAudioList(item)"
            :nowSong="item.id === audioSong.id"
          ></song-list>
        </div>
        <page-loading v-show="scroll"></page-loading>
      </div>
      <info :info="info" :keywords="keywords"></info>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import api from 'api'
import info from 'base/pageErrorInfo'
import pageLoading from 'base/pageLoading'
import songList from 'base/song'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {
      allSongList: [],
      offset: 0,
      scroll: false,
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  created () {
    this._getAllSongList(this.keywords)
  },
  methods: {
    ...mapActions(['addToAudioList', 'startPlayAll']),
    _getAllSongList (key, offset) {
      api.searchFn(key, undefined, offset, 1)
        .then((res) => {
          const data = res.data
          if (data.code === 200) {
            if (this.allSongList.length) {
              this.allSongList = [this.allSongList, ...data.result.songs]
            } else {
              this.allSongList = data.result.songs
            }
            this.load = false
            this.scroll = false
            if (data.result.songCount === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.load = false
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
      //   this._getAllSongList(this.keywords, offset)
      // }
    },
    setAudioList (item) {
      this.addToAudioList(item)
    },
    startPlay () {
      this.startPlayAll({
        list: this.allSongList
      })
    }
  },
  components: {
    pageLoading,
    info,
    songList
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");

.wrapper {
  .title {
    margin: 0.23rem 0;
    font-size: 0.3rem;
  }
  .song-group {
    margin-top: 0.16rem;
    .list-item {
      .flex-between();
      align-items: center;
      height: 1rem;
      .song-info {
        display: flex;
        flex-direction: column;
        .song-name {
          width: 6rem;
          height: 0.4rem;
          line-height: 0.4rem;
          .ellipsis();
        }
        .song-art {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.23rem;
          color: #dacdcd;
          .artist {
            &::after {
              content: "/";
            }
            &:last-child::after {
              content: "";
            }
          }
          .album-name {
            &::before {
              content: "-";
            }
          }
        }
      }
      .icon {
        color: #ccc;
      }
    }
  }
}
</style>
