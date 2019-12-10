<!--
 * @Author: Lambda
 * @Begin: 2019-10-28 13:07:27
 * @Update: 2019-12-10 18:56:39
 * @Update log: 更新日志
 -->
<template>
  <div class="dynamic">
    <div class="data-info" v-show="!dataInfo">暂时还没有动态哦</div>
    <div class="wrapper border-bottom" v-for="(item, index) in dataMsg" :key="index">
      <div class="img-info">
        <img :src="item.program.dj.avatarUrl + '?param=100y100'" alt />
      </div>
      <div class="author">
        <h1 class="nickname">
          {{item.program.dj.nickname}}
          <span class="category">发布</span>
        </h1>
        <span class="fans">{{item.program.createTime | setTime}}</span>
        <h1 class="title">{{item.msg}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { filterSetMonth } from 'utils/filters'
import api from 'api'
export default {
  name: '',
  data () {
    return {
      dataInfo: true,
      dataMsg: []
    }
  },
  props: {
    uid: {
      type: [String, Number]
    }
  },
  watch: {
    uid: function (newVal, old) {
      if (newVal === 0) {
        return
      }
      this._getUserEvent(newVal)
    },
    deep: true
  },
  filters: {
    setTime: function (val) {
      return filterSetMonth(val)
    }
  },
  methods: {
    /**
     * 获取用户动态
     */
    _getUserEvent (id) {
      api.userEventFn(id)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            if (data.events.length === 0) {
              this.dataInfo = false
              return
            }
            this.dataMsg = this.getJson(data.events)
          }
        })
    },
    getJson (arr) {
      let res = []
      arr.forEach((ele, index) => {
        res.push(JSON.parse(ele.json))
        let reason = ele.rcmdInfo ? ele.rcmdInfo.userReason : ''
        res[index].userReason = reason
        // 刚开始是使用下边这个写法。是错误的！！
        // 形成了命名冲突，但是不会报错，造成最后的key值名称不正确
        // let {userReason} = ele.rcmdInfo
        // res[i].userReason = userReason
      })
      return res
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");
.data-info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
}

@imgWidth: 5.4rem;
@imgHeight: 2.8rem;

.none {
  display: none;
}

.videotag {
  box-sizing: border-box;
  font-size: 0.2rem;
  color: #ccc;
  padding: 0.04rem 0.13rem;
}
.wrapper {
  display: flex;
  padding-bottom: 0.3rem;
  margin: 0.3rem 0;
  .img-info {
    width: 1rem;
    height: 0;
    padding-bottom: 1rem;
    margin-right: 0.2rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .author {
    flex: 1;
    line-height: 1.5;
    .nickname {
      color: #3399ea;
      .category {
        color: #7b7c7d;
      }
    }
    .fans {
      font-size: 0.2rem;
      color: #7b7c7d;
    }
    .img-content {
      width: 5.4rem;
      height: 0;
      padding-bottom: 2rem;
      img {
        width: 100%;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>
