<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:56:42
 * @Update: 2019-09-22 17:15:26
 * @Update log: 更新日志
 -->
<template>
<list-global title="单曲"
            :songList="true"
            :more="songList.more"
            :moreText="songList.moreText"
            linkPage="song"
            :keyW="keyword">
<ul class="song-group">
  <song-list v-for="(item, index) in songList.songs"
              :key="index"
              tag="li"
              class="list-item"
              :songName="item.name"
              :artists="item.ar"
              :albumName="item.al.name"
              @beginSong="setAudioList(item)"
              :nowSong="item.id === audioSong.id"></song-list>
</ul>
</list-global>
</template>

<script>
import listGlobal from 'base/titleFooter'
import songList from 'base/song'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: '',
  props: {
    songList: {
      type: Object
    },
    keyword: {
      type: String
    }
  },
  computed: {
    ...mapGetters({audioSong: 'AUDIO_ING_SONG'})
  },
  filters: {
    artName: function (value) {
      if (!value) return ''
      value = '/' + value
      return value
    }
  },
  methods: {
    setAudioList (song) {
      this.addToAudioList(song)
    },
    ...mapActions(['addToAudioList'])
  },
  components: {
    listGlobal,
    songList
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
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
          height: 0.4rem;
          width: 6rem;
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
        }
      }
      .icon{
        color: #ccc;
      }
    }
  }
  .more{
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.26rem;
    color: #ccc;
    .youjiantou{
      color: #aaa;
    }
  }
</style>
