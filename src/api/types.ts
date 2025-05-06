// api验证失败错误返回类型
export type APIValidError<T extends Record<string, unknown>> = { [key in keyof T]?: string[] } & {
  non_field_errors?: string[]
}

// api验证码
export type APIAuthCode = { username: string }
// 基础用户
export interface BaseUser {
  id: string | number
  username: string
  nickname: string
  name: string
  email: string
  phone: string
  avatar: string
  registration_date: string
  last_publish_datetime: string
  review_history: History
  publish_history: History
  following_number: number
  followers_number: number
  password: string
}
// api登录
export type APIPLogin = { username: string; password: string }
export type APIALogin = { username: string; authcode: string }
// 用户简略信息
export type UserBrief = Pick<BaseUser, 'id' | 'name' | 'avatar'>
