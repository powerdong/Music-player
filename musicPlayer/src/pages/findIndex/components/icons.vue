<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-11 17:56:26
 * @Update log: 更新日志
 -->
<template>
  <div class="container border-bottom">
    <div class="icon-wrapper" v-for="(item, index) in findIcons" :key="index">
      <div class="icon">
        <!-- 当图标文字是 每日推荐 则显示这一行 -->
        <span class="today" v-if="item.text === '每日推荐'" >{{today}}</span>
        <i :class="item.icon" class="find"></i>
      </div>
      <span class="icon-text">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
import {findIcons} from 'getInfos/getData'

export default {
  name: 'findIcon',
  data () {
    return {
      findIcons
    }
  },
  computed: {
    today: function () {
      return new Date().getDate()
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.findIcons = findIcons()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');

.container {
  .flex-around();
  width: 100%;
  height: 1.6rem;
  align-items: center;
  padding: 0.2rem 0 0.3rem;
  .icon-wrapper {
    .flex-around();
    box-sizing: border-box;
    height: 100%;
    flex-direction: column;
    align-items: center;
    .icon {
      width: @iconWidth*0.9;
      height: @iconWidth*0.9;
      line-height: @iconWidth*0.9;
      .icons();
      .find{
        font-size: 0.5rem;
      }
      .today{
        position: absolute;
        top: 0.1rem;
        left: 0.34rem;
        font-size: 0.2rem;
      }
    }
    .icon-text {
      font-size: @iconText;
    }
  }
}
</style>
