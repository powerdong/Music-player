<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-27 12:49:09
 * @Update: 2019-11-29 13:18:49
 * @Update log: 更新日志
 -->
<template>
  <div>
    <van-action-sheet v-model="drawer" class="van-ellipsis" :title="title">
      <div>
        <p v-for="(item, index) in data" :key="index" class="item pd23 border-bottom">
          <a class="cover" @click="itemHandle(item.text, id)"></a>
          <i class="slider" :class="item.icon"></i>
          {{item.text}}
        </p>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import api from 'api'
import { Dialog, Toast } from 'vant'
export default {
  data () {
    return {
      drawer: false,
      direction: 'btt',
      show: false,
      homePlaylist: [{
        icon: 'sliderxiazai',
        text: '下载'
      }, {
        icon: 'sliderfenxiang',
        text: '分享'
      }, {
        icon: 'sliderbianji',
        text: '编辑歌单信息'
      }, {
        icon: 'slidericonfont-shanchu',
        text: '删除'
      }],
      homeFavoritelist: [{
        icon: 'sliderxiazai',
        text: '下载'
      }, {
        icon: 'sliderfenxiang',
        text: '分享'
      }, {
        icon: 'slidericonfont-shanchu',
        text: '删除'
      }],
      djDetail: [{
        icon: 'sliderxiazai',
        text: '下载'
      }, {
        icon: 'sliderpinglun',
        text: '评论'
      }, {
        icon: 'sliderfenxiang',
        text: '分享'
      }, {
        icon: 'sliderjubao',
        text: '举报'
      }]
    }
  },
  props: {
    title: {
      type: String
    },
    author: {
      type: String
    },
    imgUrl: {
      type: String
    },
    id: {
      type: Number
    },
    homePlaylistSlider: {
      type: Boolean,
      default: false
    },
    homeFavoritelistSlider: {
      type: Boolean,
      default: false
    },
    djDetailList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    data: function () {
      return this.homePlaylistSlider ? this.homePlaylist : this.homeFavoritelistSlider ? this.homeFavoritelist : this.djDetailList ? this.djDetail : []
    },
    size: function () {
      return this.data.length * 10 + '%'
    }
  },
  methods: {
    /**
     * 删除此项
     */
    deleteItem (id) {
      this.drawer = false
      this.$dialog.confirm({
        message: '确认删除此歌单吗？'
      }).then(_ => {
        if (this.homeFavoritelistSlider) {
          // 取消收藏此歌单
          this._cancelPlayList(id)
        } else {
          // 删除创建的歌单
          this._deleteCreatedList(id)
        }
      })
        .catch(_ => {
          this.drawer = false
        })
    },
    /**
     * 取消收藏
     */
    _cancelPlayList (id) {
      api.addOrDeletePlaylistFn(2, id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            Toast({
              position: 'bottom',
              message: '已删除'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 删除歌单
     */
    _deleteCreatedList (id) {
      api.deletePlaylistFn(id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            Toast({
              position: 'bottom',
              message: '已删除'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    commentsItem (id) {
      const djId = id
      const title = this.title
      const author = this.author
      const imgUrl = this.imgUrl
      this.$router.push({ name: 'comments', params: { djId, imgUrl, title, author } })
    },
    showSlider () {
      console.log('kkk')
      this.drawer = true
    },
    itemHandle (name, id) {
      switch (name) {
        case '删除':
          this.deleteItem(id)
          break
        case '评论':
          this.commentsItem(id)
          break
        default:
          break
      }
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
}
</script>

<style lang="less">
@import url("~styles/global");
@import url("//at.alicdn.com/t/font_1439316_22v2kqpozkoh.css");
.item {
  height: 0.9rem;
  line-height: 0.9rem;
  .slider {
    margin-right: 0.2rem;
  }
}
</style>
