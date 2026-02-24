import { defineStore } from 'pinia'
import { login, getUserInfo, loginOut } from '@/api/user'
import type {
  LoginData,
  loginResponseData,
  userInfoResponseData,
  ResponseData,
} from '@/api/type'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import asyncRouterMap from '@/router/router'
import type { UserState } from './types/types'
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: GET_TOKEN(),
    menuRoutes: asyncRouterMap,
    username: '',
    avatar: '',
  }),
  actions: {
    async userLogin(data: LoginData) {
      let res: loginResponseData = await login(data)
      if (res.code == 200) {
        this.token = res.data as string
        SET_TOKEN(res.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async getUserInfoData() {
      // TODO: 获取用户信息
      let res: userInfoResponseData = await getUserInfo()
      if (res.code == 200) {
        this.username = res.data.name as string
        this.avatar = res.data.avatar as string
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogout() {
      try {
        // 1. 尝试通知后端退出（不管它成不成功）
        await loginOut()
      } catch (error) {
        // 2. 如果后端没起、网络断开或者 Token 已失效，会走到这里
        console.warn('后端登出接口调用失败，直接执行本地登出', error)
      } finally {
        // 3. 核心大招：无论 try 成功了，还是 catch 报错了，finally 里的代码【绝对会执行】！
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN() // 强制物理拔除 Token！
      }
    },
  },
  getters: {},
})

export default useUserStore
