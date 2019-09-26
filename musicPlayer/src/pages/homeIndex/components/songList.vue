<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-09-26 13:26:48
 * @Update log: 更新日志
 -->
<template>
  <div class="container pd13">
    <div class="wrapper-title">
      <div class="left-title">
        <i class="home iconarrow"></i>
        <span class="title">创建的歌单</span>
        <span class="num">({{index.createNum}})</span>
      </div>
      <div class="right-title">
        <!-- 点击添加按钮显示新建歌单 -->
        <i class="home iconincrease" @click="showAddNewPlayList"></i>
        <i class="home icondiandiandian"></i>
      </div>
    </div>
    <ul class="song-group">
      <!-- 没登录的情况下会有我喜欢的音乐列表项显示 -->
      <li class="song-list" v-if="!myLoveList.length">
        <div class="list-cover">
          <i class="home iconxin"></i>
        </div>
        <div class="list-info">
          <p class="list-title">我喜欢的音乐</p>
          <p class="list-num">0首</p>
        </div>
        <div class="heart">
          <span class="heart-text">
            <i class="home iconxintiao"></i>心动模式
          </span>
        </div>
      </li>
      <!-- 登录后的歌单项显示 -->
      <li class="song-list" v-for="(item, index) in myLoveList" :key="index">
        <router-link class="cover" :to="'/albumPage/'+item.id"></router-link>
        <div class="list-img">
          <img :src="item.coverImgUrl" />
        </div>
        <div class="list-info">
          <p class="list-title">{{ item.name | setName}}</p>
          <p class="list-num">{{item.trackCount}}首</p>
        </div>
        <div class="heart">
          <span class="heart-text">
            <i class="home iconxintiao"></i>心动模式
          </span>
        </div>
      </li>
      <!-- Duplicate keys detected: '0'. This may cause an update error -->
      <!-- key 值重复 -->
      <li class="song-list" v-for="(item, index) in createList" :key="index + 1">
        <router-link class="cover" :to="'/albumPage/'+item.id"></router-link>
        <div class="list-img">
          <img :src="item.coverImgUrl" />
        </div>
        <div class="list-info">
          <p class="list-title">{{ item.name}}</p>
          <p class="list-num">{{item.trackCount}}首</p>
        </div>
        <div class="heart">
          <i class="home icondiandiandian"></i>
        </div>
      </li>
    </ul>
    <div class="wrapper-title" v-if="index.favoritesNum">
      <div class="left-title">
        <i class="home iconarrow"></i>
        <span class="title">收藏的歌单</span>
        <span class="num">({{index.favoritesNum}})</span>
      </div>
      <div class="right-title">
        <i class="home iconincrease"></i>
        <i class="home icondiandiandian"></i>
      </div>
    </div>
    <ul class="song-group">
      <li class="song-list" v-for="(item, index) in favoritesList" :key="index">
        <router-link class="cover" :to="'/albumPage/'+item.id"></router-link>
        <div class="list-img">
          <img :src="item.coverImgUrl" />
        </div>
        <div class="list-info">
          <p class="list-title">{{ item.name}}</p>
          <p class="list-num">
            {{item.trackCount}}首
            <span class="nickname">by {{item.creator.nickname}}</span>
          </p>
        </div>
        <div class="heart">
          <i class="home icondiandiandian"></i>
        </div>
      </li>
    </ul>
    <add-new-playlist ref="addNewPlaylist"></add-new-playlist>
  </div>
</template>

<script>
import api from 'api'
import addNewPlaylist from './addNewPlayList'
export default {
  name: 'songList',
  data () {
    return {
      // 收藏歌单详情
      favoritesList: [],
      // 创建歌单详情
      createList: [],
      // 我的喜欢歌单
      myLoveList: []
    }
  },
  // 使用筛选功能，将列表中的 我喜欢的音乐 标题正确渲染
  filters: {
    setName: function (value) {
      let reg = new RegExp(/喜欢的音乐$/)
      if (reg.test(value)) {
        value = '我喜欢的音乐'
      }
      return value
      // value = value.toString()
      // return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  props: ['index'],
  mounted () {
    this.favoritesIndex = this.index.favoritesNum
    this.createIndex = this.index.createNum
    this.getPlaylist(this.$store.state.accountUid)
  },
  watch: {
    index: {
      deep: true,
      handler (val, oldVal) {
        this.createIndex = val.createNum
        this.favoritesIndex = val.favoritesNum
        this.getPlaylist(this.$store.state.accountUid)
      }
    }
  },
  methods: {
    showAddNewPlayList () {
      this.$refs.addNewPlaylist.open()
    },
    /**
     * 获取用户歌单
     */
    getPlaylist (id) {
      api.playlistFn(id).then(res => {
        let data = res.data
        if (data.code === 200) {
          this.sliceInfo(data.playlist)
        }
      })
    },
    /**
     * 得到数组，分割赋值
     * 根据传入的 index 值分割总歌单数组
     * @param {Array} arr
     */
    sliceInfo (arr) {
      let from = this.createIndex
      let len = this.createIndex + this.favoritesIndex
      this.createList = arr.slice(0, from)
      this.myLoveList = this.createList.slice(0, 1)
      this.createList = this.createList.slice(1)
      this.favoritesList = arr.slice(from, len)
    }
  },
  components: {
    addNewPlaylist
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

@listHeight: 0.8rem;

.wrapper-title {
  width: 100%;
  height: @listHeight;
  line-height: @listHeight;
  .flex-between();
  .left-title {
    .title {
      font-size: 0.32rem;
      font-weight: 700;
    }
    .num {
      .num();
    }
  }
  .right-title {
    .icondiandiandian {
      margin-left: 0.13rem;
    }
  }
}
.song-group {
  .song-list {
    width: 100%;
    height: @listHeight;
    margin: 0.16rem 0;
    .flex-between();
    .ripple();
    .list-cover {
      border-radius: @imgBorderRadius;
      width: @listHeight;
      height: @listHeight;
      line-height: @listHeight;
      text-align: center;
      margin-right: 0.3rem;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.8);
      .iconxin {
        font-size: 0.5rem;
        color: #fff;
      }
    }
    .list-img {
      border-radius: @imgBorderRadius;
      width: @listHeight;
      height: @listHeight;
      line-height: @listHeight;
      text-align: center;
      margin-right: 0.3rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .list-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .list-title {
        font-size: small;
      }
      .list-num {
        margin-top: 0.13rem;
        font-size: 0.2rem;
        color: #ccc;
        .nickname {
          margin-left: 0.2rem;
        }
      }
    }
    .heart {
      width: 2rem;
      height: @listHeight;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icondiandiandian {
        color: rgba(0, 0, 0, 0.5);
      }
      .heart-text {
        .smallTag();
        .iconxintiao {
          font-size: 0.2rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
