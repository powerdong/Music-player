<!--
 * @Author: Lambda
 * @Begin: 2019-10-26 10:32:15
 * @Update: 2019-11-12 21:55:07
 * @Update log: 更新日志
 -->
<template>
  <div class="friend-wra">
    静待...
    <br />
    <br />欢迎访问我的 GitHub
    <br />
    <br />

    <a
      href="https://github.com/powerdong/Music-player"
      target="_blank"
      rel="noopener noreferrer"
    >项目地址</a>
    <br />
    <br />您的 star 是我最大的鼓励
  </div>
  <!-- <public-info :data="dataInfo"></public-info> -->
</template>

<script>
// import publicInfo from './public'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      dataInfo: []
    }
  },
  created () {
    // this._getFriendInfo()
  },
  methods: {
    async _getFriendInfo () {
      const { data } = await api.friendFn()
      if (data.code === 200) {
        const { event } = data
        this.dataInfo = this.getJson(event)
      }
    },
    /**
     * 将json字符串传换为js对象
     * 将数组中每一项添加一项 userReason
     */
    getJson (arr) {
      let res = []
      arr.forEach((ele, index) => {
        res.push(JSON.parse(ele.json))
        let reason = ele.rcmdInfo ? ele.rcmdInfo.userReason : ''
        res[index].userReason = reason
        // 刚开始是使用下边这个写法。是错误的！！
        // 形成了命名冲突，但是不会报错，造成最后的key值名称不正确
        // let {userReason} = ele.rcmdInfo
        // res[i].userReason = userReason
      })
      return res
    }
  },
  components: {
    // publicInfo
  }
}
</script>

<style lang='less' scoped>
.friend-wra {
  width: 4rem;
  margin: 0.5rem auto;
}
</style>
