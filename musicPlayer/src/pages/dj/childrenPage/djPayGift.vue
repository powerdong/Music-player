<!--
 * @Author: 李浩栋
 * @Begin: 2019-10-13 10:59:26
 * @Update: 2019-10-18 11:19:53
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <general-nav @returnPage="returnPage">
      <span class="text">付费精品</span>
    </general-nav>
    <div v-show="!loading">
      <div class="card" v-for="(item, index) in djPayGiftData" :key="index">
        <div class="img-info">
          <img :src="item.picUrl + '?param=200y200'" alt />
        </div>
        <div class="content">
          <h1 class="name">{{item.name}}</h1>
          <div class="detail">
            <p class="dec-text">{{item.rcmdText}}</p>
            <p class="new">最新上架</p>
          </div>
          <p class="price">￥ {{item.originalPrice | price}}</p>
        </div>
      </div>
    </div>
    <page-loading v-show="loading"></page-loading>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import pageLoading from 'base/pageLoading'

import api from 'api'
export default {
  name: '',
  data () {
    return {
      djPayGiftData: [],
      loading: true
    }
  },
  filters: {
    price: function (val) {
      if (val) {
        return parseInt(val / 100)
      }
    }
  },
  created () {
    this._getDjPayGiftInfo()
  },
  methods: {
    _getDjPayGiftInfo (limit, offset) {
      api.djPayGiftFn(limit, offset)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.djPayGiftData = data.data.list
            this.loading = false
          }
        })
    },
    returnPage () {
      this.$router.go(-1)
    }
  },
  components: {
    generalNav,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");

.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
    width: 8rem;
    .ellipsis();
  }
  .card {
    height: 2rem;
    margin: 0.2rem 0;
    display: flex;
    .img-info {
      width: 2rem;
      height: 0;
      padding-bottom: 2rem;
      margin-right: 0.2rem;
      img {
        border-radius: @imgBorderRadius;
        width: 2rem;
        height: 2rem;
      }
    }
    .content {
      width: 4.7rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        font-weight: 700;
        .ellipsis();
      }
      .detail {
        color: #aaa;
        font-size: 0.24rem;
        margin: 0.2rem 0;
        line-height: 1.5;
        .dec-text {
          .ellipsis();
        }
      }
      .price {
        color: @bgcolor;
      }
    }
  }
}
</style>
