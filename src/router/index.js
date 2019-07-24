import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './router.config'
import { setWechatTitle } from '../utils/utils'

Vue.use(Router)
// 将token存入到路由中
if (sessionStorage.getItem('Authorization')) {
  store.commit('set_token', sessionStorage.getItem('Authorization'))
}

const routter = new Router({

  // mode: 'history',
  base: '/dist/',
  routes
})

routter.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.Authorization) {
      next()
    } else {
      next({
        path: '/index'
      })
    }
  } else {
    setWechatTitle(to.meta.title)
    // console.log('to.meta.title :', to.meta.title)
    next()
  }
})

export default routter
