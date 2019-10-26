<!--
 * @Author: Lambda
 * @Begin: 2019-10-26 10:49:45
 * @Update: 2019-10-26 10:59:43
 * @Update log: 更新日志
 -->
<template>
  <div>
    <div class="img-info">
      <img src alt />
    </div>
    <div class="author">
      <h1 class="nickname">
        范电影
        <span>发布：</span>
      </h1>
      <span class="fans">19.7万粉丝</span>
      <h1
        class="title"
      >Snails近期结束了在Red Rocks的演出！这次已经是他在Red Rocks演出的第三个年头了，Snails本人激动之余也向一直以来支持自己的粉丝们表达了感谢！现场视频已上传！</h1>
      <div class="img-content">
        <img src="http://p4.music.126.net/t4RlWJ_te7tjmgOLXlzmqw==/109951164440668313.jpg" alt />
        <span class="center-bofang">
          <i class="video video-bofang1"></i>
        </span>
        <span class="go-count">
          <i class="video video-bofang"></i>
          {{item.data.playTime | setCount}}
        </span>
        <span class="go-time">
          <i class="video video-yinlebofangxuanlvjiezou"></i>
          {{item.data.durationms | setTime}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang='less' scoped>
</style>
