import { MockMethod } from 'vite-plugin-mock'

// 1. 提取用户信息为常量，避免重复执行函数
const userList = [
  {
    userId: 1,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'admin',
    password: '111111',
    desc: '平台管理员',
    roles: ['平台管理员'],
    buttons: ['cuser.detail'],
    routes: ['home'],
    token: 'Admin Token',
  },
  {
    userId: 2,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'system',
    password: '111111',
    desc: '系统管理员',
    roles: ['系统管理员'],
    buttons: ['cuser.detail', 'cuser.user'],
    routes: ['home'],
    token: 'System Token',
  },
]

// 2. 使用 MockMethod 类型，享受 TS 补全
export default [
  // 用户登录
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = userList.find(
        (item) => item.username === username && item.password === password,
      )

      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }

      // 仅返回 token
      return { code: 200, data: { token: checkUser.token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ headers }) => {
      // 在 v3 版本中，建议直接解构 headers
      const token = headers.token

      const checkUser = userList.find((item) => item.token === token)

      if (!checkUser) {
        return { 
          code: 201, 
          data: { message: '获取用户信息失败' } 
        }
      }

      // 直接返回 checkUser 对象，不要再包裹一层对象
      return { code: 200, data: checkUser }
    },
  },
] as MockMethod[]