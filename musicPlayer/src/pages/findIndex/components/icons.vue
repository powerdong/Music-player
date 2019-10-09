<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-10-09 12:16:40
 * @Update log: 更新日志
 -->
<template>
  <div class="container border-bottom">
    <icon
      v-for="(item, index) in findIcons"
      :icons="item"
      :bgcolor="true"
      :key="index"
      @goPage="goPage(item.linkTo)"
    >
      <span class="today" v-if="item.text === '每日推荐'">{{today}}</span>
    </icon>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { findIcons } from 'getInfos/getData'
import icon from 'base/icon'
import api from 'api'

export default {
  name: 'findIcon',
  data () {
    return {
      findIcons
    }
  },
  components: {
    icon
  },
  computed: {
    today: function () {
      return new Date().getDate()
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    iniData () {
      this.findIcons = findIcons()
    },
    goPage (link) {
      if (link === 'personalFm') {
        // 当如果是点击私人Fm时需要做的操作
        // 获取私人FM信息
        this._getPersonalFm()
      } else {
        // 正常的是点击图标跳转
        this.$router.push(link)
      }
    },
    /**
     * 播放全部
     */
    startPlay (list) {
      this.startPlayAll({
        list
      })
    },
    _getPersonalFm () {
      api.personalFmFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            const list = data.data
            // 将信息传到播放页面进行播放
            this.startPlay(list)
          }
        })
    },
    ...mapActions(['startPlayAll'])
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

.container {
  .flex-around();
  width: 100%;
  height: 1.6rem;
  align-items: center;
  padding: 0.2rem 0 0.3rem;
  .today {
    position: absolute;
    top: 0.09rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.2rem;
  }
}
</style>
