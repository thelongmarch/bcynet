export default{
  increment: ({commit}, params) => {
    commit('increment', params)
  },
  decrement: ({commit}) => {
    commit('decrement')
  }
}
// 创建数据改变的事件actions
