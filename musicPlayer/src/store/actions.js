/*
 * @Author: 李浩栋
 * @Begin: 2019-09-12 14:11:33
 * @Update: 2019-09-12 14:30:19
 * @Update log: 更新日志
 */
import {
  SET_PLAY_SATE,
  SET_FULL_SCREEN,
  SET_AUDIO_LIST,
  SET_AUDIO_INDEX
} from './mutation-types'

export default {
  selectPlay ({commit, state}, {list, index}) {
    console.log(list)
    commit(SET_AUDIO_LIST, list)
    commit(SET_AUDIO_INDEX, index)
    commit(SET_PLAY_SATE, true)
    commit(SET_FULL_SCREEN, true)
  }
}
