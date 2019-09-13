<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-27 17:08:42
 * @Update: 2019-09-12 14:02:08
 * @Update log: 更新日志
 -->
<template>
  <div id="app">
    <transition name="router-fade"
                mode="out-in">
      <keep-alive>
        <router-view></router-view>
        <!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
      </keep-alive>
      <!-- </transition>
      <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </transition>
    <!-- 通过查看播放列表的length来看看播放页面是否可以显示 -->
    <play-song v-show="AUDIO_LIST.length"></play-song>
  </div>
</template>

<script>
import playSong from '@/pages/audioIndex'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    playSong
  },
  computed: {
    ...mapGetters([
      'FULL_SCREEN',
      'AUDIO_LIST'
    ])
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
}
</style>
