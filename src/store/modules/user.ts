import { defineStore } from 'pinia'
import { login } from '@/api/user'
import type { LoginData, LoginResponse } from '@/api/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
const useUserStore = defineStore('user', {
  state: () => ({
    token: GET_TOKEN(),
  }),
  actions: {
    async userLogin(data: LoginData) {
      let res: LoginResponse = await login(data)
      console.log(res)

      if (res.code == 200) {
        this.token = res.data.token as string
        SET_TOKEN(res.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
