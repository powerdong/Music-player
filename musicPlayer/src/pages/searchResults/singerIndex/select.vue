<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-10 12:40:09
 * @Update: 2019-11-03 13:59:40
 * @Update log: 这是一个歌手分类页面的选择组件
  通过点击第一列和第二列进行不同的数据渲染
  默认是华语 + 男
  点击时传入id
 -->
<template>
  <div>
    <ul class="list-wrap">
      <li
        class="list-item"
        :class="{active : item.id === _firstId }"
        v-for="(item) in firstList"
        :key="item.id"
        @click="selectFirst(item.id)"
      >{{item.text}}</li>
    </ul>
    <ul class="list-wrap">
      <li
        class="list-item"
        :class="{active : item.id === _secondId }"
        v-for="(item) in secondList"
        :key="item.id"
        @click="selectSecond(item.id)"
      >{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    firstList: {
      type: Array
    },
    secondList: {
      type: Array
    },
    firstId: {
      type: String
    },
    secondId: {
      type: String
    }
  },
  computed: {
    /**
     * 定义子组件可以进行获取和修改的值
     */
    _firstId: {
      get () {
        return this.firstId
      },
      /**
       * 通过提出事件父组件进行更新，将更新后的数据返回给子组件
       */
      set (val) {
        this.$emit('update_firstID', val)
      }
    },
    _secondId: {
      get () {
        return this.secondId
      },
      set (val) {
        this.$emit('update_secondID', val)
      }
    }
  },
  methods: {
    selectFirst (id) {
      this._firstId = id
    },
    selectSecond (id) {
      this._secondId = id
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.list-wrap {
  display: flex;
  padding: 0.2rem 0;
  // margin: 0.3rem 0;
  .list-item {
    margin-right: 0.4rem;
  }
}
.active {
  color: @bgcolor;
}
</style>
