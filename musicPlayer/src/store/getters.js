/*
 * @Author: 李浩栋
 * @Begin: 2019-08-24 11:44:49
 * @Update: 2019-09-15 12:29:49
 * @Update log: 更新日志
 */
const getters = {
  LOGIN_PAGE: state => state.loginPage,
  ICON_SUN: state => state.icontaiyang,
  ICON_NIGHT: state => state.iconyueliang1,
  MODE_TEXT: state => state.modeText,
  LOGIN_STATE: state => state.loginState,
  ACCOUNT_UID: state => state.accountUid,
  LOAD: state => state.load,
  LINK_PAGE: state => state.linkPage,
  PLAY_STATE: state => state.playState,
  FULL_SCREEN: state => state.fullScreen,
  AUDIO_LIST: state => state.audioList,
  AUDIO_ING_INDEX: state => state.audioIngIndex,
  PLAY_LIST: state => state.playList,
  MODE: state => state.mode,
  OFFSET_LYRIC: state => state.offsetLyric,
  PLAYING_SHOW: state => state.playingShow,
  AUDIO_ING_SONG: state => {
    // 返回当前播放歌曲对象的信息
    return state.playList[state.audioIngIndex] || {}
  }
}

export default getters
