<!--
 * @Author: Lambda
 * @Begin: 2019-11-04 13:58:11
 * @Update: 2019-11-07 19:55:14
 * @Update log: 更新日志
 -->
<template>
  <div
    class="circle-load"
    :style="{width, height}"
    v-show="load"
    :class="{absolute: type === 'absolute' }"
  >
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
    },
    width: {
      type: String
    },
    height: {
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
.circle-load {
  top: 0;
  display: flex;
  justify-content: center;
  &.absolute {
    position: absolute;
    z-index: 5;
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
