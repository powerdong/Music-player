<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-27 12:49:09
 * @Update: 2019-09-27 13:56:23
 * @Update log: 更新日志
 -->
<template>
  <div>
    <el-button @click="showSlider">点我打开</el-button>

    <el-drawer
      title="我是标题"
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
      size="60%"
      :before-close="handleClose"
    >
      <p>测试</p>
      <p>测试</p>
      <p>测试</p>
      <p>测试</p>
      <p>测试</p>
      <p>测试</p>
      <p>测试</p>
      <p>测试</p>
      <p>测试</p>
      <span @click="deleteItem">我来啦!</span>
      <span>我来啦!</span>
      <span>我来啦!</span>
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      direction: 'btt'
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    /**
     * 删除此项
     */
    deleteItem () {
      this.$confirm('确认关闭？')
        .then(_ => {
        })
        .catch(_ => { })
    },
    showSlider () {
      this.drawer = true
    }
  }
}
</script>

<style lang="less">
@import url("~styles/global");
</style>
