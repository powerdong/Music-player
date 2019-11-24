<!--
 * @Author: Lambda
 * @Begin: 2019-10-25 12:55:37
 * @Update: 2019-11-24 12:22:25
 * @Update log: 更新日志
 -->
<template>
  <div>
    <slider-nav :list="chooseListTag"></slider-nav>
    <keep-alive>
      <router-view class="router-view" style="height: 87vh; overflow-y: scroll;"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import api from 'api'
import sliderNav from 'base/sliderNav'

export default {
  name: '',
  data () {
    return {
      chooseListTag: [
        {
          path: '/videoPage/musicFestival',
          text: '音乐节'
        }, {
          path: '/videoPage/scene',
          text: '广告'
        }, {
          path: '/videoPage/listenBGM',
          text: '听BGM'
        }, {
          path: '/videoPage/singing',
          text: '娱乐'
        }, {
          path: '/videoPage/dance',
          text: '流行'
        }, {
          path: '/videoPage/ACG',
          text: 'ACG'
        }, {
          path: '/videoPage/rock',
          text: '摇滚'
        }, {
          path: '/videoPage/game',
          text: '游戏'
        }, {
          path: '/videoPage/animation',
          text: '动漫'
        }
      ],
      list: [{
        id: 0
      }]
    }
  },
  created () {
    this._getVideoTag()
  },
  methods: {
    _getVideoTag () {
      api.getVideoTagFn()
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            // 存储所有的标签数据
            const tags = data.data
            tags.filter(ele => {
              this.chooseListTag.forEach(element => {
                if (ele.name === element.text) {
                  if (element.text === '音乐节') {
                    element.path = element.path
                  } else {
                    element.path = element.path + '/' + ele.id
                    element.text = ele.name
                  }
                }
              })
            })
          }
          console.log(this.list)
        })
    }
  },
  components: {
    sliderNav
  }
}
</script>

<style lang='less' scoped>
</style>
