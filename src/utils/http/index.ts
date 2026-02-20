import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message: string = ''
    const status: number = error.response.status
    switch (status) {
      case 400:
        message = '请求错误'
        break
      case 401:
        message = '未授权，请登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
    }
    ElMessage({
      type: 'error',
      message: message,
    })
    return Promise.reject(error)
  },
)

export default request
