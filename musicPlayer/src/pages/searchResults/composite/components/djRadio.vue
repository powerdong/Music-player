<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:58:24
 * @Update: 2019-09-03 10:50:45
 * @Update log: 更新日志
 -->
<template>
 <list-global title="电台"
              :more="djRadio.more"
              :moreText="djRadio.moreText"
              linkPage="djRadio"
            :keyW="keyword">
  <list-con v-for="(item, index) in djRadio.djRadios"
            :key="index"
            :dj="true"
            :ImgUrl="item.picUrl"
            :name="item.name"
            :nicknames="item.dj"></list-con>
 </list-global>
</template>

<script>
import listGlobal from 'base/titleFooter'
import listCon from 'base/interchangeable'

export default {
  name: '',
  props: {
    djRadio: {
      type: Object
    },
    keyword: {
      type: String
    }
  },
  components: {
    listGlobal,
    listCon
  }
}
</script>

<style lang='less' scoped>

</style>
