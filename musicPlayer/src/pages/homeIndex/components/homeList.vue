<template>
  <div class="container pd13">
    <ul>
      <li v-for="(item, index) in homeList" :key="index" class="list-item">
        <i class="iconfont" :class="item.icon"></i>
        <div class="border-bottom wrapper">
          <span class="list-content">{{item.text}}</span>
          <span class="num">({{item.num}})</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "homeList",
  computed: {
    ...mapState(["homeList"])
  }
}
</script>

<style lang="less" scoped>
@import url("https://at.alicdn.com/t/font_1306085_nryhea053g.css");
.list-item {
  display: flex;
  justify-content: space-between;
  margin: 0.1rem 0;
  height: 0.76rem;
  line-height: 0.76rem;
  &:last-child .wrapper::before {
    border: none;
  }
  .wrapper {
    flex: 1;
    .num {
      font-size: smaller;
      margin-left: 0.2rem;
      color: #ccc;
    }
  }
  .iconfont {
    font-size: 0.5rem;
    margin: 0 0.4rem;
  }
}
</style>
