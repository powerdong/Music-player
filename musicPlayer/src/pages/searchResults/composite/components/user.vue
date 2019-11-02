<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-31 10:58:35
 * @Update: 2019-11-02 12:48:36
 * @Update log: 更新日志
 -->
<template>
  <list-global
    title="用户"
    :more="user.more"
    :moreText="user.moreText"
    linkPage="user"
    :keyW="keyword"
  >
    <list-con
      v-for="(item, index) in user"
      :key="index"
      :circle="true"
      :ImgUrl="item.avatarUrl"
      :name="item.nickname"
      :gender="item.gender"
      :nickname="item.signature"
      line="one"
      maxWidth="4.7rem"
    ></list-con>
  </list-global>
</template>

<script>
import listGlobal from 'base/titleFooter'
import listCon from 'base/interchangeable'

export default {
  name: '',
  props: {
    user: {
      type: Array
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
