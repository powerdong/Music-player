<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-28 12:56:39
 * @Update: 2019-09-28 12:56:39
 * @Update log: 播放全部的那一行
 *
 * 使用时传入当前列表有几首歌曲，用来显示
 -->
<template>
  <div class="title">
    <span>
      <!-- 点击事件，点击 播放全部 按钮 -->
      <span @click="beginAudio">
        <i class="audio_all audio_allbofang"></i>
        播放全部
      </span>
      <!-- 当歌单组件时，需要显示当前歌单总共有多少首歌曲的信息 -->
      <span class="count">(共{{trackCount}}首)</span>
    </span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    trackCount: {
      type: Number
    }
  },
  methods: {
    // 触发播放全部事件
    beginAudio () {
      this.$emit('beginAudioAll')
    }
  }
}
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1439756_kjcwl3bv5jo.css");
@import url("~styles/global.less");

.title {
  font-size: 0.3rem;
  height: 0.8rem;
  line-height: 0.8rem;
  .flex-between();
  background-color: #fff;
  .count {
    color: #999;
    font-size: small;
  }
}
</style>
