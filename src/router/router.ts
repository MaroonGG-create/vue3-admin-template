

const asyncRouterMap =[
  {
    path: '/login',
    name: '登录页',
    component: () => import( '@/views/login/index.vue'),
  },
  {
    path: '/',
    name: '首页',
    component: () => import( '@/views/home/index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]

export default asyncRouterMap