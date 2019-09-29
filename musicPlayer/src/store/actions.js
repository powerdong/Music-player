/*
 * @Author: 李浩栋
 * @Begin: 2019-09-12 14:11:33
 * @Update: 2019-09-22 12:15:54
 * @Update log: 更新日志
 */
import {
  SET_PLAY_SATE,
  SET_FULL_SCREEN,
  SET_AUDIO_LIST,
  SET_AUDIO_INDEX,
  SET_AUDIO_MODE,
  SET_PLAY_LIST
} from './mutation-types'

/**
 * 获取随机值
 */
function getRandomIndex (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * 打乱一个数组
 */
function shuffle (arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomIndex(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function findIndex (list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default {
  /**
   * 点击歌曲项进行播放
   */
  selectPlay ({
    commit,
    state
  }, {
    list,
    index
  }) {
    commit(SET_AUDIO_LIST, list)
    if (state.mode === 2) {
      const randomList = shuffle(list)
      commit(SET_PLAY_LIST, randomList)
      index = findIndex(randomList, state.audioList[index])
    } else {
      commit(SET_PLAY_LIST, list)
    }
    commit(SET_AUDIO_INDEX, index)
    commit(SET_PLAY_SATE, true)
    commit(SET_FULL_SCREEN, true)
  },
  /**
   * 播放全部
   * 传入播放列表
   */
  startPlayAll ({
    commit
  }, {
    list
  }) {
    commit(SET_AUDIO_LIST, list)
    commit(SET_AUDIO_INDEX, 0)
    commit(SET_PLAY_LIST, list)
    commit(SET_PLAY_SATE, true)
    commit(SET_FULL_SCREEN, true)
    commit(SET_AUDIO_MODE, 0)
  },
  /**
   * 向播放列表添加歌曲
   * 当播放列表为空时添加后开始播放
   */
  addToAudioList ({
    commit,
    state
  }, song) {
    let audioList = state.audioList
    let playList = state.playList
    let currentIndex = state.audioIngIndex
    // 记录当前歌曲
    let audioIng = audioList[currentIndex]
    // 查找当前列表中是否有要插入的歌曲,并返回它的索引
    let findAudioIndex = findIndex(audioList, song)
    // 因为是插入歌曲，所以索引要+1
    currentIndex++
    // 插入这首歌到当前索引位置
    audioList.splice(currentIndex, 0, song)
    // 如果已经有了这首歌
    if (findAudioIndex > -1) {
      // 如果当前插入序号大于列表中的序号
      if (currentIndex > findAudioIndex) {
        audioList.splice(findAudioIndex, 1)
        currentIndex--
      } else {
        audioList.splice(currentIndex + 1, 1)
      }
    }

    let currentPlayIndex = findIndex(playList, audioIng) + 1

    let findPlayIndex = findIndex(playList, song)

    playList.splice(currentPlayIndex, 0, song)

    if (findPlayIndex > -1) {
      if (currentPlayIndex > findPlayIndex) {
        playList.splice(findPlayIndex, 1)
      } else {
        playList.splice(findPlayIndex + 1, 1)
      }
    }
    commit(SET_AUDIO_INDEX, currentIndex)
    commit(SET_PLAY_SATE, true)
  },
  deleteSong ({
    commit,
    state
  }, song) {
    let audioList = state.audioList.slice()
    let playList = state.playList.slice()
    let currentIndex = state.audioIngIndex
    // 删除的歌曲是当前播放歌曲之前
    let pIndex = findIndex(audioList, song)
    audioList.splice(pIndex, 1)
    // 删除的歌曲是当前歌曲之后
    let sIndex = findIndex(playList, song)
    playList.splice(sIndex, 1)

    if (currentIndex > pIndex || currentIndex === audioList.length) {
      currentIndex--
    }

    commit(SET_AUDIO_LIST, audioList)
    commit(SET_PLAY_LIST, playList)
    commit(SET_AUDIO_INDEX, currentIndex)

    if (!audioList.length) {
      commit(SET_PLAY_SATE, false)
    }
  }
}
