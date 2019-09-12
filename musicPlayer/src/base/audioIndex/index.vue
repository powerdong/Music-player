<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-12 13:02:20
 * @Update: 2019-09-12 13:55:40
 * @Update log: 点击歌单中的某一项，将歌单列表信息传入vuex，用来展示歌曲列表，
 *              点击的index 用列表[index]来设置当前要播放的歌曲
 -->
<template>
  <div class="audioPage">
    这是音乐播放页面
  </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang='less' scoped>
.audioPage{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: red
}
</style>
