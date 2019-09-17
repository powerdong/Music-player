<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-13 13:33:12
 * @Update: 2019-09-17 10:56:02
 * @Update log: 更新日志
 -->
<template>
 <div class="wrapper">
   <i class="audio audioshoucang1"></i>
   <i class="audio audioxiazai"></i>
   <i class="audio audiocaidan"></i>
 </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang='less' scoped>
.wrapper{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .pinglun{
    position: relative;
    .com-num{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0.24rem;
      padding: 0.03rem;
      box-sizing: border-box;
      background-color: #7f8c8d;
      color: #bdc3c7;
    }
  }
  .audio{
    font-size: 0.5rem;
    color: #bdc3c7;
    &.audio-shoucang{
      color:#e74c3c;
    }
  }
}
</style>
