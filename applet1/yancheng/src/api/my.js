import request from '@/utils/request'

// 我的关注
export const myFollow = (data) => request.get(`/followMember`,data)
export const myFollowActivity = (data) => request.get(`/followActivity`,data)

// 我的发布
export const myPublish_activity = (data) => request.get(`/activitys/myActivitys`,data)
export const myPublish_vote = (data) => request.get(`/vote/myPublishList`,data)
export const myPublish_solicit = (data) => request.get(`/solicit/myPublishList`,data)

// 我的消息
export const myMessageList = () => request.get(`/message/no-paging`)

//  单独一条消息详情
export const messageOne = (id) => request.get(`/message/${id}`)

// 私信  回复
export const messageTo = (data) => request.post(`/message`,data)

// 建议与反馈
export const suggestionPost = (data) => request.post(`/suggestion`,data)


// 我的勋章
export const myMedalGet = (data) => request.get(`/myMedal`,data)


// 我的信息  查询
export const userInfoGet = () => request.get(`/app-user/me`)

// 我的信息  修改
export const userInfoPost = (data) => request.post(`/app-user/me`,data)


// 认证   发送验证码
export const sendCodeGet = (data) => request.get(`/member/vcode/${data.mobile}`)

// 认证  验证验证码
export const validationCode = (data) => request.post(`/member/auth/${data.code}/${data.mobile}`)