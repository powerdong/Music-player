<!--
 * @Author: Lambda
 * @Begin: 2019-12-03 12:34:55
 * @Update: 2019-12-10 13:09:16
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="title" @click="goDetailPage">
      {{title}}
      <i class="threeTitle threeTitleiconfontxiangxia1copy19"></i>
    </div>
    <div class="three-item" @click="toDetailPage">
      <div class="item-info" v-for="(item, index) in data" :key="index">
        <div class="img-info" :class="{circle: type === 'circle'}">
          <img
            :data-id="item.id ? item.id : ''"
            :src="item.program ? item.program.coverUrl : item.avatarUrl ? item.avatarUrl : item.picUrl"
            alt
          />
          <i v-if="!type === 'circle'" class="threeTitle threeTitlebofang"></i>
        </div>
        <span
          class="name twoLinesEllipsis"
        >{{item.program ? item.program.name : item.nickName ? item.nickName : item.name}}</span>
        <span v-if="type === 'circle'" class="num small">
          <i class="threeTitle threeTitlehuo"></i>
          {{ item.score | setCount}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { filterSetPlayCount } from 'utils/filters'
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    data: {
      type: Array
    },
    type: {
      type: String
    },
    pageId: {
      type: String
    }
  },
  filters: {
    setCount: function (val) {
      return filterSetPlayCount(val)
    }
  },
  methods: {
    goDetailPage () {
      this.$router.push({ name: 'conDetail', params: { id: this.pageId } })
    },
    toDetailPage (e) {
      const { nodeName, dataset } = e.target
      if (nodeName.toLocaleLowerCase() === 'img') {
        const id = dataset.id
        this.$router.push({ name: 'user_info', params: { id } })
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1542558_8cdf5fh6xcr.css");
.wrapper {
  margin-top: 0.5rem;
  .title {
    font-size: 0.3rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
    .threeTitleiconfontxiangxia1copy19 {
      font-size: 0.24rem;
    }
  }
  .three-item {
    .flex-around();
    .item-info {
      width: 1.7rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img-info {
        box-sizing: border-box;
        position: relative;
        width: 1.6rem;
        height: 0;
        padding-bottom: 1.6rem;
        &.circle {
          border-radius: 50%;
          overflow: hidden;
        }
        img {
          border-radius: 0.1rem;
          width: 100%;
        }
        .threeTitlebofang {
          position: absolute;
          color: #ccc;
          font-size: 0.5rem;
          bottom: 0.1rem;
          right: 0.13rem;
          z-index: 1;
        }
      }
      .name {
        box-sizing: border-box;
        margin-top: 0.15rem;
        padding: 0 0.1rem;
        font-size: 0.23rem;
        line-height: 1.3;
      }
      .small {
        margin-top: 0.13rem;
        font-size: 0.2rem;
        .threeTitlehuo {
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>
