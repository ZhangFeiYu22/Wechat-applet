import request from '@/utils/request'

// 我的关注
export const myFollow = (data) => request.get(`/followMember`,data)

// 我的消息
export const myMessageList = () => request.get(`/message/no-paging`)

//  单独一条消息详情
export const messageOne = (id) => request.get(`/message/${id}`)

// 建议与反馈
export const suggestionPost = (data) => request.post(`/suggestion`,data)


// 我的勋章
export const myMedalGet = (data) => request.get(`/myMedal`,data)


// 我的信息  查询
export const userInfoGet = () => request.get(`/app-user/me`)

// 我的信息  修改
export const userInfoPost = (data) => request.post(`/app-user/me`,data)
