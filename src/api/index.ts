import type { APIAuthCode, APIPLogin, APIALogin, UserBrief } from './types'
export * from './types'
export { request } from './request'

// 验证码获取
export const getAuthcode = (data: APIAuthCode) =>
  request<null, APIAuthCode>('authcode/', 'post', { data })
// 用户登录
export const login = (data: APIPLogin | APIALogin) =>
  request<null, APIPLogin | APIALogin>('login/', 'post', { data })
// export const loginGithub = () => request<null, null>('social-auth/login/github/')
// 用户登出
export const logout = () => request<null, null>('logout/', 'post')
// 用户简要信息
export const getUserBrief = () => request<UserBrief, null>('user/brief/')
