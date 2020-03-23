import request from '@/utils/request'

// 获取  社区  动态列表
export const forumContentGet = (data) => request.get(`/forumContent`,data)

// 关注     动态  
export const forumLike = (id) => request.post(`/forumLike/${id}`)

// 取消关注    动态  
export const forumLikeNo = (id) => request.delete(`/forumLike/${id}`)

// 获取  动态详情
export const forumContentDetailsGet = (id) => request.get(`/forumContent/${id}`)

// 评论  动态
export const forumComment = (data) => request.post(`/forumComment`,data)