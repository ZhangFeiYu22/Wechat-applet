import request from '@/utils/request'

// 活动 列表查询
export const activitysGet = (data) => request.get(`/activitys`,data)
// 活动 列表查询
export const activityDetailsGet = (id) => request.get(`/activitys/${id}`)

// 活动 添加发布 
export const activitysPost = (data) => request.post(`/activitys`,data)
