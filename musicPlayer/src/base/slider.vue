<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-27 12:49:09
 * @Update: 2019-10-03 20:14:38
 * @Update log: 更新日志
 -->
<template>
  <div>
    <el-drawer
      :title="title"
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
      :size="size"
      :before-close="handleClose"
    >
      <div>
        <p v-for="(item, index) in data" :key="index" class="item pd23 border-bottom">
          <a class="cover" @click="itemHandle(item.text, id)"></a>
          <i class="slider" :class="item.icon"></i>
          {{item.text}}
        </p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import api from 'api'
export default {
  data () {
    return {
      drawer: false,
      direction: 'btt',
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
      }]
    }
  },
  props: {
    title: {
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
    }
  },
  computed: {
    data: function () {
      return this.homePlaylistSlider ? this.homePlaylist : this.homeFavoritelistSlider ? this.homeFavoritelist : []
    },
    size: function () {
      return this.data.length * 10 + '%'
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    open2 () {
      this.$message({
        message: '成功删除此歌单，请2分钟后刷新查看',
        type: 'success'
      })
    },
    /**
     * 删除此项
     */
    deleteItem (id) {
      this.$confirm('确认删除此歌单吗？')
        .then(_ => {
          if (this.homeFavoritelistSlider) {
            // 取消收藏此歌单
            this._cancelPlayList(id)
          } else {
            // 删除创建的歌单
            this._deleteCreatedList(id)
          }
        })
        .catch(_ => {
        })
    },
    _cancelPlayList (id) {
      api.addOrDeletePlaylistFn(2, id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.open2()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _deleteCreatedList (id) {
      api.deletePlaylistFn(id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.open2()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    showSlider () {
      this.drawer = true
    },
    itemHandle (name, id) {
      switch (name) {
        case '删除':
          this.deleteItem(id)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less">
@import url("~styles/global");
@import url("//at.alicdn.com/t/font_1439316_78lw4a7q5n2.css");
.item {
  height: 0.9rem;
  line-height: 0.9rem;
  .slider {
    margin-right: 0.2rem;
  }
}
</style>
