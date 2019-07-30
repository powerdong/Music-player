<template>
  <div class="wrapper border-top">
    <span @click="TOGGLE_MODE">
      <i class="login" :class="{ iconyueliang1,  icontaiyang }"></i>
      <span>{{ modeText }}间模式</span>
    </span>
    <span>
      <i class="login iconshezhi"></i>
      <span>设置</span>
    </span>
    <span>
      <i class="login icondianyuan"></i>
      <span>退出</span>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'loginBottom',
  computed: {
    ...mapState(['iconyueliang1']),
    ...mapState(['icontaiyang']),
    ...mapState(['modeText'])
  },
  methods: {
    ...mapMutations(['TOGGLE_MODE'])
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  width: 6rem;
  height: 0.9rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0.2rem 0.23rem;
  position: fixed;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  .login{
    font-size: 0.4rem;
    vertical-align: -2px;
    margin-right: 0.08rem;
  }
}
</style>
