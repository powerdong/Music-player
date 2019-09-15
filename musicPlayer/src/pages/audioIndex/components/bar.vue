<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-13 14:01:18
 * @Update: 2019-09-15 10:34:00
 * @Update log: 更新日志
 -->
<template>
  <div class="bar">
    <span>{{ time }}</span>
    <div class="bar-bg" ref="barBg" @touchstart.prevent="clickBg">
      <div class="bar-layer" :style="{width:length}">
      </div>
      <div class="point"
        :style="{left:length}"
        @touchstart.prevent="start"
        @touchmove.prevent="move"
        @touchend="end"></div>
      </div>
    <span>{{ allTime | setTime }}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      length,
      touch: {}
    }
  },
  props: {
    allTime: {
      type: Number
    },
    time: {
      type: String
    },
    width: {
      type: Number
    }
  },
  watch: {
    time: function (val) {
      return val
    },
    width: function (val) {
      if (val && !this.touch.state) {
        val = val + '%'
        this.length = val
      }
    }
  },
  methods: {
    /**
     * 点击小圆点
     */
    start (e) {
      this.touch.state = true
      const left = this.$refs.barBg.offsetLeft
      this.touch.startX = e.changedTouches[0].pageX - left
      this.touch.width = this.$refs.barBg.clientWidth
    },
    clickBg (e) {
      this.touch.width = this.$refs.barBg.clientWidth
      const left = this.$refs.barBg.offsetLeft
      this.touch.endX = e.changedTouches[0].pageX - left
      const offsetWidth = this.touch.endX / this.touch.width * 100
      this._changeWidth(offsetWidth)
      this.$emit('time', offsetWidth)
    },
    move (e) {
      if (!this.touch.state) {
        return
      }
      const left = this.$refs.barBg.offsetLeft
      const deltaX = e.changedTouches[0].pageX - left
      const width = Math.min(Math.max(0, deltaX), this.touch.width)
      this.touch.offsetWidth = width / this.touch.width * 100
      this._changeWidth(this.touch.offsetWidth)
    },
    _changeWidth (val) {
      this.length = val + '%'
    },
    end () {
      this.touch.state = false
      this.$emit('time', this.touch.offsetWidth)
    }
  },
  filters: {
    /**
     * 将毫秒数转换为正常的时间
     *  212245 ==> 03:32
    */
    setTime: function (value) {
      if (!value) return ''
      let min = parseInt(value / (1000 * 60))
      if (min < 10) {
        min = '0' + min
      }
      let sec = parseInt(value % (1000 * 60) / 1000)
      if (sec < 10) {
        sec = '0' + sec
      }
      value = `${min}:${sec}`
      return value
    }
  }
}
</script>

<style lang='less' scoped>
.bar {
  margin: 0.6rem 0;
  display: flex;
  align-items: center;
  color: #bdc3c7;
  font-size: 0.2rem;
  .bar-bg {
    width: 100%;
    margin: 0 0.16rem;
    height: 2px;
    background-color: #95a5a6;
    position: relative;
    .bar-layer {
      height: 2px;
      background-color: #ecf0f1;
    }
    .point {
      position: absolute;
      top: -3px;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background-color: #ecf0f1;
    }
  }
}
</style>
