import request from '@/utils/request'

// 获取sessionKey
export const getSessionInfo = (code) => request.get(`/app-user/getSessionInfo/${code}`)

// 通过用户信息去获取token
export const getUserInfo = (data) => request.get(`/app-user/info`, data)

// 登录
export const login = (appid, data) => request.get(`/app-user/login/${appid}`, data)

// 登录者的信息
export const userInfoGet = () => request.get(`/app-user/me`)

