<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-27 13:29:51
 * @Update: 2019-08-28 12:29:49
 * @Update log: 更新日志
 -->
<template>
 <div class="history pd23">
   <div class="history-title">
     <span>历史记录</span>
     <i class="search iconlajitong"></i>
   </div>
   <div class="wrapper">
    <div class="container ">
      <ul class="icons-group">
        <li class="icon-list">莫甘娜后只
        </li>
        <li class="icon-list">莫甘娜后只
        </li>
        <li class="icon-list">莫甘娜
        </li>
        <li class="icon-list">莫后只
        </li>
        <li class="icon-list">莫
        </li>
        <li class="icon-list">莫甘娜后只
        </li>
      </ul>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'history'
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.history{
  margin-top: 0.7rem;
  .history-title{
    .flex-between();
    height: 0.8rem;
    line-height: 0.8rem;
    .search{
      font-size: 0.4rem
    }
  }
  .wrapper {
    box-sizing: border-box;
    overflow: hidden;
    height: 0.5rem;
    // 定义可左右滑动的图标组
    .container {
      // 横向滚动条
      overflow-x: scroll;
      .icons-group {
        // flex布局 溢出不换行
        height: 0.5rem;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        white-space: nowrap;
        width: auto;
        min-width: 100%;
        .icon-list {
          height: 100%;
          box-sizing: border-box;
          padding: 0.13rem;
          font-size: small;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          border-radius: 0.3rem;
          background: #eee;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
