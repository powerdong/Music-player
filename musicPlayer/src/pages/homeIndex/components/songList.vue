<template>
  <div class="container pd13">
    <div class="wrapper-title">
      <div class="left-title">
        <i class="iconfont iconxiala"></i>
        <span class="title">创建的歌单</span>
        <span class="num">(1)</span>
      </div>
      <div class="right-title">
        <i class="iconfont iconjia"></i>
        <i class="iconfont icondian"></i>
      </div>
    </div>
    <ul class="song-group">
      <li class="song-list">
        <div class="list-img">
          <i class="iconfont iconxin"></i>
        </div>
        <div class="list-info">
          <p class="list-title">我喜欢的音乐</p>
          <p class="list-num">0首</p>
        </div>
        <div class="heart">
          <span class="heart-text">
            <i class="iconfont iconxindong"></i>心动模式
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "songList"
}
</script>

<style lang="less" scoped>
@import url("https:////at.alicdn.com/t/font_1306338_0j9qd4b899zn.css");

.wrapper-title {
  width: 100%;
  height: 0.76rem;
  line-height: 0.76rem;
  display: flex;
  justify-content: space-between;
  .left-title {
    .title {
      font-size: 0.32rem;
      font-weight: 700;
    }
    .num {
      font-size: 0.2rem;
      color: #ccc;
      margin-left: 0.1rem;
    }
  }
  .right-title {
    .icondian {
      margin-left: 0.13rem;
    }
  }
}
.song-group {
  .song-list {
    width: 100%;
    height: 0.8rem;
    margin: 0.16rem 0;
    display: flex;
    justify-content: space-between;
    .list-img {
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0.1rem;
      width: 0.8rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      color: #fff;
      margin-right: 0.3rem;
      .iconxin {
        font-size: 0.47rem;
      }
    }
    .list-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .list-num {
        margin-top: 0.13rem;
        font-size: 0.2rem;
        color: #ccc;
      }
    }
    .heart {
      width: 2rem;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .heart-text {
        box-sizing: border-box;
        padding: 0.1rem 0.1rem 0.1rem 0.13rem;
        font-size: 0.2rem;
        border-radius: 1rem;
        letter-spacing: 0.05rem;
        text-align: center;
        border: 1px solid #ccc;
        .iconxindong{
          font-size: 0.2rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
