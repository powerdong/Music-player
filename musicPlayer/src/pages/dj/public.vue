<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-12 13:19:59
 * @Update: 2019-10-17 14:47:03
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="title">
      <h1 class="text">
        {{ title }}
        <i class="dj dj-arrow-right" v-show="!type === 'rank'"></i>
      </h1>
      <span class="smallTag" v-show="!type === 'rank'">
        <i class="dj dj-bofang"></i>
        播放全部
      </span>
    </div>
    <ul>
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <div class="index" v-show="type === 'rank'">
          <span>{{index + 1}}</span>
          <span>
            <i
              class="dj-public"
              :class="{publicjiantou : item.lastRank !== -1 && item.lastRank - item.rank > 0, publicjiantou1: item.lastRank !== -1 && item.lastRank - item.rank < 0, publicico17: item.lastRank === -1}"
            ></i>
            <i class="num" v-show="item.lastRank !== -1">{{(item.lastRank - item.rank) | setNum1}}</i>
          </span>
        </div>
        <div class="img-info">
          <img
            :src="item.picUrl ? item.picUrl  + '?param=100y100' : item.program ? item.program.coverUrl  + '?param=100y100' : ''"
            alt
          />
        </div>
        <div class="content">
          <p class="name">{{item.name ? item.name : item.program.name}}</p>
          <div class="dec">
            <div class="name">
              <div class="img-info">
                <img
                  :src="item.dj  ? item.dj.avatarUrl + '?param=50y50' : item.program ? item.program.coverUrl + '?param=50y50' : ''"
                  alt
                />
              </div>
              <span class="name-con">{{item.dj ? item.dj.nickname : item.program.dj.nickname}}</span>
            </div>
            <div class="hot-num">
              <span class="num">
                <i class="dj-public publichuo"></i>
                {{ item.subCount ? item.subCount : item.score ? item.score : '' | setNum }}
              </span>
            </div>
          </div>
        </div>
        <span class="icon">
          <i class="dj-public publicbofang1"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { filterSetPlayCount } from 'utils/filters'
export default {
  name: '',
  data () {
    return {
      top: false,
      bottom: false,
      isNew: false
    }
  },
  filters: {
    setNum: function (val) {
      return filterSetPlayCount(val)
    },
    setNum1: function (val) {
      if (val < 0) {
        return -val
      }
      return val
    }
  },
  props: {
    title: {
      type: String
    },
    data: {
      type: Array
    },
    type: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1463228_2ciob1m9yug.css");
.wrapper {
  margin-top: 0.5rem;
  .title {
    .flex-between();
    .text {
      font-weight: 700;
    }
  }
  .list-item {
    display: flex;
    align-items: center;
    height: 1.5rem;
    &:nth-of-type(1) .index {
      color: @bgcolor;
    }
    &:nth-of-type(2) .index {
      color: @bgcolor;
    }
    &:nth-of-type(3) .index {
      color: @bgcolor;
    }
    .index {
      width: 0.5rem;
      height: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 0.2rem;
      font-size: 0.3rem;
      font-weight: 500;
      .num {
        margin-left: -0.06rem;
      }
      .dj-public {
        font-size: 0.2rem;
        &.publicjiantou1 {
          color: #3388ff;
        }
        &.publicjiantou {
          color: @bgcolor;
        }
        &.publicico17 {
          color: #278230;
          font-size: 0.4rem;
        }
      }
    }
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
      min-width: 3rem;
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
      .publicbofang1 {
        color: #aaa;
        font-size: 0.5rem;
      }
    }
  }
}
</style>
