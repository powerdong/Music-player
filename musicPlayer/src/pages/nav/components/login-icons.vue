<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-10-03 19:51:17
 * @Update log: 更新日志
 -->
<template>
  <div class="container border-bottom">
    <ul class="icons-wrapper">
      <!-- <li v-for="(item, index) in loginIcons" :key="index"
          :icons="item"
          is="icon"></li> -->
      <li class="icon-list" v-for="(item, index) in loginIcons" :key="index">
        <div class="icon">
          <i class="login" :class="item.icon"></i>
        </div>
        <span class="icon-text">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { loginIcons } from 'getInfos/getData'
import icon from 'base/icon'
export default {
  name: 'loginIcons',
  components: {
    icon
  },
  data () {
    return {
      loginIcons
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.loginIcons = loginIcons()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~styles/global.less');

.icons-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 0.13rem 0.5rem;
  .flex-around();
  .icon-list {
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: @iconWidth * 0.72;
      height: @iconWidth * 0.72;
      line-height: @iconWidth * 0.72;
      .login {
        font-size: 0.4rem;
        color: @bgcolor;
      }
    }
    .icon-text {
      font-size: @iconText - 0.04;
    }
  }
}
</style>
