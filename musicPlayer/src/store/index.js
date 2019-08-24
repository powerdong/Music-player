/*
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-08-24 11:47:05
 * @Update log: 更新日志
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
