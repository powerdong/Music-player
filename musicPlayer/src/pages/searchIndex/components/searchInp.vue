<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-27 12:42:24
 * @Update: 2019-08-29 13:35:13
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <i class="search iconzuojiantou"  @click="returnPage"></i>
    <input
          class="searchInp"
          type="text"
          placeholder=""
          ref="inp"
          autofocus="autofocus"
          v-model.trim="keywords"
          @focus="displayList">
    <i class="search icongeshou"></i>
    <div class="floatInfo" v-if="showList">
      <ul>
        <li  @click="searchKey(keywords)" class="blue border-bottom">搜索<span class="text">"{{ keywords }}"</span></li>
        <li @click="searchKey(item.keyword)" class="border-bottom" v-for="(item, index) in searchList" :key="index">
          <i class="search iconsousuo1"></i>
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <div class="mask" v-show="showList" @click="hideList"></div>
  </div>
</template>

<script>
import api from 'api'
import Bus from '../../../assets/Bus'
export default {
  name: 'searchInp',
  data () {
    return {
      searchList: [],
      default: '',
      keywords: '',
      showList: false,
      // 将 history 存入 vuex
      history: []
    }
  },
  created () {
    // 获取焦点
    this.changFocus()
    // 先将默认搜索建议显示
    this.setDefault()
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
      if (this.keywords.length > 0) {
        this.displayList()
        this.setSearchList(val)
      } else {
        this.hideList()
      }
    }
  },
  methods: {
    /**
     * 自动获取焦点
     */
    changFocus () {
      this.$nextTick(x => {
        this.$refs.inputs.focus()
      })
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
    setDefault () {
      api.defaultSearchFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.default = data.data.showKeyword
            this.$refs.inp.setAttribute('placeholder', this.default)
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
      // 当搜索框内没有内容时不显示
      if (!this.keywords) {
        return
      }
      this.showList = true
    },
    /**
     * 根据搜索内容展示搜索建议列表
     */
    setSearchList (keywords) {
      api.suggestSearchFn(keywords)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.searchList = data.result.allMatch
          }
        })
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
     * 搜索
     */
    searchKey (key) {
      this.getHistory(key)
      api.searchFn(key)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            console.log(data)
          }
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
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

.wrapper{
  .flex-between();
  .search{
    font-size: 0.5rem
  }
  .searchInp{
    flex: 1;
    margin: 0 0.3rem;
    border-bottom: 1px solid #aaa;
  }
  .floatInfo{
    width: 5.7rem;
    position: absolute;
    top: 0.8rem;
    box-shadow: 0 4px 16px #aaa;
    background-color: #fff;
    z-index: 2;
    .pd23();
    li{
      height: 0.8rem;
      line-height: 0.8rem;
      color: #888;
      .text{
        margin-left: 8px;
      }
      .search{
        font-size: 0.4rem;
        vertical-align: -0.04rem;
      }
    }
    .blue{
      color: #38f
    }
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
