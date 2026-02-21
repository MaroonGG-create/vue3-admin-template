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
      let res: ResponseData = await loginOut()
      if (res.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
      }
    },
  },
  getters: {},
})

export default useUserStore
