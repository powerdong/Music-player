<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-12 14:24:51
 * @Update: 2019-12-08 12:24:40
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper">
    <div class="title border-bottom" :class="{center: type ==='class'}">{{title}}</div>
    <ul class="list-wrap" @click="toClassDetailPage">
      <li
        class="list-item"
        ref="item"
        :data-id="item.id"
        :data-title="item.name"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="img-info">
          <img :src="item.imgUrl" alt />
        </div>
        <span class="name">{{item.name}}</span>
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
    },
    type: {
      type: String
    }
  },
  methods: {
    toClassDetailPage (e) {
      const nodeName = e.target.nodeName.toLowerCase()
      if (nodeName === 'li') {
        const id = e.target.dataset.id
        const title = e.target.dataset.title
        this.$router.push({ name: 'classDetail', params: { id, title } })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  margin-top: 0.5rem;
  .title {
    font-weight: 700;
    padding-bottom: 0.3rem;
    margin: 0.3rem;
    &.center {
      text-align: center;
    }
  }
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: left;
      box-sizing: border-box;
      padding: 0.2rem;
      .img-info {
        position: relative;
        z-index: -1;
        width: 0.5rem;
        height: 0;
        padding-bottom: 0.5rem;
        margin-right: 0.2rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      .name {
        position: relative;
        z-index: -1;
      }
    }
  }
}
</style>
