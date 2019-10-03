<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-05 09:21:33
 * @Update: 2019-10-03 20:01:31
 * @Update log: 搜索展示页如果没有搜索结果展示的信息页面
 -->
<template>
  <div v-if="info" class="info">未找到与"{{keywords}}"相关的内容</div>
</template>

<script>
export default {
  name: '',
  props: {
    info: {
      type: Boolean,
      default: false
    },
    keywords: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>
.info {
  text-align: center;
  line-height: 1rem;
}
</style>
