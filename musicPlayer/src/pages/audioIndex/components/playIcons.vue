<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-13 13:33:12
 * @Update: 2019-10-24 09:42:28
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <i
      class="audio"
      @click="changeLikeStatus(audioSong.id)"
      :class="{audioshoucang: isLike, audioshoucang1:!isLike}"
    ></i>
    <i class="audio audioxiazai"></i>
    <i class="audio audiocaidan"></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from 'api'
export default {
  name: '',
  props: {
    isLike: {
      type: Boolean
    }
  },
  computed: {
    _isLike: {
      get () {
        return this.isLike
      },
      set (val) {
        this.$emit('update_isLike', val)
      }
    },
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  methods: {
    /**
     * 添加喜欢歌曲
     * 删除已喜欢歌曲
     */
    changeLikeStatus (id) {
      api.likeMusicFn(id, !this.isLike)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            // 成功
            this._isLike = !this.isLike
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .pinglun {
    position: relative;
    .com-num {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0.24rem;
      padding: 0.03rem;
      box-sizing: border-box;
      background-color: #7f8c8d;
      color: #bdc3c7;
    }
  }
  .audio {
    font-size: 0.5rem;
    color: #bdc3c7;
    &.audioshoucang {
      color: #e74c3c;
    }
  }
}
</style>
