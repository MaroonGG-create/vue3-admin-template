export interface LoginData {
  username: string
  password: string
}

export interface LoginResponse {
  code: number
  data: {
    token?: string
    message?: string
  }
}
export interface UserInfo {
  code: number
  data: {
    id: number
    username: string
    nickname: string
    avatar: string
    email: string
    phone: string
    status: number
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
  }
}
