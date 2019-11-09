<!--
 * @Author: Lambda
 * @Begin: 2019-11-09 08:32:08
 * @Update: 2019-11-09 09:32:15
 * @Update log: 更新日志
 -->
<template>
  <div class="container" v-show="_isShow">
    <div class="mask" @click="hideCon"></div>
    <ul class="list-wra">
      <li class="list-item">回复评论</li>
      <li class="list-item">分享评论</li>
      <li class="list-item">复制评论</li>
      <li class="list-item" v-if="!user">举报评论</li>
      <li class="list-item" v-if="user" @click="delCom">删除评论</li>
    </ul>
  </div>
</template>

<script>
import Bus from '@/assets/Bus'

export default {
  name: '',
  data () {
    return {
      user: false,
      comId: 0
    }
  },
  props: {
    isShow: {
      type: Boolean
    }
  },
  created () {
    Bus.$on('user', content => {
      this.user = content
    })
    Bus.$on('comId', content => {
      this.comId = content
    })
  },
  computed: {
    _isShow: {
      get () {
        return this.isShow
      },
      set (val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    hideCon () {
      this._isShow = false
    },
    delCom () {
      this.$emit('delCom', this.comId)
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.container {
  position: fixed;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
// 这里给ul设置border-radius无效
// 所以通过给第一个li元素和最后一个元素设置圆角，形成对应的形状
.list-wra {
  width: 6rem;
  height: auto;
  background: maroon;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.2rem;
  z-index: 11;
  .list-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.8rem;
    box-sizing: border-box;
    padding: 0.2rem;
    background-color: #fff;
    &:first-child {
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
    }
    &:last-child {
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
}
</style>
