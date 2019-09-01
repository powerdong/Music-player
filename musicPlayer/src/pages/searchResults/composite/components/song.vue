<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:56:42
 * @Update: 2019-09-01 21:46:38
 * @Update log: 更新日志
 -->
<template>
 <div class="container">
   <div class="title">
     <span class="title">单曲</span>
     <span class="smallTag">
       <i class="result bofang"></i>
       播放全部
     </span>
   </div>
  <ul class="song-group">
    <li class="list-item" v-for="(item, index) in songList.songs" :key="index">
      <div class="song-info">
        <p class="song-name">{{item.name}}</p>
        <p class="song-art">
          <span class="artist" v-for="(item, index) in item.ar" :key="index">
            {{ item.name }}
          </span>
        </p>
      </div>
      <div class="icon">
          <i class="result diandiandian"></i>
      </div>
    </li>
  </ul>
  <div class="more" v-if="songList.more" >
    {{songList.moreText}}<i class="result youjiantou"></i>
  </div>
 </div>
</template>

<script>
export default {
  name: '',
  props: {
    songList: {
      type: Object
    }
  },
  filters: {
    artName: function (value) {
      if (!value) return ''
      value = '/' + value
      return value
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~styles/global.less');
.container{
  margin-top: 0.26rem;
  .title{
    .flex-between();
    align-items: center;
  }
  .song-group{
    margin-top: 0.16rem;
    .list-item{
      .flex-between();
      align-items: center;
      height: 1rem;
      .song-info{
        display: flex;
        flex-direction: column;
        .song-name{
          height: 0.4rem;
          line-height: 0.4rem;
          .ellipsis();
        }
        .song-art{
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.23rem;
          color: #dacdcd;
          .artist{
            &::after{
            content: "/";
            }
            &:last-child::after{
              content: "";
            }
          }
        }
      }
      .icon{
        color: #ccc;
      }
    }
  }
  .more{
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.26rem;
    color: #ccc;
    .youjiantou{
      color: #aaa;
    }
  }
}
</style>
