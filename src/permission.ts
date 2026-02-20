import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'

const userStore = useUserStore(pinia)
nprogress.configure({ showSpinner: false })
import { GET_TOKEN } from './utils/token'
router.beforeEach(async (to, from, next) => {
  nprogress.start()

  // 1. 获取 token 和用户信息
  const token = GET_TOKEN()
  const username = userStore.username

  if (token) {
    // 登录成功后，不能再去登录页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 2. 关键点：如果有 token 但没用户信息（比如刷新页面后 Pinia 重置）
      if (username) {
        next() // 有用户信息，直接放行
      } else {
        try {
          // 3. 重新获取用户信息
          await userStore.getUserInfoData()
          // 获取成功后放行。注意：如果你的路由是动态生成的，这里可能需要 next({ ...to, replace: true })
          next({ ...to, replace: true })
        } catch (error) {
          // 4. Token 失效或获取失败，清空并回登录页
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录状态
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
