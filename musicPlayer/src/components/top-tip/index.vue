<!--
 * @Author: Lambda
 * @Begin: 2019-11-24 11:11:37
 * @Update: 2019-11-24 12:19:31
 * @Update log: 更新日志
 -->
<template>
  <transition name="tip-show" mode="out-in">
    <div class="tip" v-show="isTip">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
let timer = null
export default {
  name: '',
  data () {
    return {
      isTip: false
    }
  },
  methods: {
    showTip () {
      this.isTip = true
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.hideTip()
      }, 3000)
    },
    hideTip () {
      this.isTip = false
    }
  }
}
</script>

<style lang='less' scoped>
.tip-show-enter,
.tip-show-leave-to {
  transform: translateY(-1rem);
}

.tip-show-enter-active,
.tip-show-leave-active {
  transition: transform linear 0.3s;
}
.tip {
  position: fixed;
  top: 1.2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
</style>
