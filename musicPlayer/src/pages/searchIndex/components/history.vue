<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-27 13:29:51
 * @Update: 2019-08-31 10:06:52
 * @Update log: 更新日志
 -->
<template>
 <div class="history pd23" v-if="history.length">
   <div class="history-title">
     <span>历史记录</span>
     <i class="search iconlajitong" @click="clearHistory"></i>
   </div>
   <div class="wrapper">
    <div class="container ">
      <ul class="icons-group">
        <li class="icon-list"
            @click="toSearch(item)"
            v-for="(item, index) in history"
            :key="index">{{item}}
        </li>
      </ul>
    </div>
  </div>
 </div>
</template>

<script>
import Bus from '../../../assets/Bus'
export default {
  name: 'history',
  data () {
    return {
      history
    }
  },
  created () {
    this.getHistory()
  },
  methods: {
    /**
     * 获取历史记录
     */
    getHistory () {
      // 兄弟组件进行值的接收
      // Bus.$on('方法名(与兄弟组件方法名一致), 回调函数 参数为传过来的值')
      Bus.$on('history', (history) => {
        this.history = history
      })
    },
    /**
     * 清除历史记录
     */
    clearHistory () {
      localStorage.removeItem('keys')
      this.history = []
    },
    toSearch (keywords) {
      Bus.$emit('search', keywords)
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.history{
  margin-top: 0.5rem;
  .history-title{
    .flex-between();
    height: 0.8rem;
    line-height: 0.8rem;
    .iconlajitong{
      width: 0.8rem;
      height: 0.8rem;
      text-align: center;
      font-size: 0.4rem
    }
  }
  .wrapper {
    box-sizing: border-box;
    overflow: hidden;
    height: 0.5rem;
    // 定义可左右滑动的图标组
    .container {
      // 横向滚动条
      overflow-x: scroll;
      .icons-group {
        // flex布局 溢出不换行
        height: 0.5rem;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        white-space: nowrap;
        width: auto;
        min-width: 100%;
        .icon-list {
          height: 0.44rem;
          box-sizing: border-box;
          padding: 0 0.13rem;
          font-size: small;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          border-radius: 0.3rem;
          background: #eee;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
