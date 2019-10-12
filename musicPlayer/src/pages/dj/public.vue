<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-12 13:19:59
 * @Update: 2019-10-12 13:54:58
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="title">
      <h1 class="text">
        {{ title }}
        <i class="dj dj-arrow-right"></i>
      </h1>
      <span class="smallTag">
        <i class="dj dj-bofang"></i>
        播放全部
      </span>
    </div>
    <ul>
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <div class="img-info">
          <img :src="songImg + '?param=100y100'" alt />
        </div>
        <div class="content">
          <p class="name">{{name}}</p>
          <div class="dec">
            <div class="name">
              <div class="img-info">
                <img :src="artistImg + '?param=50y50'" alt />
              </div>
              <span class="name-con">{{artistName}}</span>
            </div>
            <div class="hot-num">
              <span class="num">
                <i class="dj dj-huo"></i>
                {{ hotNum }}
              </span>
            </div>
          </div>
        </div>
        <span class="icon">
          <i class="dj dj-bofang1"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    data: {
      type: Array
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.wrapper {
  margin-top: 0.3rem;
  .title {
    .flex-between();
    .text {
      font-weight: 700;
    }
  }
  .list-item {
    display: flex;
    align-items: center;
    height: 1.2rem;
    .img-info {
      width: 1rem;
      height: 0;
      padding-bottom: 1rem;
      margin-right: 0.2rem;
      img {
        border-radius: @imgBorderRadius;
        width: 1rem;
        height: 1rem;
      }
    }
    .content {
      // width: 3rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        .ellipsis();
        line-height: 1.5;
      }
      .dec {
        display: flex;
        align-items: center;
        color: #aaa;
        .name {
          display: flex;
          align-items: center;
          .img-info {
            width: 0.5rem;
            height: 0;
            padding-bottom: 0.5rem;
            img {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
            }
          }
          &::after {
            content: "|";
          }
        }
      }
    }
    .icon {
      .dj-bofang1 {
        color: #aaa;
        font-size: 0.5rem;
      }
    }
  }
}
</style>
