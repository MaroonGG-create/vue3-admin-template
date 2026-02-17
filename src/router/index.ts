import { createRouter, createWebHashHistory } from 'vue-router'
import asyncRouterMap from './router'
let router = createRouter({
  history: createWebHashHistory(),
  routes: asyncRouterMap,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router