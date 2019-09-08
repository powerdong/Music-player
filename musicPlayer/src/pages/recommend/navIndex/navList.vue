<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 19:54:27
 * @Update: 2019-09-08 17:52:01
 * @Update log: 因为存在 url地址自动将中文转换为编码
 *              在第一次加载时，默认组件不能正确添加active样式
 -->
<template>
 <div class="wrapper pd23" ref="navs">
    <!-- 使用 replace 它不会向 history 添加新记录 -->
    <router-link :to="item.text | setPage"
                class="nav-list"
                v-for="(item, index) in list"
                :key="index"
                replace>
    {{ item.text }}
    </router-link>
    <span class="more">
      <i class="recommend ziyuanxhdpi"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    handleScroll (index) {
      this.$refs.navs.scrollLeft = index * 85
    },
    getPage (val) {
      let index = this.toLink.indexOf(val)
      this.handleScroll(index)
    }
  },
  filters: {
    setPage: function (val) {
      if (val) {
        if (val === '推荐') {
          val = '/recommended'
        } else if (val === '精品') {
          val = '/fine'
        } else {
          val = `/general/${val}`
        }
      }
      return val
    }
  },
  data () {
    return {
      linkPage: '',
      list: [
        {
          text: '推荐'
        }, {
          text: '精品'
        }, {
          text: '欧美'
        }, {
          text: '电子'
        }, {
          text: '民谣'
        }, {
          text: '轻音乐'
        }, {
          text: '韩语'
        }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.wrapper{
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  margin-top: 0.16rem;
  overflow-x: auto;
  border-bottom: 1px solid #ddd;
  margin-right: 0.6rem;
  .nav-list{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 1.2rem;
    height: 0.7rem;
    box-sizing: border-box;
    padding: 0.03rem;
    margin: 0 0.2rem;
    color: #000;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: @bgcolor;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }
    &.ac{
      color: @bgcolor;
    }
    &.ac::before{
      transform-origin: bottom left;
      transform: scaleX(1);
    }
  }
  .more{
    position: fixed;
    right: 8px;
    top: 0.95rem;
    // transform: translateY(-50%);
    .recommend{
      font-size: 0.4rem;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
