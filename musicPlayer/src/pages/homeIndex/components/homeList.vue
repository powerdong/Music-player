<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-19 17:53:57
 * @Update log: 我的页面的列表项
 -->
<template>
  <div class="container pd13">
    <ul>
      <li v-for="(item, index) in homeListContext" :key="index" class="list-item">
        <i class="home" :class="item.icon"></i>
        <div class="border-bottom wrapper">
          <span class="list-content">{{item.text}}</span>
          <span class="num" ref="homeNum">({{item.num}})</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { homeList } from 'getInfos/getData'

export default {
  name: 'homeList',
  data () {
    return {
      homeListContext: []
    }
  },
  props: ['num'],
  mounted () {
    // 存取props 传过来的数据
    this.recordNum = this.num.recordNum
    this.djNum = this.num.djNum
    // 首先获取到初始化的数据，防止页面坍塌
    this.homeListContext = homeList()
  },
  watch: {
    // props 异步请求，初始加载时无法获取到props传过来的值
    num: {
      // 为了发现对象内部值的变化，可以在选项参数中指定 deep: true 。
      // 这样设置后 props 成功可以获取到
      deep: true,
      handler (val, oldVal) {
        this.recordNum = val.recordNum
        this.djNum = val.djNum
        this.setData()
      }
    }
  },
  methods: {
    /**
     * 对传过来的原数据进行修改
     */
    setData () {
      // 初始化图标和文字
      let item = homeList()
      /**
       * 通过筛选 对传入的数据进行修改
       */
      this.$set(item[1], 'num', this.recordNum)
      this.$set(item[3], 'num', this.djNum)
      this.homeListContext = item
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
