import request from '@/utils/request'

// 活动 添加发布 
export const activitysPost = (data) => request.post(`/activitys`,data)
