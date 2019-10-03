<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-17 17:10:07
 * @Update: 2019-08-17 18:46:40
 * @Update log: 页面加载样式
 -->
<template>
  <div>
    <transition>
      <div class="loading" v-show="isLoading">
        <p></p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    isLoading: {
      type: Boolean
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
.loading {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.13rem;
  font-size: smaller;
  border-radius: 8px;
  p {
    width: 50px;
    height: 50px;
    border: 3px solid #ccc;
    border-top-color: #666;
    border-radius: 50%;
    margin: 0 auto;
    animation: rotate 1s linear infinite;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
