<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-27 12:42:24
 * @Update: 2019-10-03 20:10:27
 * @Update log: 搜索框
 -->
<template>
  <div class="wrapper pd23">
    <!-- 左边的返回箭头 -->
    <i class="iconfont zuojiantou" @click="returnPage"></i>
    <!-- input 框，设置使得 input 页面加载input自动聚焦 -->
    <!-- 聚焦后显示搜索建议 -->
    <input
      class="search"
      type="text"
      :placeholder="placeholder"
      ref="inp"
      autofocus="autofocus"
      v-model.trim="keywords"
      @focus="displayList"
    />
    <!-- 通过观测输入框中是否有内容用来控制右侧的叉按钮是否显示 -->
    <!-- 为叉按钮定义点击事件，点击清空输入框 -->
    <i v-show="keywords" @click="clearInp" class="iconfont guanbi" :style="{right: Right}"></i>
    <i class="iconfont geshou" v-if="page"></i>
    <!-- 搜索建议列表信息 -->
    <div class="floatInfo" v-show="showList">
      <ul>
        <li @click="searchKey(keywords)" class="blue border-bottom">
          搜索
          <span class="text">"{{ keywords }}"</span>
        </li>
        <li
          @click="searchKey(item.keyword)"
          class="border-bottom"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <i class="iconfont sousuo"></i>
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <!-- 蒙层，当搜索建议显示，蒙层显示，控制列表不能滚动 -->
    <div class="mask" v-show="showList" @click="hideList"></div>
  </div>
</template>

<script>
import api from 'api'
import Bus from '../assets/Bus'
export default {
  name: 'searchInp',
  props: {
    page: {
      type: String
    },
    Right: {
      default: '0.23rem'
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchList: [],
      keywords: '',
      showList: false,
      // 将 history 存入 vuex
      history: [],
      // 防抖定时器
      time: null,
      placeholder: ''
    }
  },
  created () {
    // 获取焦点
    this.changFocus()
    // 先将默认搜索建议显示
    this._getPlaceholder()
    // 历史记录项点击搜索
    this.historySearch()
    // 页面首次加载，由于 keyword 没有被watch监听，所以使用函数方法进行赋值
    this.setKeyword()
  },
  mounted () {
    // 获取历史搜索记录
    this.getHistory()
  },
  watch: {
    /**
     * 是否显示搜索建议
     */
    keywords: function (val, oldVal) {
      // 这是对于输入框内容定义的事件，当是跳转过来的
      // 说明内容相等，不显示搜索建议列表
      if (this.keywords === this.keyword) {
        this.hideList()
        return
      }
      // 在内容变化时，并且当内容长度大于0 说明有内容时
      if (this.keywords.length > 0) {
        // 显示建议列表
        this.displayList()
      } else {
        // 隐藏建议列表
        this.hideList()
      }
    },
    // 对于prop传过来的值，在第一次使用方法进行修改，随后监听keyword变化，对搜索内容进行修改
    keyword: function (val, oldVal) {
      if (val) {
        this.keywords = val
      }
    }
  },
  methods: {
    /**
     * 第一次访问需要调用方法更改数据
     * 随后是监听 keyword 改变后赋值
     */
    setKeyword () {
      if (this.keyword) {
        this.keywords = this.keyword
      }
    },
    /**
     * 历史记录项目点击搜索
     */
    historySearch () {
      Bus.$on('search', (keywords) => {
        this.searchKey(keywords)
      })
    },
    /**
     * 点击清除按钮清除搜索框的内容
     */
    clearInp () {
      this.keywords = ''
    },
    /**
     * 自动获取焦点
     * 当是搜索展示页时不自动获取焦点
     */
    changFocus () {
      if (!this.keyword) {
        this.$nextTick(x => {
          this.$refs.inp.focus()
        })
      }
    },
    /**
     * 返回上一页
     */
    returnPage () {
      this.$router.go(-1)
    },
    /**
     * 设置输入框的默认显示
     */
    _getPlaceholder () {
      api.defaultSearchFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.placeholder = data.data.showKeyword
          }
        })
    },
    /**
     * 隐藏搜索建议列表
     */
    hideList () {
      this.showList = false
    },
    /**
     * 显示搜索列表建议
     */
    displayList () {
      if (!this.keywords) {
        return
      }
      this.showList = true
      // 搜索建议列表内容获取
      this.setSearchList(this.keywords)
    },
    /**
     * 请求搜索建议数据
     */
    _getSuggestList (keyword) {
      api.suggestSearchFn(keyword)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.searchList = data.result.allMatch
          }
        })
    },
    /**
     * 根据搜索内容展示搜索建议列表
     * 使用防抖
     */
    setSearchList (keywords) {
      if (this.time) {
        clearTimeout(this.time)
        this.time = null
      }
      this.time = setTimeout(() => {
        this._getSuggestList(keywords)
      }, 50)
    },
    /**
     * 获取历史搜索记录
     */
    getHistory (key) {
      let keys = localStorage.getItem('keys') ? localStorage.getItem('keys').split(',') : []
      if (key) {
        // 将关键字插入到数组最前面
        keys.unshift(key)
        // 存入本地之前进行去重
        keys = this.unique(keys)
        // 存入本地
        localStorage.setItem('keys', keys)
      }
      this.history = keys
      // 通过Bus 进行兄弟组件之间传值
      // 通过 Bus.$emit('方法名',要传的值)
      Bus.$emit('history', this.history)
    },
    /**
     * 向导航标签传递key值
     */
    pushKey (key) {
      this.$nextTick(() => {
        // DOM 现在更新了
        Bus.$emit('push', key)
      })
    },
    /**
     * 搜索
     * 搜索功能跳转到搜索展示页面
     */
    searchKey (key) {
      this.getHistory(key)
      this.hideList()
      this.clearInp()
      // 这里解决了Bus传值第一次无法获取到的问题
      // 后需解决！！！！
      setTimeout(() => {
        this.pushKey(key)
      }, 0)
      this.$router.push({
        path: `/composite/${key}`
      })
    },
    /**
     * 数组去重
     */
    unique (arr) {
      if (!Array.isArray(arr)) {
        console.log('type error!')
        return
      }
      return Array.prototype.filter.call(arr, function (item, index) {
        return arr.indexOf(item) === index
      })
    },
    beforeDestroy () {
      // 销毁监听事件
      this.$Bus.$off('push', 'history')
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1379594_vh7eh105cbo.css");
.wrapper {
  .flex-between();
  height: 0.7rem;
  line-height: 0.7rem;
  .guanbi {
    position: absolute;
    right: 0.23rem;
  }
  .geshou {
    margin-left: 0.3rem;
  }
  .iconfont {
    font-size: 0.5rem;
  }
  .search {
    flex: 1;
    margin-left: 0.3rem;
    border-bottom: 1px solid #aaa;
  }
  .floatInfo {
    width: 5.7rem;
    position: absolute;
    top: 0.8rem;
    box-shadow: 0 4px 16px #aaa;
    background-color: #fff;
    z-index: 2;
    .pd23();
    li {
      height: 0.8rem;
      line-height: 0.8rem;
      color: #888;
      .text {
        margin-left: 8px;
      }
      .iconfont {
        font-size: 0.4rem;
        vertical-align: -0.04rem;
      }
    }
    .blue {
      color: #38f;
    }
  }
  .mask {
    position: fixed;
    top: 0.7rem;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
