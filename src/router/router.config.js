const demo = () => import('@/views/demo')
const tree = () => import('@/views/tree')
const dataDic = () => import('@/views/dataDic')

const routes = [

  {
    path: '/',
    redirect: '/dataDic'
  }, {
    // demo
    path: '/demo',
    name: 'demo',
    component: demo,
    meta: {title: '测试页面'}
  }, {
    // tree
    path: '/tree',
    name: 'tree',
    component: tree,
    meta: {title: 'tree'}
  }, {
    // dataDic
    path: '/dataDic',
    name: 'dataDic',
    component: dataDic,
    meta: {title: '字典管理'}
  }
]

export default routes
