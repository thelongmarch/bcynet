export default{
  increment (state, params) {
    // window.console.log(params)
    state.count += params
  },
  decrement (state) {
    state.count--
  },
  // 保存token
  set_token (state, Authorization) {
    // console.log('object :', Authorization.Authorization)
    state.Authorization = Authorization.Authorization
    sessionStorage.Authorization = Authorization.Authorization
  },
  // 删除token
  del_token (state) {
    state.Authorization = ''
    sessionStorage.removeItem('Authorization')
  },
  // 获取memberid
  takeid (state, memberid) {
    state.memberid = memberid
    sessionStorage.memberid = memberid
  },
  // 获取memberid
  phone (state, phoneid) {
    state.phoneid = phoneid
    sessionStorage.phoneid = phoneid
  }
}
// 创建mutations改变数据
