const home = () => import('@/views/home/index')
const tree = () => import('@/views/tree')
const login = () => import('@/views/login/login')
const register = () => import('@/views/login/register')


const routes = [

  {
    path: '/',
    redirect: '/login'
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
  }
]

export default routes
