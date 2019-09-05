<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:58:35
 * @Update: 2019-09-03 11:13:51
 * @Update log: 更新日志
 -->
<template>
 <list-global title="用户"
              :more="user.more"
              :moreText="user.moreText"
              linkPage="user"
            :keyW="keyword">
  <list-con v-for="(item, index) in user.users"
            :key="index"
            :circle="true"
            :ImgUrl="item.avatarUrl"
            :name="item.nickname"
            :gender="item.gender"
            :nickname="item.signature"></list-con>
 </list-global>
</template>

<script>
import listGlobal from 'base/titleFooter'
import listCon from 'base/interchangeable'

export default {
  name: '',
  props: {
    user: {
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
