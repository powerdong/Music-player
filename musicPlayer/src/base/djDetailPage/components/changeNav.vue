<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-14 13:34:16
 * @Update: 2019-10-14 13:43:04
 * @Update log: 更新日志
 -->
<template>
  <div class="title">
    <div class="content">
      <span class="under-line" :class="{active: active === 'detail'}">详情</span>
    </div>
    <div class="content">
      <span class="under-line" :class="{active: active === 'program'}">节目</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    active: {
      type: String,
      default: 'program'
    }
  }
}
</script>

<style lang='less' scoped>
.under-line {
  position: relative;
  padding-bottom: 0.25rem;
}

.under-line::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #fc2f70;
  transform-origin: center;
  transform: translate(-50%, 0) scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.under-line.active::before {
  transform: translate(-50%, 0) scaleX(1);
}
.title {
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  display: flex;
  .content {
    flex: 1;
    text-align: center;
  }
}
</style>
