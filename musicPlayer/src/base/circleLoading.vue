<!--
 * @Author: Lambda
 * @Begin: 2019-11-04 13:58:11
 * @Update: 2019-11-04 14:14:36
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper" v-show="load" :class="{absolute: type === 'absolute' }">
    <svg viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" />
    </svg>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      load: false
    }
  },
  props: {
    type: {
      type: String
    }
  },
  methods: {
    block () {
      this.load = true
    },
    none () {
      this.load = false
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  top: 0;
  display: flex;
  justify-content: center;
  width: 6.7rem;
  height: 3.8rem;
  &.absolute {
    position: absolute;
    z-index: 5
  }
}
svg {
  width: 3.75em;
  transform-origin: center;
  animation: rotate 2s linear infinite;
}

circle {
  fill: none;
  stroke: #7b7c7d;
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
