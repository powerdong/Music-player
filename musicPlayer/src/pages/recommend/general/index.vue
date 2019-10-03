<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-08 13:17:34
 * @Update: 2019-09-17 10:32:47
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div class="img-col" v-show="!load">
      <img-card
        v-for="(item, index) in list"
        :key="index"
        :playCount="item.playCount"
        :imgUrl="item.coverImgUrl"
        :dec="item.name"
        :albumId="item.id"
      ></img-card>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import api from 'api'
import imgCard from 'base/imgCard'
import pageLoading from 'base/pageLoading'

export default {
  name: '',
  components: {
    imgCard,
    pageLoading
  },
  data () {
    return {
      cat: '',
      list: [],
      load: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.load = true
    console.log(to, from)
    this.cat = to.params.id
    this._getCatInfo(this.cat)
    next()
  },
  created () {
    this.getCat()
  },
  methods: {
    getCat () {
      this.cat = this.$route.params.id
      this._getCatInfo(this.cat)
    },
    _getCatInfo (key) {
      api.recSongListFn(undefined, undefined, key)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.list = data.playlists
            this.load = false
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");

.img-col {
  .flex-between();
  flex-wrap: wrap;
}
</style>
