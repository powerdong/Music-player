<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-06 11:10:20
 * @Update log: 更新日志
 -->
<template>
  <div class="container border-bottom">
    <icon v-for="(item, index) in findIcons"
          :icons="item"
          :bgcolor="bgcolor"
          :key="index"
          :linkTo="item.linkTo">
      <span class="today" v-if="item.text === '每日推荐'" >{{today}}</span>
    </icon>
  </div>
</template>

<script>
import {findIcons} from 'getInfos/getData'
import icon from 'base/icon'

export default {
  name: 'findIcon',
  data () {
    return {
      findIcons,
      bgcolor: 'bgcolor'
    }
  },
  components: {
    icon
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
  .today{
    position: absolute;
    top: 0.1rem;
    left: 0.35rem;
    font-size: 0.2rem;
  }
}
</style>
