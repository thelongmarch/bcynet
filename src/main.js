// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入rem
// import './config/rem.js'
// 引入less公用样式


// import './styles/kctable.less'
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入状态管理
import store from './store'
// 封装引入axios
import fetch from '@/service/axios'
// 引入Vant

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import './styles/common.less'



window.Promise = require('promise')

Vue.use(ElementUI)

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$axios', { value: fetch })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
