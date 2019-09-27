<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-26 13:09:11
 * @Update: 2019-09-27 21:07:47
 * @Update log: 更新日志
 -->
<template>
  <div class="middle">
    <div class="mask" v-show="isShow" @click="hide"></div>
    <div class="addInfo pd23" v-show="isShow">
      <h1 class="title">新建歌单</h1>
      <div class="inp">
        <input
          class="playlistName"
          type="text"
          placeholder="请输入歌单标题"
          ref="inp"
          autofocus="autofocus"
          v-model.trim="playListName"
        />
        <i v-show="playListName" @click="clearInp" class="search search-guanbi"></i>
      </div>
      <div class="line">
        <el-checkbox v-model="checked">设置为隐私歌单</el-checkbox>
        <span class="length">{{ playListName.length }}/40</span>
      </div>
      <div class="button">
        <el-button type="text" @click="hide">取消</el-button>
        <el-button type="text" :disabled="!playListName" @click="pushNewPlaylist">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
export default {
  data () {
    return {
      isShow: false,
      playListName: '',
      checked: false
    }
  },
  created () {
    this.changeFocus()
  },
  methods: {
    open () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    },
    open2 () {
      this.$message({
        message: '成功添加歌单,请2分钟后刷新查看',
        type: 'success'
      })
    },
    /**
     * 添加歌单
     * 如果隐私选框选中则checked为true，设置 privacy 值为 10
     * 点击确定按钮提交数据
     * 隐藏弹框
     */
    pushNewPlaylist () {
      let privacy
      if (this.checked) {
        privacy = 10
      }
      api.addPlaylistFn(this.playListName, privacy)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.open2()
            this.clearInp()
            this.hide()
          }
        }).catch(err => {
          console.log(err)
        })
    },
    changeFocus () {
      this.$nextTick(x => {
        this.$refs.inp.focus()
      })
    },
    clearInp () {
      this.playListName = ''
    }
  }
}
</script>

<style lang="less">
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1436508_eifw3uhnvb.css");

.addInfo {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 11;
  transform: translate3d(-50%, -50%, 0);
  width: 90vw;
  height: 3.3rem;
  background-color: #fff;
  border-radius: 0.2rem;
  .title {
    margin-top: 0.33rem;
    font-weight: 700;
  }
  .inp {
    position: relative;
    .playlistName {
      margin-top: 0.3rem;
      padding: 0.1rem 0;
      width: 5.5rem;
      border-bottom: 1px solid #999;
    }
    .search-guanbi {
      position: absolute;
      bottom: 0.1rem;
      right: 0.1rem;
    }
  }
  .line {
    margin-top: 0.1rem;
    .flex-between();
  }
  .button {
    margin-top: 0.2rem;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
