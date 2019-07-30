<template>
  <div class="container pd13">
    <ul>
      <li v-for="(item, index) in homeList" :key="index" class="list-item">
        <i class="home" :class="item.icon"></i>
        <div class="border-bottom wrapper">
          <span class="list-content">{{item.text}}</span>
          <span class="num">({{item.num}})</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {homeList} from 'getInfos/getData'

export default {
  name: 'homeList',
  data () {
    return {
      homeList
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.homeList = homeList()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');
.list-item {
  .flex-between();
  margin: 0.1rem 0;
  height: 0.76rem;
  line-height: 0.76rem;
  &:last-child .wrapper::before {
    border: none;
  }
  .wrapper {
    flex: 1;
    .num {
      .num()
    }
  }
  .home {
    font-size: 0.5rem;
    margin: 0 0.4rem;
  }
}
</style>
