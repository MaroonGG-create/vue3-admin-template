import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'
import type { LoginData, LoginResponse } from '@/api/type'
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
      let res: LoginResponse = await login(data)
      if (res.code == 200) {
        this.token = res.data.token as string
        SET_TOKEN(res.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    async getUserInfoData() {
      // TODO: 获取用户信息
      let res: any = await getUserInfo()
      console.log(res)

      if (res.code == 200) {
        this.username = res.data.username as string
        this.avatar = res.data.avatar as string
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
      console.log(1111)
    },
  },
  getters: {},
})

export default useUserStore
