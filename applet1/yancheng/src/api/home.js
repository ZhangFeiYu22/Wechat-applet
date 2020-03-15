import request from '@/utils/request'

// 获取  社区  动态列表
export const forumContentGet = (data) => request.get(`/forumContent`,data)


// 获取  动态详情
export const forumContentDetailsGet = (id) => request.get(`/forumContent/${id}`)