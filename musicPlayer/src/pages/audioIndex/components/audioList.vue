<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-21 14:37:20
 * @Update: 2019-09-21 16:29:19
 * @Update log: 更新日志
 -->
<template>
<div @click.stop>
<div class="mask" v-show="isShowAudioList" @click="showAudioList"></div>
<transition name="list-show" mode="out-in">
    <div  class="audio-list pd23" v-show="isShowAudioList" >
      <div class="list-title border-bottom">
        <div class="left">
          <span  @click="changeMode">
            <i class="audio" :class="[modeClass]"></i>
            <span v-once>{{ modeText }}</span>
            <span class="list-num">({{ num }})</span>
          </span>
        </div>
        <div class="right">
          <span>
            <i class="audio audiowenjianjia"></i>
            收藏全部
          </span>
          <span>
            <i class="audio audiolajitong"></i>
          </span>
        </div>
      </div>
      <ul class="scroll">
        <li class="list-item"
            v-for="(item, index) in audioList"
            :key="index"
            @click="audioThis(item, index)"
            :class="isActive(item)">
          <i class="audio audiovolume"></i>
          <div class="info">
            <span class="name">
              <i>{{item.name}}</i>
            </span>
            <span class="artist">
              <i v-for="(item, index) in artist(item)" :key="index">
                {{ item.name }}
              </i>
            </span>
          </div>
          <!-- 删除此项歌曲 -->
          <span @click.stop="deleteSong(item)">
            <i class="audio audiochushaixuanxiang"></i>
          </span>
          </li>
      </ul>
    </div>
   </transition>
</div>
</template>

<script>
import {audio} from 'mixins/Mixins'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  mixins: [audio],
  name: '',
  props: {
    num: {
      type: Number
    },
    isShowAudioList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modeText: function () {
      switch (this.mode) {
        case 0: // 列表循环
          return '列表循环'
        case 1: // 单曲循环
          return '单曲循环'
        case 2: // 随机播放
          return '随机播放'
      }
    },
    ...mapGetters({
      audioList: 'AUDIO_LIST',
      audioIng: 'AUDIO_ING_SONG',
      playList: 'PLAY_LIST'
    })
  },
  methods: {
    isActive (item) {
      if (item.id === this.audioIng.id) {
        return 'active'
      }
      return ''
    },
    artist (artist) {
      if (artist.artists) {
        return artist.artists
      } else {
        return artist.ar
      }
    },
    audioThis (item, index) {
      // 随机播放情况
      if (this.mode === 2) {
        /**
         * 找到对应歌曲的索引
         */
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setAudioIndex(index)
    },
    ...mapMutations({
      setAudioIndex: 'SET_AUDIO_INDEX'
    }),
    ...mapActions(['deleteSong'])
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');

.list-show-enter,
.list-show-leave-to {
  transform: translateY(7rem);
}

.list-show-enter-active,
.list-show-leave-active {
  transition: transform linear 0.3s;
}

.audio-list{
    width: 100%;
    margin-right: 0.23rem;
    position: absolute;
    bottom: 0;
    z-index: 11;
    background-color: #fff;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    .list-title{
      display: flex;
      .flex-between();
      align-items: center;
      height: 1rem;
    }
    .scroll{
      &::-webkit-scrollbar { width: 0 !important }
      max-height: 6rem;
      overflow: scroll;
      .list-item{
        display: flex;
        .flex-between();
        align-items: center;
        height: 1rem;
        .audiovolume{
          display: none;
        }
        &.active{
          color: @bgcolor;
          .audiovolume{
            display: block;
          }
          .artist{
            color: @bgcolor;
          }
        }
        .info{
          width: 80vw;
          .ellipsis();
        }
        .artist{
          font-size: 0.24rem;
          color: #999;
          i{
            &::after{
              content: "/";
            }
            &:last-child::after{
              content: ""
            }
            &:first-child::before{
              content: "-"
            }
          }
        }
        .audiochushaixuanxiang{
          color: #bbb;
        }
      }
    }
  }
</style>
