const home = () => import('@/views/home/index')
const loginIndex = () => import('@/views/home/loginIndex')
const publish = () => import('@/views/home/publish')
const tree = () => import('@/views/tree')
const login = () => import('@/views/login/login')
const register = () => import('@/views/login/register')


const routes = [

  {
    path: '/',
    redirect: '/home'
  }, {
    // home
    path: '/home',
    name: 'home',
    component: home,
    meta: {title: '首页'}
  }, {
    // tree
    path: '/tree',
    name: 'tree',
    component: tree,
    meta: {title: 'tree'}
  }, {
    // login
    path: '/login',
    name: 'login',
    component: login,
    meta: {title: '登录'}
  }, {
    // register
    path: '/register',
    name: 'register',
    component: register,
    meta: {title: '注册'}
  }, {
    // loginIndex
    path: '/loginIndex',
    name: 'loginIndex',
    component: loginIndex,   
    meta: {title: '首页'}
  }, {
    // publish
    path: '/publish',
    name: 'publish',
    component: publish,   
    meta: {title: '发布'}
  }
]

export default routes
