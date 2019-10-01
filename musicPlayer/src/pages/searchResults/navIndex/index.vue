<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 19:54:27
 * @Update: 2019-10-01 14:33:04
 * @Update log: 因为存在 url地址自动将中文转换为编码
 *              在第一次加载时，默认组件不能正确添加active样式
 -->
<template>
  <slider-nav :list="list"></slider-nav>
</template>

<script>
import { mapGetters } from 'vuex'
import Bus from '../../../assets/Bus'
import sliderNav from 'base/sliderNav'
export default {
  name: '',
  mounted () {
    // 页面刷新时通过 params 获取关键字
    this.setLinkPage()
    // 通过Bus传值获取
    this.getKey()
  },
  computed: {
    ...mapGetters({ page: 'LINK_PAGE' })
  },
  methods: {
    /**
     * 页面刷新时使用 params 获取
     */
    setLinkPage () {
      let id = this.$route.params.id
      this.linkPage = id
    },
    /**
     * 获取Bus传过来的值
     */
    getKey () {
      Bus.$on('push', key => {
        this.linkPage = key
      })
    },
    handleScroll (index) {
      this.$refs.navs.scrollLeft = index * 85
    },
    getPage (val) {
      let index = this.toLink.indexOf(val)
      this.handleScroll(index)
    }
  },
  /**
   * 监听linkPage变化，对循环的list数组进行改变赋值
   */
  watch: {
    linkPage: function (newKey) {
      /**
       * 循环遍历数组，渲染标签导航
       */
      this.list = [
        {
          path: `/composite/${newKey}`,
          text: '综合'
        }, {
          path: `/song/${newKey}`,
          text: '单曲'
        }, {
          path: `/video/${newKey}`,
          text: '视频'
        }, {
          path: `/artist/${newKey}`,
          text: '歌手'
        }, {
          path: `/album/${newKey}`,
          text: '专辑'
        }, {
          path: `/playList/${newKey}`,
          text: '歌单'
        }, {
          path: `/djRadio/${newKey}`,
          text: '主播电台'
        }, {
          path: `/user/${newKey}`,
          text: '用户'
        }
      ]
    },
    page: function (val) {
      /**
       * 获取到当前要跳转的路由页
       * 寻找下标
       * 0 : 0
       * 1 : 85
       * 2 : 170
       */
      this.getPage(val)
    }
  },
  data () {
    return {
      linkPage: '',
      list: [],
      toLink: ['composite', 'song', 'video', 'artist', 'album', 'playList', 'djRadio', 'user']
    }
  },
  components: {
    sliderNav
  }
}
</script>

<style lang='less' scoped>
</style>
