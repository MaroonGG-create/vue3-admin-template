import request from '@/utils/http'
import type { LoginData, LoginResponse, UserInfo } from './type'
enum Api {
  login = '/user/login',
  UserInfo = '/user/info',
}

/**
 * 登录函数
 * @param data 登录所需的数据对象，类型为LoginData
 * @returns 返回一个请求对象，用于发送登录请求
 */
export function login(data: LoginData) {
  return request<LoginResponse>({
    // 调用request函数发起HTTP请求
    url: Api.login, // 设置请求的URL为Api.login常量
    method: 'post', // 设置请求方法为POST
    data, // 请求体数据为传入的data参数
  })
}

/**
 * 获取用户信息
 * @returns {Promise} 返回一个Promise对象，包含用户信息数据
 */
export function getUserInfo() {
  return request<UserInfo>({
    url: Api.UserInfo, // 请求接口地址
    method: 'get', // 请求方法为GET
  })
}
