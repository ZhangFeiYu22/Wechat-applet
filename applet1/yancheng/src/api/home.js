import request from '@/utils/request'

// 获取  社区  动态列表   没有登录的数据（不可以点赞）
export const forumContentGet = (data) => request.get(`/forumContent`,data)

// 获取  社区  动态列表   登录的数据（可以点赞）
export const forumContentGetLogin = (data) => request.get(`/forumContent/getList`,data)

// 关注     动态  
export const forumLike = (id) => request.post(`/forumLike/${id}`)

// 取消关注    动态  
export const forumLikeNo = (id) => request.delete(`/forumLike/${id}`)

// 获取  动态详情
export const forumContentDetailsGet = (id) => request.get(`/forumContent/${id}`)

// 评论  动态
export const forumComment = (data) => request.post(`/forumComment`,data)

// 私信
export const messageTo = (data) => request.post(`/message`,data)

// 广告位  获取
export const adGet = (data) => request.get(`/advert`,data)