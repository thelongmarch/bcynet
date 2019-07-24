import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import state from './state'
// 使用vuex
Vue.use(Vuex)
// 将每一个数据源来出来单独放置

// 将vuex中的这几个暴露出去ES6用法
export default new Vuex.Store({
  state,
  mutations,
  actions
})
