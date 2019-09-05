<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:57:13
 * @Update: 2019-09-03 12:38:58
 * @Update log: 更新日志
 -->
<template>
<list-global title="视频"
            :more="videoList.more"
            :moreText="videoList.moreText"
            linkPage="video"
            :keyW="keyword">
<list-con  :videoList="true"
              v-for="(item, index) in videoList.videos"
              :key="index"
              :ImgUrl="item.coverUrl"
              :name="item.title"
              :durationms="item.durationms"
              :nicknames="item.creator"
              :playTime="item.playTime"
              ></list-con>
</list-global>
</template>

<script>
import listCon from 'base/interchangeable'
import listGlobal from 'base/titleFooter'

export default {
  name: '',
  components: {
    listCon,
    listGlobal
  },
  props: {
    videoList: {
      type: Object
    },
    keyword: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>
.video-list{
  margin-top: 0.26rem;
  .title{
    height: 0.3rem;
      line-height: 0.3rem;
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
