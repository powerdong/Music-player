<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-30 12:05:38
 * @Update: 2019-08-30 13:40:34
 * @Update log: 更新日志
 -->
<template>
 <div>
   搜索结果展示
    <el-tag type="info" hit=false effect="plain" >标签二</el-tag>
    <el-button type="info"  circle>我的</el-button>
    <div type="submit" class="btn button">提交</div>
 </div>
</template>

<script>
import api from 'api'
export default {
  name: 'searchResults',
  data () {
    return {
      key: ''
    }
  },
  created () {
    this.key = this.$route.params.id
    this.searchShow(this.key)
  },
  methods: {
    /**
     * 通过获取到的 id 就是动态的搜索关键字
     * 来获取数据，返回到页面
     */
    searchShow (key) {
      api.searchFn(key)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            console.log(data)
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.el-button--info{
  background: #fff;
  color: #000
}
.btn{
  width: 100px;
  height: 50px;
}
.button{
    position: relative;
    overflow: hidden;
    user-select: none;
}
.button:after{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
     //设置径向渐变
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}
.button:active:after{
    transform: scale(0, 0);
    opacity: .3;
    //设置初始状态
    transition: 0s;
}
</style>
